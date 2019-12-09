const execute = require('child_process').exec;

const tools = module.exports = {
	runCommand: async (cmd, cwd, noOutput) => {
		await new Promise(() => {
			const folderExec = cwd || null
			execute(cmd, { cwd: folderExec }, (error, stdout, stderr) => {
				if (!noOutput) {
					console.log(stdout)
					console.log(stderr)
				}
			})
		})
	}
};