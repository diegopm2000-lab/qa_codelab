// mongoose.helper.mock.js

function connect() {
  return new Promise((resolve) => {
    resolve(true);
  });
}

module.exports = {
  connect,
};
