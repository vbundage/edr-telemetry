const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux');
const configUtil = require('../util/config');
const fsUtil = require('../util/fs');
const logUtil = require('../util/log');

class TelemetryCommand extends Command {
  async run() {
    const {flags} = this.parse(TelemetryCommand)
    const configPath = flags.config || './default_config.json';

    try {
      const configExists = await fsUtil.fileExists(configPath);
      if (!configExists) {
        console.log('Please enter a valid config path.');
        return;
      }

      cli.action.start('Processing configuration file');
      const activities = await configUtil.processConfig(configPath);
      cli.action.stop();

      cli.action.start('Generating and logging activity');
      await logUtil.logActivity(activities);
      cli.action.stop();
      console.log('Check the logs directory for your log file!');
    } catch (error) {
      throw error;
    }
  }
}

TelemetryCommand.description = 'Generate logs for activity such as process, file, and network activity.';

TelemetryCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  config: flags.string({char: 'c', description: 'json configuration file path to generate telemetry'}),
};

module.exports = TelemetryCommand;
