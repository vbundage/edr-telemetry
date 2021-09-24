const {Command, flags} = require('@oclif/command')
const configUtil = require('../util/config');
const fsUtil = require('../util/fs');
const logUtil = require('../util/log');

class TelemetryCommand extends Command {
  async run() {
    const {flags} = this.parse(TelemetryCommand)
    const configPath = flags.config || './default_config.json';

    try {
      const exists = await fsUtil.fileExists(configPath);
      if (!exists) {
        console.log('Please enter a valid config path.');
        return;
      }

      const operations = await configUtil.processConfig(configPath);
      logUtil.logActivity(operations);
    } catch (error) {
      console.error(error);
    }
  }
}

TelemetryCommand.description = '';

TelemetryCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  config: flags.string({char: 'c', description: 'configuration file path to generate telemetry'}),
};

module.exports = TelemetryCommand;
