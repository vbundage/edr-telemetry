const path = require('path');
const { readFile } = require('fs/promises');
const Process = require('../lib/process');
const Network = require('../lib/network');
const File = require('../lib/file');

const mapOperationToActivity = op => {
  if (op.operationType === 'process') return new Process(op.command)
  if (op.operationType === 'file') {
    return new File(
      path.basename(op.filename),
      op.fileAction,
      op.content,
      path.dirname(op.filename) === '.' ? undefined : path.dirname(op.filename),
      op.ext
    );
  }
  if (op.operationType === 'network') return new Network(op.url, op.message);
  return null;
};

const processConfig = async configPath => {
  let fileConfig;
  fileConfig = JSON.parse(await readFile(configPath, { encoding: 'utf-8' }));
  const operations = fileConfig.operations.map(mapOperationToActivity);
  return operations;
};

module.exports = {
  processConfig,
};
