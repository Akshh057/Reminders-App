'use strict';

const newReminder = require('../models/newReminder');

const notificationWorkerFactory = function () {
    return {
        run: function () {
            newReminder.sendNotifications();
        },
    };
};

module.exports = notificationWorkerFactory();
