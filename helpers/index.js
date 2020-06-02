const { prefix } = require('../json/config.json');
const { moderate } = require('../json/data.json');

const formatDate = (date) => {
    return date.toString().substr(4, 12);
};

const moderateMessagesCommand = (message) => {
    let slangsUsed = [];
    moderate.forEach((msg) => {
        if (message.content.includes(msg)) {
            slangsUsed.push(msg);
        }
    });
    return slangsUsed;
};

module.exports = {
    formatDate: formatDate,
    moderateMessagesCommand: moderateMessagesCommand,
};
