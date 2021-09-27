const fsUtil = require('./fs');

const LOG_PATH = './logs'

const writeToLog = async (operations, logName) => {
  for (const operation of operations) {
    try {
      await operation.startActivity();
      const readObj = JSON.parse(await fsUtil.readFile(LOG_PATH + logName));
      const writeObj = {}
      writeObj[`${operation.type}`] = operation;
      readObj.push(writeObj);
      await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify(readObj, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  }
};

const logActivity = async operations => {
  const logDirExists = await fsUtil.fileExists('./logs');
  if (!logDirExists) await fsUtil.makeDir('./logs');
  const logName = `/${(new Date()).toISOString()}-log.json`;
  await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify([], null, '\t'));
  await writeToLog(operations, logName);
};

module.exports = {
  logActivity,
};
