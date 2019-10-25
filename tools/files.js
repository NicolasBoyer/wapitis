const fs = require('fs-extra');
const path = require('path');

var files = module.exports = {
	getCurrentDirectoryBase: () => {
		return path.basename(process.cwd());
	},

	directoryExists: (filePath) => {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},

	fileExists: (filePath) => {
		try {
			return fs.existsSync(filePath);
		} catch (err) {
			return false;
		}
	},

	getFileInCurrentContext: (filePath) => {
		return path.resolve(__dirname, filePath);
	},

	createDir: (name) => {
		var dir = "./" + name;
		if (!fs.existsSync(dir)) fs.mkdirsSync(dir);
		return dir;
	},

	createFile: (filePath) => {
		return fs.openSync(filePath, 'w');
	},

	appendFile: (file, text, replace) => {
		return new Promise((resolve) => {
			if (replace) {
				if (fs.existsSync(file)) fs.unlinkSync(file);
				fs.outputFile(file, text, (err) => {
					if (err) return console.log(err);
					resolve();
				});
			} else {
				fs.appendFile(file, text, (err) => {
					if (err) return console.log(err);
					resolve();
				});
			}
		});
	},

	removeDir: (filePath, excludes = []) => {
		if (fs.existsSync(filePath)) {
			try {
				fs.readdirSync(filePath).forEach((file) => {
					var curPath = filePath + "/" + file;
					if (!excludes.includes(file)) {
						if (fs.lstatSync(curPath).isDirectory()) files.removeDir(curPath, excludes);
						else fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(filePath);
			} catch (error) { }
		}
	},

	removeFile: (filePath) => {
		if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
	},

	remove: (filePath, excludes = []) => {
		if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) files.removeDir(filePath, excludes);
		else files.removeFile(filePath);
	},

	readFile: (filePath, callback) => {
		if (fs.existsSync(filePath)) fs.readFile(filePath, 'utf8', callback);
	},

	readFileSync: (filePath) => {
		if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8');
	},

	readDir: (name, callback) => {
		var dir = "./" + name;
		if (fs.existsSync(dir)) fs.readdir(dir, callback);
	},

	getAllFiles: (dir, excludes = [], filelist = { allFiles: [], tsCommonFiles: [], tsPageFiles: [], importFiles: [], cssFiles: [], jsFiles: [], htmlFiles: [], imgFiles: [], mediasFiles: [], attachmentsFiles: [], datasFiles: [], fontsFiles: [] }) => {
		fs.readdirSync(dir).forEach(file => {
			if (fs.statSync(path.join(dir, file)).isDirectory() && !excludes.includes(file)) filelist = files.getAllFiles(path.join(dir, file), excludes, filelist);
			else {
				if (!excludes.includes(file)) filelist.allFiles = filelist.allFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:ts|tsx)$/)) filelist.tsCommonFiles = filelist.tsCommonFiles.concat(path.join(dir, file));
				// if ((file.includes('.ts') || file.includes('.tsx')) && !file.includes('main_core')) filelist.tsCommonFiles = filelist.tsCommonFiles.concat(path.join(dir, file));
				// if ((file.includes('.ts') || file.includes('.tsx')) && file.includes('main_core/ts/pages')) filelist.tsPageFiles = filelist.tsPageFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:ts|tsx)$/) && !file.includes('main_core')) filelist.importFiles = filelist.importFiles.concat({ 'name': file !== "svg.js" ? file.substring(0, file.lastIndexOf('.')) : file, 'path': path.join(dir, file) });
				if (path.extname(file).toLowerCase().match(/\.(?:css)$/)) filelist.cssFiles = filelist.cssFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:js)$/) && !excludes.includes(file)) filelist.jsFiles = filelist.jsFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:html|xhtml)$/)) filelist.htmlFiles = filelist.htmlFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:svg|png|jpg|gif)$/)) filelist.imgFiles = filelist.imgFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:srt|vtt|avi|mov|mp3|mp4|mpg|opus|webm)$/)) filelist.mediasFiles = filelist.mediasFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:doc|docx|odg|odp|ods|odt|pdf|ppt|rtf|xls|xlsx|zip)$/)) filelist.attachmentsFiles = filelist.attachmentsFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:json|txt|xml)$/)) filelist.datasFiles = filelist.datasFiles.concat(path.join(dir, file));
				if (path.extname(file).toLowerCase().match(/\.(?:eot|ttf|woff|woff2|otf)$/)) filelist.fontsFiles = filelist.fontsFiles.concat(path.join(dir, file));
			}
		});
		return filelist;
	},

	writeFile: (filePath, message, callback) => {
		if (fs.existsSync(filePath)) fs.writeFile(filePath, message, callback);
	},

	createWriteStream: (filePath) => {
		return fs.createWriteStream(filePath);
	},

	copy: (oldFile, newFile) => {
		return new Promise((resolve) => {
			if (fs.existsSync(oldFile)) {
				fs.copy(oldFile, newFile, (err) => {
					if (err) return console.error(err);
					resolve();
				});
			} else console.log('Le fichier ' + oldFile + " n'existe pas.")
		});
	},

	watchFile: (filePath, cb) => {
		fs.watchFile(filePath, (curr, prev) => cb());
	},

	getModifiedTimeFileSync: (filePath) => {
		return fs.statSync(filePath).mtime
	}
};