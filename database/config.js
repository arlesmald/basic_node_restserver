const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("Connection established");
        
    } catch (error) {
        console.log(error)
        throw new Error ('An error has ocurred trying to connect to the database')
    }

}

module.exports = {
    dbConnection
}