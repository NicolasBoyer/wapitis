const execute = require('child_process').exec;

const tools = module.exports = {
	runCommand: (cmd, cwd, noOutput) => {
		const folderExec = cwd || null
		return new Promise((resolve, reject) => {
			execute(cmd, { cwd: folderExec }, (error, stdout, stderr) => {
				if (error) {
					reject(error);
					return;
				}
				if (!noOutput) {
					console.log(stdout)
					console.log(stderr)
				}
				resolve(stdout.trim())
			})
		})
	}
}