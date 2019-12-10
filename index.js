#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const files = require("./tools/files");
const swBuilder = require("./tools/swbuilder");
const tools = require("./tools/tools");
const path = require('path');
const compressor = require('node-minify');
const log = console.log;
const arg = process.argv[2];

const directoryBase = process.cwd();
// ENV
const dotEnv = require('./tools/dotenv')
dotEnv.config({ initVars: [{ FUSEBOX_TEMP_FOLDER: directoryBase + '/.wapitis' }] })

// REQUIRE
const { FuseBox, QuantumPlugin, CSSResourcePlugin, CopyPlugin, EnvPlugin } = require("fuse-box");
const { CSSPlugin } = require("fbcssplugin");
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
		if (!files.fileExists(directoryBase + '/wapitis.json')) {
			const questions = [
				{
					name: 'srcproject',
					type: 'input',
					message: 'Quel est le nom de votre dossier source:',
					validate: function (value) {
						if (value.length) return true;
						else return 'Entrez le nom de votre dossier source';
					},
					default: "src"
				},
				{
					name: 'appName',
					type: 'input',
					message: 'Quel est le nom de votre Web App:',
					validate: function (value) {
						if (value.length) return true;
						else return 'Entrez le nom de votre Web App';
					}
				},
				{
					name: 'appDesc',
					type: 'input',
					message: 'Donnez une description pour votre Web App:',
					validate: function (value) {
						if (value.length) return true;
						else return 'Donnez une description pour votre Web App';
					}
				},
				{
					name: 'themeColor',
					type: 'input',
					message: 'Entrez une couleur pour le header de votre Web App:',
					validate: function (value) {
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
				files.copy(path.resolve(__dirname, ".includes/tsconfig.json"), directoryBase + "/tsconfig.json");
				files.copy(path.resolve(__dirname, ".includes/tslint.json"), directoryBase + "/tslint.json");
				files.copy(path.resolve(__dirname, ".includes/gitignore"), directoryBase + "/.gitignore");
				files.copy(path.resolve(__dirname, ".includes/app.tsx"), directoryBase + "/" + answers.srcproject + "/app.tsx");
				files.copy(path.resolve(__dirname, ".includes/custom.d.ts"), directoryBase + "/" + answers.srcproject + "/custom.d.ts");
				files.copy(path.resolve(__dirname, ".includes/electronStart.ts"), directoryBase + "/" + answers.srcproject + "/electronStart.ts");
				packageJson.scripts = {};
				packageJson.scripts.init = "npx wapitis init";
				packageJson.scripts.dev = "npx wapitis dev";
				packageJson.scripts.prod = "npx wapitis prod";
				packageJson.scripts.electronDev = "npx wapitis electron --dev";
				packageJson.scripts.electronProd = "npx wapitis electron --prod";
				packageJson.scripts.clear = "npx wapitis clear";
				packageJson.main = answers.srcproject + "/../dist/electron.js";
				files.appendFile(directoryBase + "/package.json", JSON.stringify(packageJson, null, 2), true);
				const manifestJson = JSON.parse(files.readFileSync(path.resolve(__dirname, ".includes/www/manifest.json"), "utf8"));
				manifestJson.short_name = answers.appName;
				manifestJson.name = answers.appName;
				manifestJson.theme_color = answers.themeColor;
				files.copy(path.resolve(__dirname, ".includes/www"), directoryBase + "/" + answers.srcproject + "/www").then(async () => {
					await files.appendFile(directoryBase + "/" + answers.srcproject + "/www/manifest.json", JSON.stringify(manifestJson, null, 2), true)
					tools.runCommandSync('npm i tslint -D')
					tools.runCommandSync('npm i electron-updater --save')
				});
			});
		} else console.log(chalk.red('L\'initialisation a déjà été effectuée, veuillez modifier directement le fichier wapitis.json !'))
	} else if (arg === "dev" || arg === "prod" || arg === "clear" || arg === "electron" || arg === "generate") {

		// GLOBALS
		const isElectron = arg === "electron";
		const tsconfigFile = directoryBase + "/tsconfig.json";
		if (arg === "electron" && process.argv[3] === "--prod" || process.argv[3] === "--publish") process.env.NODE_ENV = "production";

		// wapitis CONFIG
		const wapitisConfig = JSON.parse(files.readFileSync(directoryBase + "/wapitis.json", "utf8"));
		const completeDistPath = path.resolve(directoryBase + "/" + wapitisConfig.distPath);
		const completeSrcPath = path.resolve(directoryBase + "/" + wapitisConfig.srcPath);
		const allFiles = files.getAllFiles(directoryBase + "/" + wapitisConfig.srcPath, [files.getCurrentDirectoryBase(), "tsconfig.json"])

		// Service worker, manifest, polyfills et fichiers pour la web app
		swBuilder.setOptions({
			globDirectory: directoryBase,
			swDest: completeDistPath,
			indexSrc: completeDistPath,
			// L'exclusion doit aussi être un pattern
			excludeFiles: ["sw.js"],
			patterns: { core: /\.(?:html|xhtml|json|js|css|txt|xml)$/, fonts: /\.(?:eot|ttf|woff|woff2|otf)$/, attachments: /\.(?:doc|docx|odg|odp|ods|odt|pdf|ppt|rtf|xls|xlsx|zip)$/, images: /\.(?:svg|png|jpg|gif|ico)$/, videos: /\.(?:srt|vtt|avi|mov|mp3|mp4|mpg|opus|webm)$/ }
			// globPattern: /\.(?:html|json|js|css|svg|png|jpg|gif)$/
		});
		async function buildWebAppFiles() {
			await files.copy(completeSrcPath + "/www/manifest.json", completeDistPath + "/manifest.json")
			await files.copy(completeSrcPath + "/www/assets/icons", completeDistPath + "/assets/icons")
			await files.copy(path.resolve(__dirname, ".includes/polyfills.js"), completeDistPath + "/polyfills.js")
			await swBuilder.registerServiceWorker()
		}

		// Modify index file and copy favicon.ico
		async function buildIndexFile(isProd) {
			await files.copy(completeSrcPath + "/www/favicon.ico", completeDistPath + "/favicon.ico")
			try {
				let html = await files.readFile(path.resolve(__dirname, ".includes/index.html"))
				html = html.replace("$appDesc$", wapitisConfig.appDesc);
				html = html.replace("$themeColor$", wapitisConfig.themeColor);
				html = html.replace("$appName$", wapitisConfig.appName);
				html = html.replace("$electron$", isElectron ? '<script src="index.js"></script>' : '');
				if (isProd) {
					const quantumFile = JSON.parse(files.readFileSync(completeDistPath + "/quantum.json", "utf8"));
					html = html.replace("$bundle$", `<script src="${quantumFile.bundle.relativePath}"></script>`);
					files.remove(completeDistPath + "/quantum.json");
				} else html = html.replace("$bundle$", '<script src="bundle.js"></script>');
				await files.appendFile(completeDistPath + "/index.html", html, true);
			} catch (error) {
				throw error
			}
		}
		async function cleanIndexFile() {
			try {
				let html = await files.readFile(completeDistPath + "/index.html")
				html = html.replace("$headScripts$", "");
				html = html.replace("$bodyScript$", "");
				files.appendFile(completeDistPath + "/index.html", html, true);
			} catch (error) {
				throw error
			}
		}

		// FILES TO UPDATE
		function setFilesToUpdate() {
			wapitisConfig.filesInfos = wapitisConfig.filesInfos || { mtime: {} }
			wapitisConfig.filesInfos.update = []
			let filesToCopy = []
			filesToCopy = filesToCopy.concat(allFiles.imgFiles).concat(allFiles.fontsFiles).concat(allFiles.datasFiles.filter((file) => !file.includes('\\manifest.json'))).concat(allFiles.attachmentsFiles).concat(allFiles.mediasFiles)
			filesToCopy.forEach((file) => {
				const mtime = files.getModifiedTimeFileSync(file)
				const fileName = file.substring(file.lastIndexOf(file.includes("\\") ? "\\" : "/") + 1)
				const oldMtime = wapitisConfig.filesInfos.mtime[fileName]
				if (!(oldMtime && String(new Date(oldMtime)) === String(mtime))) {
					wapitisConfig.filesInfos.update.push(fileName)
				}
				wapitisConfig.filesInfos.mtime[fileName] = mtime
			})
			files.appendFile(directoryBase + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true)
		}

		// Génération de fichiers
		if (arg === "generate") {
			const arg2 = process.argv[3];
			const arg3 = process.argv[4];
			if ((arg2 === "class" || arg2 === "component") && (arg3.split('.').pop() === "ts" || arg3.split('.').pop() === "tsx")) {
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
						files.copy(path.resolve(__dirname, ".includes/component.ts"), directoryBase + "/" + classFile).then(() => {
							const componentText = files.readFileSync(directoryBase + "/" + classFile, "utf8");
							files.appendFile(directoryBase + "/" + classFile, componentText.replace("ClassName", className), true);
						});
					}
					// const tsConfigJson = JSON.parse(files.readFileSync(tsconfigFile, "utf8"));
					// const tsConfigJsonPath = "*" in tsConfigJson.compilerOptions.paths ? tsConfigJson.compilerOptions.paths["*"] : tsConfigJson.compilerOptions.paths["*"] = [];
					// const tsConfigClassPath = classFile.substr(0, classFile.lastIndexOf("/"));
					// if (!tsConfigJsonPath.includes(tsConfigClassPath)) {
					// 	tsConfigJson.compilerOptions.paths["*"].push(tsConfigClassPath);
					// 	files.appendFile(directoryBase + "/tsConfig.json", JSON.stringify(tsConfigJson, null, 2), true);
					// }
					log(chalk.green("Le fichier " + classFile + " a été créé"));
				} else log(chalk.red("Impossible de générer " + classFile + " : le fichier existe déjà"));

			} else log(chalk.red("Cette commande n'est pas pris en charge par wapitis generate"));
			return;
		}

		// Combine custom icons SVG in dom icons SVG
		// if (arg !== "clear") {
		// 	const customSVG = files.readFileSync(wapitisConfig.wwwPath + "/assets/img/icons.svg", "utf8");
		// 	files.appendFile(path.resolve(__dirname, "library/icons.svg"), customSVG, true);
		// }

		// PATH IMPORT ALIAS
		let importFiles = {};
		allFiles.tsCommonFiles.forEach((file) => {
			let spacer = file.includes("\\") ? "\\" : "/";
			let fileName = file.substring(file.lastIndexOf(spacer) + 1);
			fileName = fileName.substring(0, fileName.lastIndexOf("."));
			file = file.substring(file.lastIndexOf(wapitisConfig.srcPath.substring(0, wapitisConfig.srcPath.lastIndexOf("/"))) + wapitisConfig.srcPath.length).split(spacer).join("/");
			importFiles[fileName] = "~/" + file.substring(0, file.lastIndexOf("."));
		});

		context(class {
			getConfig() {
				return FuseBox.init({
					homeDir: completeSrcPath,
					output: completeDistPath + "/$name.js",
					tsConfig: tsconfigFile,
					target: this.isElectronTask ? "server" : "browser",
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
								resolve: (f) => `../assets/${f}`,
								filesMapping: (res) => {
									res.map((fileMapping) => {
										if (wapitisConfig.filesInfos) {
											Object.keys(wapitisConfig.filesInfos.mtime).forEach((name) => {
												if (fileMapping.from.includes(name) && wapitisConfig.filesInfos.update && wapitisConfig.filesInfos.update.includes(name)) {
													wapitisConfig.filesInfos.update[wapitisConfig.filesInfos.update.indexOf(name)] = fileMapping.to
												}
											})
										}
									});
									files.appendFile(directoryBase + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true)
								},
							}),
							!this.isElectronTask && CSSPlugin({
								// group: "bundle.css",
								outFile: (file) => `${completeDistPath}/styles${file.substring(file.lastIndexOf('/'))}`,
								inject: (file) => file.includes('main') && `styles${file.substring(file.lastIndexOf('/'))}`,
								minify: this.isProduction
							}),
						],
						!this.isElectronTask && CopyPlugin({ files: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif", "**/*.ico", "**/*.srt", "**/*.vtt", "**/*.avi", "**/*.mov", "**/*.mp3", "**/*.mp4", "**/*.mpg", "**/*.opus", "**/*.webm", "**/*.doc", "**/*.docx", "**/*.odg", "**/*.odp", "**/*.ods", "**/*.odt", "**/*.pdf", "**/*.ppt", "**/*.rtf", "**/*.xls", "**/*.xlsx", "**/*.zip", "**/*.txt", "**/*.xml", "**/*.json"], dest: "assets", resolve: "assets/" }),
						this.isProduction && QuantumPlugin({
							manifest: "quantum.json",
							bakeApiIntoBundle: this.isElectronTask ? "electron" : "bundle",
							target: this.isElectronTask ? "electron" : "browser",
							uglify: true,
							treeshake: true,
							removeExportsInterop: false
						})
					]
				});
			}

			createBundle(fuse, bundleName = "bundle", startFile = wapitisConfig.startFile) {
				const app = fuse.bundle(bundleName);
				if (!this.isProduction && !this.isElectronTask) {
					app.watch();
					app.hmr({ reload: true });
				}
				app.instructions("> " + startFile);
				return app;
			}
		});

		function startTask() {
			task("clear:cache", () => src(directoryBase + "/.wapitis/").clean(directoryBase + "/.wapitis/").exec());

			task("clear:dist", () => src(completeDistPath + "/").clean(completeDistPath + "/").exec());

			task("clear", ["clear:cache", "clear:dist"]);

			task("dev", ["clear"], async (context) => {
				if (process.argv[3] === "--webapp" && !isElectron) setFilesToUpdate()
				const fuse = context.getConfig();
				fuse.dev();
				context.createBundle(fuse);
				await fuse.run();
				await buildIndexFile()
				if (!isElectron) {
					if (process.argv[3] === "--webapp") buildWebAppFiles();
					else swBuilder.unregisterServiceWorker();
				} else cleanIndexFile();
			});

			task("prod", ["clear"], async (context) => {
				if (!isElectron) setFilesToUpdate()
				context.isProduction = true;
				const fuse = context.getConfig();
				context.createBundle(fuse);
				await fuse.run();
				await buildIndexFile(true)
				if (!isElectron) {
					await buildWebAppFiles()
					compressor.minify({
						compressor: "babel-minify",
						input: completeDistPath + "/sw.js",
						output: completeDistPath + "/sw.js",
						callback: function (err, min) {
							console.log("Service Worker minified !")
						}
					});
				} else cleanIndexFile();
			});

			task("electron", [process.env.NODE_ENV === "production" ? "prod" : "dev"], async (context) => {
				context.isElectronTask = true;
				const fuse = context.getConfig();
				context.createBundle(fuse, "electron", "[" + wapitisConfig.electronStartFile + "]");
				await files.copy(completeSrcPath + "/www/electron", completeDistPath)
				if (process.env.NODE_ENV === "production") {
					await fuse.run()
					// launch electron build
					await files.rename(completeDistPath + "/favicon.ico", completeDistPath + "/icon.ico")
					await files.copy(completeDistPath, __dirname + "/dist")
					try {
						const config = {
							"copyright": packageJson.author,
							"productName": packageJson.name,
							"asarUnpack": "./dist/*",
							"files": [
								"dist"
							],
							"directories": {
								"output": __dirname + "/dist"
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
							"nsis": {
								"installerIcon": "dist/icon.ico",
								"uninstallerIcon": "dist/icon.ico",
								"deleteAppDataOnUninstall": true,
								"perMachine": true,
								"artifactName": packageJson.name + ".exe",
								"uninstallDisplayName": "uninstall_" + packageJson.name + ".exe"
							},
							"appId": packageJson.author + "." + packageJson.name,
							"mac": {
								"category": packageJson.author + "." + packageJson.name
							},
							"win": {
								"target": [
									"nsis"
								],
								"icon": "dist/icon.ico",
								"requestedExecutionLevel": "requireAdministrator",
							},
							"linux": {
								"target": [
									"deb",
									"AppImage"
								]
							}
						}
						if (process.argv[3] === "--publish") config.publish = { "provider": process.env.WAPITIS_SOURCES_PROVIDER }
						const result = await builder.build({
							publish: process.argv[3] === "--publish" ? "always" : "never",
							config
						})
						let spacer = result[1].includes("\\") ? "\\" : "/";
						let fileName = result[1].substring(result[1].lastIndexOf(spacer) + 1);
						files.remove(completeDistPath);
						await files.copy(result[1], completeDistPath + "/" + packageJson.name + "_" + packageJson.version + "_" + formatDateToYYYYMMDDHHMM(new Date()) + "_setup" + fileName.substring(fileName.lastIndexOf(".")))
						files.remove(__dirname + "/dist")
					} catch (error) {
						log(error)
					}
				} else {
					await fuse.run()
					// launch electron dev
					tools.runCommandAsync("npx electron " + completeDistPath + "/electron.js");
				}
			});
		}

		if (arg === "electron" && process.argv[3] === "--publish" && (!process.env.WAPITIS_SOURCES_PROVIDER || !process.env.GH_TOKEN)) {
			console.log("\nAfin de publier votre application, certaines informations sont nécessaires. Cela permettra de mettre en place un système d'auto-update de votre application Electron et une gestion plus fluide de vos futures release.\nUn code (personal access token) est nécessaire. Il peut être généré et récupéré comme décrit dans le lien suivant :\nhttps://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line.\nVous pourrez ensuite le rentrer ici ou créer directement une variable d\'environnement avec le nom GH_TOKEN.\n")
			let publishQuestions = [
				{
					name: 'continue',
					type: 'confirm',
					message: 'Voulez vous poursuivre:'
				}
			]
			inquirer.prompt(publishQuestions).then((answers) => {
				if (answers.continue) {
					publishQuestions = []
					if (!process.env.WAPITIS_SOURCES_PROVIDER) {
						publishQuestions.push({
							name: 'srcprovider',
							type: 'input',
							message: 'Quel est le nom de votre provider:',
							validate: function (value) {
								if (value.length) return true;
								else return 'Entrez le nom de votre provider';
							},
							default: "github"
						})
					}
					if (!process.env.GH_TOKEN) {
						publishQuestions.push({
							name: 'ghtoken',
							type: 'input',
							message: 'Quel est votre personal access token (si vous n\'avez pas de code, rendez vous ici: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line.):'
						})
					}
					inquirer.prompt(publishQuestions).then((answers) => {
						if (!process.env.WAPITIS_SOURCES_PROVIDER) dotEnv.set({ WAPITIS_SOURCES_PROVIDER: answers.srcprovider })
						if (answers.ghtoken.length && !process.env.GH_TOKEN) dotEnv.set({ GH_TOKEN: answers.ghtoken })
						else {
							console.log(chalk.red("Aucun personal access token n'a été renseigné"))
							return
						}
						startTask()
					})
				} else return
			})
		} else startTask()
	} else {
		log(chalk.red(arg + " n'est pas pris en charge par wapitis"));
	}
} else {
	log(chalk.green(figlet.textSync('WApiTis', { horizontalLayout: 'full' }) + chalk.bold(' ' + JSON.parse(files.readFileSync(__dirname + "/package.json", "utf8")).version)));
	log("");
	log(chalk.green(chalk.bold("  wapitis init") + " ---> initialise la web app en créant les fichiers et les dossiers nécessaires"));
	log(chalk.green(chalk.bold("  wapitis dev") + "  ---> lance la web app dans un serveur local. --webapp pour générer service worker, manifest et polyfills"));
	log(chalk.green(chalk.bold("  wapitis prod") + " ---> web app pour la production"));
	log(chalk.green(chalk.bold("  wapitis electron") + "  ---> lance la webApp dans electron avec un serveur local (--dev), pour la production (--prod) ou pour une publication directe (--publish)"));
	log(chalk.green(chalk.bold("  wapitis clear") + " ---> supprime le cache et le dossier dist"));
	log(chalk.green(chalk.bold("  wapitis generate class path/du/fichier.ts(x)") + " ---> génère une classe relatif à src"));
	log(chalk.green(chalk.bold("  wapitis generate component path/du/fichier.ts(x)") + " ---> génère un composant relatif à src"));
}