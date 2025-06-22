const { setTimeout } = require('timers');

module.exports = function delay(message, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, ms);
  });
};
