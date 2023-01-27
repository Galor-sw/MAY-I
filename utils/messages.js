const moment = require('moment');

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('LT'),
        id: `${username}+${text}+${Date.now()}`
    };
};

module.exports = formatMessage;
