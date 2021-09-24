const fsUtil = require('./fs');

const LOG_PATH = './logs'
const logActivity = async operations => {
  const logName = `/${(new Date()).toUTCString()}_log.json`;
  await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify([], null, '\t'));
  for (const operation of operations) {
    await operation.startActivity();
    const readObj = JSON.parse(await fsUtil.readFile(LOG_PATH + logName));
    const writeObj = {}
    writeObj[`${operation.type}`] = operation;
    readObj.push(writeObj);
    await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify(readObj, null, '\t'));
  }
};

module.exports = {
  logActivity,
};
