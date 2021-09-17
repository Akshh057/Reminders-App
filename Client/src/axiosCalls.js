import axios from 'axios';
const baseUrl = 'https://eday-reminders.herokuapp.com'
const API = {
    createReminder: function (newReminder, config) {
        return axios.post(`${baseUrl}/users/newReminder`, newReminder, config)
    },
    fetchReminder: function (email, config) {
        return axios.get(`${baseUrl}/users/fetchReminder?email=${email}`, config)
    },
    updateReminders: function (updateRem, config) {
        return axios.patch(`${baseUrl}/users/updateReminder`, updateRem, config)
    },
    deleteReminder: function (id, config) {
        return axios.delete(`${baseUrl}/users/deleteReminder?id=${id}`, config)
    },
    writeFeedback: function (feed) {
        return axios.post(`${baseUrl}/users/feedback`, feed)
    }
}

export default API