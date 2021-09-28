Telemetry
=========

Telemetry is a framework used to generate activity such as process, file, and network activity. The logged activity is used to test an EDR agent to ensure it captures data properly. 

<!-- toc -->
- [Telemetry](#telemetry)
- [Built With](#built-with)
- [Usage](#usage)
- [Command](#command)
- [Configuration](#configuration)
  - [Process](#process)
  - [File](#file)
  - [Network](#network)
- [Assumptions](#assumptions)
- [Future Work](#future-work)

# Built With
- [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime
- [oclif](https://oclif.io/) - CLI configuration
- [Axios](https://axios-http.com/) - HTTP requests
- [Mocha](https://mochajs.org/) - Test framework
<!-- tocstop -->
# Usage
<!-- usage -->
Install dependencies with `npm install`.

(Optional) To run the command as `telemetry` execute `npm link`.

Run command using default config file with
`./bin/run` or `telemetry` in the application root directory. A config file path can also be specified.
<!-- usagestop -->
<!-- command -->
# Command
Generate logs for activity such as process, file, and network activity.
```
USAGE
  $ telemetry

OPTIONS
  -c, --config=config  json configuration file path to generate telemetry
  -h, --help           show CLI help
  -v, --version        show CLI version
```

<!-- commandstop -->

# Configuration
A JSON configuration file path can be passed as a flag to the command. This configuration file can be used to define the types of operations you want the framework to execute. 

`operations`: a list of operations to generate

`operationType`: defined as `process`, `file`, or `network`

## Process
`command`: OS command to execute

## File
`fileAction`: defined as `create`, `modify`, or `delete`

`filename`: filename to enact action on. Can also provide a full/relative path to the file

`ext`(optional): extension of the file

`content`: used with a `modify` file action to append text to the file. 

## Network
`url`: endpoint to send a POST request to

`message`: text content to send with the POST request


A configuration file is provided as `default_config.json` and is used by default when running from the root directory or you can create your own instead.

```
{
  "operations": [
    {
      "operationType": "process",
      "command": "whoami"
    },
    {
      "operationType": "process",
      "command": "ls -lah"
    },
    {
      "operationType": "file",
      "fileAction": "create",
      "filename": "majora",
      "ext": "csv"
    },
    ...
}
```

# Assumptions
- The log should be written to after each activity completes
- For file operations (delete/modify), if a file does not exist then create it first
- Establishing a network connection and transmitting data uses a POST request
- Data transmitted can be a JSON object containing a message in text.
- Filename property in configuration file can also be used with a file path.
- Files created or modified during tests should not be deleted unless specified.

# Future Work
- Test Windows support as the application was tested in a Unix environment.
- Support for other log types than JSON format.
- Support for different HTTP request types as the application relies on a consumer that accepts POST requests in JSON format. 
- Allow the user to provide a directory path for logs to be written to. 
- Additional unit tests for less happy path bias such as exceptions thrown and improper configuration file format. 
- Allow dynamic configuration file generation through prompting the user. Would be useful for creating quick and small telemetry tests. 
