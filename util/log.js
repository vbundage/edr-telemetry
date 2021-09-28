const fsUtil = require('./fs');

const LOG_PATH = './logs'

const writeToLog = async (activities, logName) => {
  for (const activity of activities) {
    try {
      await activity.startActivity();
      const readObj = JSON.parse(await fsUtil.readFile(LOG_PATH + logName));
      const writeObj = {}
      writeObj[`${activity.type}`] = activity;
      readObj.push(writeObj);
      await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify(readObj, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  }
};

const logActivity = async activities => {
  const logDirExists = await fsUtil.fileExists('./logs');
  if (!logDirExists) await fsUtil.makeDir('./logs');
  const logName = `/${(new Date()).toISOString()}-log.json`;
  await fsUtil.writeFile(LOG_PATH + logName, JSON.stringify([], null, '\t'));
  await writeToLog(activities, logName);
};

module.exports = {
  logActivity,
};
