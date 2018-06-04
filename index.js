#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const files = require("./lib/files");
const tools = require("./lib/tools");
const path = require('path');
const workboxBuild = require('workbox-build');
const log = console.log;
const arg = process.argv[2];

const directoryBase = process.cwd();
// ENV
process.env.FUSEBOX_TEMP_FOLDER = directoryBase + "/.wapitis";

// REQUIRE
const { FuseBox, QuantumPlugin, CSSPlugin, CSSResourcePlugin, WebIndexPlugin, CopyPlugin, EnvPlugin } = require("fuse-box");
const { src, task, exec, context } = require("fuse-box/sparky");
const builder = require("electron-builder");

// PACKAGE JSON
const packageJson = JSON.parse(files.readFileSync(directoryBase + "/package.json", "utf8"));

function formatDateToYYYYMMDDHHMM(date) {
    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
    }
    // return date.getFullYear() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
    return date.getFullYear() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes());
}

if (arg) {
	if (arg === "init") {
		const questions = [
			{
				name: 'srcproject',
				type: 'input',
				message: 'Quel est le nom de votre dossier source:',
				validate: function( value ) {
					if (value.length) return true;
					else return 'Entrez le nom de votre dossier source';
				},
				default: "src"
			}
		];
		  
		inquirer.prompt(questions).then((answers) => {
			const wapitisTxt = 
`{
	"srcPath": "${answers.srcproject}/",
	"wwwPath": "${answers.srcproject}/www",
	"distPath": "${answers.srcproject}/../dist",
	"startFile": "app.tsx",
	"electronStartFile": "electronStart.ts"
}`;		
			files.appendFile(directoryBase + "/wapitis.json", wapitisTxt, true);
			files.copy(path.resolve(__dirname, "files/tsconfig.json"), directoryBase + "/tsconfig.json");
			files.copy(path.resolve(__dirname, "files/app.tsx"), directoryBase + "/" + answers.srcproject + "/app.tsx");
			files.copy(path.resolve(__dirname, "files/electronStart.ts"), directoryBase + "/" + answers.srcproject + "/electronStart.ts");
			files.copy(path.resolve(__dirname, "files/www"), directoryBase + "/" + answers.srcproject + "/www");
			packageJson.main = answers.srcproject + "/../dist/electron.js";
			files.appendFile(directoryBase + "/package.json", JSON.stringify(packageJson, null, 2), true);
		});
	} else if (arg === "dev" || arg === "prod" || arg === "clear" || arg === "electron" || arg === "generate") {

		// GLOBALS
		const isElectron = arg === "electron";
		const tsconfigFile = directoryBase + "/tsconfig.json";
		if (arg === "electron" && process.argv[3] === "--prod") process.env.NODE_ENV = "production";

		// wapitis CONFIG
		const wapitisConfig = JSON.parse(files.readFileSync(directoryBase + "/wapitis.json", "utf8"));

		// Service worker
		function buildServiceWorker() {
			const buildSW = () => {
				console.log("blip")
				// This will return a Promise
				return workboxBuild.generateSW({
					globDirectory: directoryBase + "/" + wapitisConfig.distPath ,
					globPatterns: [
						"**\/*.{html,json,js,css,svg}",
					],
					swDest: directoryBase + "/" + wapitisConfig.distPath  + "/sw.js",				
					// Define runtime caching rules.
					// runtimeCaching: [{
					// 	// Match any request ends with .png, .jpg, .jpeg or .svg.
					// 	urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
				
					// 	// Apply a cache-first strategy.
					// 	handler: "cacheFirst",
				
					// 	options: {
					// 		cacheName: 'wapitis-cache',
					// 		// Only cache 10 images.
					// 		expiration: {
					// 			maxEntries: 10,
					// 		},
					// 	},
					// }],
				});
			}
			  
			buildSW();
		}

		// Génération de fichiers
		if (arg === "generate") {
			const arg2 = process.argv[3];
			const arg3 = process.argv[4];
			if (process.argv[3] === "class" && (arg3.includes(".ts") || arg3.includes(".tsx"))) {
				log(chalk.green("wapitis generate " + arg2 + " " + wapitisConfig.srcPath + arg3));
				const classFile = wapitisConfig.srcPath + arg3;
				if (!files.fileExists(directoryBase + "/" + classFile)) {
					let className = arg3.substr(arg3.lastIndexOf("/") + 1);
					className = className.substr(0, className.lastIndexOf("."));
					className = className.split(/[- _]+/).map((str) => str.charAt(0).toUpperCase() + str.substr(1)).join("");
					const classText = 
(arg3.includes(".tsx") ? 
`import { JSX } from "wapitis";

` : "") +
`export default class ${className} {

}
`;
					files.appendFile(directoryBase + "/" + classFile, classText, true);
					const tsConfigJson = JSON.parse(files.readFileSync(tsconfigFile, "utf8"));
					const tsConfigJsonPath = "*" in tsConfigJson.compilerOptions.paths ? tsConfigJson.compilerOptions.paths["*"] : tsConfigJson.compilerOptions.paths["*"] = [];
					const tsConfigClassPath = classFile.substr(0, classFile.lastIndexOf("/") + 1) + "*";
					if (!tsConfigJsonPath.includes(tsConfigClassPath)) {
						tsConfigJson.compilerOptions.paths["*"].push(tsConfigClassPath);
						files.appendFile(directoryBase + "/tsConfig.json", JSON.stringify(tsConfigJson, null, 2), true);
					}
					log(chalk.green("Le fichier " + classFile + " a été créé"));
				} else log(chalk.red("Impossible de générer " + classFile + " : le fichier existe déjà"));
				
			} else log(chalk.red("Cette commande n'est pas pris en charge par wapitis generate"));
			return;
		}

		// Combine custom icons SVG in dom icons SVG
		if (arg !== "clear") {
			const customSVG = files.readFileSync(wapitisConfig.wwwPath + "/assets/img/icons.svg", "utf8");
			files.appendFile(path.resolve(__dirname, "library/icons.svg"), customSVG, true);
		}

		// PATH IMPORT ALIAS
		let importFiles = {};
		let allFiles = files.getAllFiles(directoryBase  + "/" + wapitisConfig.srcPath, [files.getCurrentDirectoryBase(), "tsconfig.json"]);
		allFiles.tsCommonFiles.forEach((file) => {
			let spacer = file.includes("\\") ? "\\" : "/";
			let fileName = file.substring(file.lastIndexOf(spacer)+1);
			fileName = fileName.substring(0, fileName.lastIndexOf("."));
			file = file.substring(file.lastIndexOf(wapitisConfig.srcPath.substring(0, wapitisConfig.srcPath.lastIndexOf("/"))) + wapitisConfig.srcPath.length).split(spacer).join("/");
			importFiles[fileName] = "~/" + file.substring(0, file.lastIndexOf("."));
		});

		context(class {
			getConfig() {
				return FuseBox.init({
					homeDir: directoryBase  + "/" + wapitisConfig.srcPath,
					output: directoryBase  + "/" + wapitisConfig.distPath + "/$name.js",
					tsConfig : tsconfigFile,
					target : this.isElectronTask ? "server" : "browser",
					sourceMaps: !this.isProduction && !this.isElectronTask,
					alias: importFiles,
					hash: this.isProduction && !isElectron,
					cache: !this.isProduction,
					plugins: [
						EnvPlugin({
							NODE_ENV: this.isProduction ? "production" : "development"
						}),
						!this.isElectronTask && WebIndexPlugin({
							path: ".",
							template: directoryBase  + "/" + wapitisConfig.wwwPath + "/index.html",
							appendBundles: true
						}),
						[
							!this.isElectronTask && CSSResourcePlugin({
								dist: directoryBase  + "/" + wapitisConfig.distPath + "/assets",
								resolve: (f) => `./assets/${f}`
							 }),
							!this.isElectronTask && CSSPlugin({
								group: "bundle.css",
								minify: this.isProduction
							}),
						],
						!this.isElectronTask && CopyPlugin({ files: ["**/*.svg"] }),
						this.isProduction && QuantumPlugin({
							bakeApiIntoBundle: this.isElectronTask ? "electron" : "bundle",
							target : this.isElectronTask ? "electron" : "browser",
							uglify : true,
							treeshake : true,
							removeExportsInterop: false
						})
					]
				});
			}

			createBundle(fuse, bundleName = "bundle", startFile = wapitisConfig.startFile) {
				const app = fuse.bundle(bundleName);
				if (!this.isProduction && !this.isElectronTask) {
					app.watch();
					app.hmr({reload : true});
				}
				app.instructions("> " + startFile);
				return app;
			}
		});

		task("clear:cache", () => src(directoryBase + "/.wapitis/").clean(directoryBase + "/.wapitis/").exec());

		task("clear:dist", () => src(directoryBase  + "/" + wapitisConfig.distPath + "/").clean(directoryBase + "/" + wapitisConfig.distPath + "/").exec());

		task("clear", ["clear:cache", "clear:dist"]);

		task("dev", ["clear"], async context => {
			const fuse = context.getConfig();
			fuse.dev();
			context.createBundle(fuse);
			await fuse.run();
			buildServiceWorker();
		});

		task("prod", ["clear"], async context => {
			context.isProduction = true;
			const fuse = context.getConfig();
			context.createBundle(fuse);
			await fuse.run();
			buildServiceWorker();
		});

		task("electron", [process.env.NODE_ENV === "production" ? "prod" : "dev"], async context => {
			context.isElectronTask = true;
			const fuse = context.getConfig();
			context.createBundle(fuse, "electron", "[" + wapitisConfig.electronStartFile + "]");
			if (process.env.NODE_ENV === "production" ) {        
				await fuse.run().then(() => {
					// launch electron build
					files.copy(directoryBase + "/" + wapitisConfig.distPath, __dirname + "/dist");
					builder.build({
						config: {
							"copyright": packageJson.author,
							"productName": packageJson.name,
							"files": [
								"dist"
							],
							"directories" : {
								"output" : __dirname + "/dist"
							},
							"dmg": {
								"contents": [
									{
										"x": 130,
										"y": 220
									},
									{
										"x": 410,
										"y": 220,
										"type": "link",
										"path": "/Applications"
									}
								]
							},
							"win": {
								"target": [
									"nsis"
								]
							},
							"linux": {
								"target": [
									"deb",
									"AppImage"
								]
							}
						}
					})
					.then((result) => {
						let spacer = result[1].includes("\\") ? "\\" : "/";
						let fileName = result[1].substring(result[1].lastIndexOf(spacer)+1);
						files.copy(result[1], directoryBase + "/" + wapitisConfig.distPath + "/" + packageJson.name + "_" + packageJson.version + "_" + formatDateToYYYYMMDDHHMM(new Date()) + "_setup" + fileName.substring(fileName.lastIndexOf("."))).then(() => files.remove(__dirname + "/dist"));
					})
					.catch((error) => log(error));
				});
			} else {
				await fuse.run().then(() => {
					// launch electron dev
					tools.runCommand("npx electron " + directoryBase + "/" + wapitisConfig.distPath + "/electron.js");
				});
			}
		});
	} else {
		log(chalk.red(arg + " n'est pas pris en charge par wapitis"));
	}
} else {
	log(chalk.green(figlet.textSync('WApiTis', { horizontalLayout: 'full' }) + chalk.bold(' ' + JSON.parse(files.readFileSync(__dirname + "/package.json", "utf8")).version)));
	log("");
	log(chalk.green(chalk.bold("  wapitis init") + " ---> initialise la web app en créant les fichiers et les dossiers nécessaires"));
	log(chalk.green(chalk.bold("  wapitis dev") + "  ---> lance la web app dans un serveur local"));
	log(chalk.green(chalk.bold("  wapitis prod") + " ---> web app pour la production"));
	log(chalk.green(chalk.bold("  wapitis electron") + "  ---> lance la webApp dans electron avec un serveur local (--dev) ou pour la production(--prod)"));
	log(chalk.green(chalk.bold("  wapitis clear") + " ---> supprime le cache et le dossier dist"));
	log(chalk.green(chalk.bold("  wapitis generate class path/du/fichier.ts(x)") + " ---> génère un fichier relatif à src. tsConfig est mis à jour"));
}