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
      op.content !== undefined ? op.content : undefined,
      path.dirname(op.filename) === '.' ? undefined : path.dirname(op.filename)
    );
  }
  if (op.operationType === 'network') return new Network(op.url, op.message);
  return null;
};

const processConfig = async configPath => {
  let fileConfig;
  try {
    fileConfig = JSON.parse(await readFile(configPath, { encoding: 'utf-8' }));
  } catch (error) {
    throw error;
  }
  const operations = fileConfig.operations.map(mapOperationToActivity);
  return operations;
};

module.exports = {
  processConfig,
};
