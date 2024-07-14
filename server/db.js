const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://zainmanzoor2003:react-native-first-app123@react-native-first-app.d3vxvgp.mongodb.net/').then(() => {
            console.log('Database Connected Successfully');
        })
    } catch (error) {
        console.log('Error while connecting to the database', error.message);
    }
}

module.exports = connection;