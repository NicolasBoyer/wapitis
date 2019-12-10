const execute = require('child_process').execSync

const tools = module.exports = {
	runCommand: (cmd, options = {}) => {
		const folderExec = options.cwd || null
		if (!options.noOutput) console.log('\n' + cmd + '\n')
		const execOptions = { cwd: folderExec, stdio: 'inherit' }
		if (options.noOutput) execOptions.stdio = 'ignore'
		execute(cmd, execOptions)
	}
}