const fs = require('fs');
const path = require('path');

function getSmartUIServerAddress() {
  return process.env.SMARTUI_SERVER_ADDRESS || 'http://localhost:8080';
}

module.exports = {
  getSmartUIServerAddress,
};
