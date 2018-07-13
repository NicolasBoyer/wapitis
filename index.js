#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const files = require("./lib/files");
const swBuilder = require("./lib/swBuilder");
const tools = require("./lib/tools");
const path = require('path');
const compressor = require('node-minify');
const log = console.log;
const arg = process.argv[2];

const directoryBase = process.cwd();
// ENV
process.env.FUSEBOX_TEMP_FOLDER = directoryBase + "/.wapitis";

// REQUIRE
const { FuseBox, QuantumPlugin, CSSPlugin, CSSResourcePlugin, CopyPlugin, EnvPlugin } = require("fuse-box");
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
			},
			{
				name: 'appName',
				type: 'input',
				message: 'Quel est le nom de votre Web App:',
				validate: function( value ) {
					if (value.length) return true;
					else return 'Entrez le nom de votre Web App';
				}
			},
			{
				name: 'appDesc',
				type: 'input',
				message: 'Donnez une description pour votre Web App:',
				validate: function( value ) {
					if (value.length) return true;
					else return 'Donnez une description pour votre Web App';
				}
			},
			{
				name: 'themeColor',
				type: 'input',
				message: 'Entrez une couleur pour le header de votre Web App:',
				validate: function( value ) {
					if (value.length) return true;
					else return 'Entrez une couleur pour le header de votre Web App';
				},
				default: "#317EFB"
			}
		];
		  
		inquirer.prompt(questions).then((answers) => {
			const wapitisTxt = 
`{
	"srcPath": "${answers.srcproject}/",
	"wwwPath": "${answers.srcproject}/www",
	"distPath": "${answers.srcproject}/../dist",
	"startFile": "app.tsx",
	"electronStartFile": "electronStart.ts",
	"appName": "${answers.appName}",
	"appDesc": "${answers.appDesc}",
	"themeColor": "${answers.themeColor}"
}`;		
			files.appendFile(directoryBase + "/wapitis.json", wapitisTxt, true);
			files.copy(path.resolve(__dirname, "files/tsconfig.json"), directoryBase + "/tsconfig.json");
			files.copy(path.resolve(__dirname, "files/app.tsx"), directoryBase + "/" + answers.srcproject + "/app.tsx");
			files.copy(path.resolve(__dirname, "files/electronStart.ts"), directoryBase + "/" + answers.srcproject + "/electronStart.ts");
			const manifestJson = JSON.parse(files.readFileSync(path.resolve(__dirname, "files/www/manifest.json"), "utf8"));
			manifestJson.short_name = answers.appName;
			manifestJson.name = answers.appName;
			manifestJson.theme_color = answers.themeColor;
			files.appendFile(path.resolve(__dirname, "files/www/manifest.json"), JSON.stringify(manifestJson, null, 2), true).then(() => {
				files.copy(path.resolve(__dirname, "files/www"), directoryBase + "/" + answers.srcproject + "/www");
				packageJson.main = answers.srcproject + "/../dist/electron.js";
				files.appendFile(directoryBase + "/package.json", JSON.stringify(packageJson, null, 2), true);
			});
		});
	} else if (arg === "dev" || arg === "prod" || arg === "clear" || arg === "electron" || arg === "generate") {

		// GLOBALS
		const isElectron = arg === "electron";
		const tsconfigFile = directoryBase + "/tsconfig.json";
		if (arg === "electron" && process.argv[3] === "--prod") process.env.NODE_ENV = "production";

		// wapitis CONFIG
		const wapitisConfig = JSON.parse(files.readFileSync(directoryBase + "/wapitis.json", "utf8"));
		const completeDistPath = path.resolve(directoryBase + "/" + wapitisConfig.distPath);
		const completeSrcPath = path.resolve(directoryBase + "/" + wapitisConfig.srcPath)
		const completeWwwPath = path.resolve(directoryBase + "/" + wapitisConfig.wwwPath)

		// Service worker, manifest, polyfills et fichiers pour la web app
		swBuilder.setOptions({
			globDirectory : directoryBase,
			swDest : completeDistPath,
			indexSrc : completeDistPath,
			// L'exclusion doit aussi être un pattern
			excludeFiles : ["icons-192.png","icons-512.png"],
			globPattern : /\.(?:html|json|js|css|svg|png|jpg|gif)$/
		});
		function buildWebAppFiles() {
			return new Promise((resolve) => {
				files.copy(completeSrcPath + "/www/manifest.json", completeDistPath + "/manifest.json").then(() => {
					files.copy(completeSrcPath + "/www/assets/icons", completeDistPath + "/assets/icons").then(() => {
						files.copy(path.resolve(__dirname, "files/polyfills.js"), completeDistPath + "/polyfills.js").then(() => {
							swBuilder.registerServiceWorker().then(() => resolve());
						});
					});
				});
			});
		}

		// Modify index file
		function buildIndexFile(isProd) {
			return new Promise((resolve) => {
				files.readFile(path.resolve(__dirname, "files/index.html"), (err, html) => {
					if (err) throw err;
					html = html.replace("$appDesc$", wapitisConfig.appDesc);
					html = html.replace("$themeColor$", wapitisConfig.themeColor);
					html = html.replace("$appName$", wapitisConfig.appName);
					if (isProd) {
						const quantumFile = JSON.parse(files.readFileSync(completeDistPath + "/quantum.json", "utf8"));
						html = html.replace("$bundle$", `<script src="${quantumFile.bundle.relativePath}"></script>`);
						files.remove(completeDistPath + "/quantum.json");
					} else html = html.replace("$bundle$", '<script src="bundle.js"></script>');
					files.appendFile(completeDistPath + "/index.html", html, true).then(() => resolve());
				});
			});
		}
		function cleanIndexFile() {
			files.readFile(completeDistPath + "/index.html", (err, html) => {
				if (err) throw err;
				html = html.replace("$headScripts$", "");
				html = html.replace("$bodyScript$", "");        
				files.appendFile(completeDistPath + "/index.html", html, true);
			});
		}

		// Génération de fichiers
		if (arg === "generate") {
			const arg2 = process.argv[3];
			const arg3 = process.argv[4];
			if (arg2 === "class" && (arg3.split('.').pop() === "ts" || arg3.split('.').pop() === "tsx") || arg2 === "component" && arg3.split('.').pop() === "tsx") {
				log(chalk.green("wapitis generate " + arg2 + " " + wapitisConfig.srcPath + arg3));
				const classFile = wapitisConfig.srcPath + arg3;
				if (!files.fileExists(directoryBase + "/" + classFile)) {
					let className = arg3.substr(arg3.lastIndexOf("/") + 1);
					className = className.substr(0, className.lastIndexOf("."));
					className = className.split(/[- _]+/).map((str) => str.charAt(0).toUpperCase() + str.substr(1)).join("");
					if (arg2 === "class") {
						const classText = 
(arg3.includes(".tsx") ? 
`import { JSX } from "wapitis";

` : "") +
`export default class ${className} {

}
`;
						files.appendFile(directoryBase + "/" + classFile, classText, true);
					} else if (arg2 === "component") {
						files.copy(path.resolve(__dirname, "files/component.tsx"), directoryBase + "/" + classFile).then(() => {
							const componentText = files.readFileSync(directoryBase + "/" + classFile, "utf8");
							files.appendFile(directoryBase + "/" + classFile, componentText.replace("ClassName", className), true);
						});
					}
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
					homeDir: completeSrcPath,
					output: completeDistPath + "/$name.js",
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
						[
							!this.isElectronTask && CSSResourcePlugin({
								dist: completeDistPath + "/assets",
								resolve: (f) => `./assets/${f}`
							 }),
							!this.isElectronTask && CSSPlugin({
								group: "bundle.css",
								minify: this.isProduction
							}),
						],
						!this.isElectronTask && CopyPlugin({ files: ["**/*.svg"], dest: "assets", resolve: "assets/" }),
						this.isProduction && QuantumPlugin({
							manifest : "quantum.json",
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

		task("clear:dist", () => src(completeDistPath + "/").clean(completeDistPath + "/").exec());

		task("clear", ["clear:cache", "clear:dist"]);

		task("dev", ["clear"], async context => {
			const fuse = context.getConfig();
			fuse.dev();
			context.createBundle(fuse);
			await fuse.run();
			buildIndexFile().then(() => {
				if (!isElectron) {
					if (process.argv[3] === "--webapp") buildWebAppFiles();
					else swBuilder.unregisterServiceWorker();
				} else cleanIndexFile();
			});
		});

		task("prod", ["clear"], async context => {
			context.isProduction = true;
			const fuse = context.getConfig();
			context.createBundle(fuse);
			await fuse.run();
			buildIndexFile(true).then(() => {
				if (!isElectron) {
					buildWebAppFiles().then(() => {
						compressor.minify({
							compressor: "babel-minify",
							input: completeDistPath + "/sw.js",
							output: completeDistPath + "/sw.js",
							callback: function(err, min) {
								console.log("Service Worker minified !")
							}
						});
					});
				} else cleanIndexFile();
			});
		});

		task("electron", [process.env.NODE_ENV === "production" ? "prod" : "dev"], async context => {
			context.isElectronTask = true;
			const fuse = context.getConfig();
			context.createBundle(fuse, "electron", "[" + wapitisConfig.electronStartFile + "]");
			if (process.env.NODE_ENV === "production" ) {        
				await fuse.run().then(() => {
					// launch electron build
					files.copy(completeDistPath, __dirname + "/dist");
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
						files.remove(completeDistPath);
						files.copy(result[1], completeDistPath + "/" + packageJson.name + "_" + packageJson.version + "_" + formatDateToYYYYMMDDHHMM(new Date()) + "_setup" + fileName.substring(fileName.lastIndexOf("."))).then(() => files.remove(__dirname + "/dist"));
					})
					.catch((error) => log(error));
				});
			} else {
				await fuse.run().then(() => {
					// launch electron dev
					tools.runCommand("npx electron " + completeDistPath + "/electron.js");
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
	log(chalk.green(chalk.bold("  wapitis dev") + "  ---> lance la web app dans un serveur local. --webapp pour générer service worker, manifest et polyfills"));
	log(chalk.green(chalk.bold("  wapitis prod") + " ---> web app pour la production"));
	log(chalk.green(chalk.bold("  wapitis electron") + "  ---> lance la webApp dans electron avec un serveur local (--dev) ou pour la production(--prod)"));
	log(chalk.green(chalk.bold("  wapitis clear") + " ---> supprime le cache et le dossier dist"));
	log(chalk.green(chalk.bold("  wapitis generate class path/du/fichier.ts(x)") + " ---> génère une classe relatif à src. tsConfig est mis à jour"));
	log(chalk.green(chalk.bold("  wapitis generate component path/du/fichier.tsx") + " ---> génère un composant relatif à src. tsConfig est mis à jour"));
}