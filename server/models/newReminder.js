const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'reminder401@outlook.com',
        pass: 'ponspons@56',
    }
});
const fast2sms = require('fast-two-sms');

const newReminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    sendOnEmail: {
        type: Boolean,
        required: true,
    },
    sendOnMobile: {
        type: Boolean,
        required: true,
    }
});
newReminderSchema.methods.requiresNotification = function (date) {
    console.log(`Current Time:${date} Remind at:${this.date}`);
    return this.date >= new Date(Date.now() - 1000) && this.date < new Date(Date.now() + 60 * 900);
    // return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
    //   .diff(moment(date).utc())
    // ).asMinutes()) === this.notification;
};
newReminderSchema.statics.sendNotifications = function (callback) {
    // now
    const searchDate = new Date();
    newReminder
        .find()
        .then(function (newReminders) {
            newReminders = newReminders.filter(function (newReminder) {
                // console.log(`serachDate:${searchDate}`);
                return newReminder.requiresNotification(searchDate);
            });
            if (newReminders.length > 0) {

                sendNotifications(newReminders);
            }
        });
    // this.remindAt >= new Date() && this.remindAt < new Date(Date.now() + 60 * 1000)
    function sendNotifications(newReminders) {
        console.log(`entered for sms`);;
        newReminders.forEach(function (newReminder) {
            if (newReminder.sendOnEmail && newReminder.sendOnMobile) {
                const options = {
                    from: 'reminder401@outlook.com',
                    to: newReminder.email,
                    subject: newReminder.title,
                    text: `${newReminder.description}`,
                };
                transporter.sendMail(options, function (err, info) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`sent ${info.response}`);
                })
                async function sendMail() {

                    try {
                        const res = await fast2sms.sendMessage({
                            authorization: process.env.SMS_API_KEY,
                            message: "Hello your reminder is : " + newReminder.description,
                            numbers: [newReminder.mobile],
                        })
                        console.log("enter");
                    } catch (err) {
                        console.log(err);
                    }
                }
                sendMail();
            }


            // console.log(`email sent to ${newReminder.email}`);
        });


        if (callback) {
            callback.call();
        }
    }
};

const newReminder = new mongoose.model('newreminder', newReminderSchema);

module.exports = newReminder;