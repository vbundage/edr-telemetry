const {Command, flags} = require('@oclif/command')
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

      const activities = await configUtil.processConfig(configPath);
      await logUtil.logActivity(activities);
    } catch (error) {
      throw error;
    }
  }
}

TelemetryCommand.description = 'Telemetry is a framework used to generate activity such as process, file, and network activity.';

TelemetryCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  config: flags.string({char: 'c', description: 'json configuration file path to generate telemetry'}),
};

module.exports = TelemetryCommand;
