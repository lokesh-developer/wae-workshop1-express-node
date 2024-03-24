const moongoose = require("mongoose")
const dbUrl = "mongodb+srv://lokesh-kabra:lokesh12@cluster0.bmw0v.mongodb.net/wae-workshop"

async function db() {
    moongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('MongoDB connection error:', error));
    // try {
    //     const mongodb = await moongoose.connect(dbUrl, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useCreateIndex: true
    //     })
    //     if (mongodb) {
    //         console.log("Connected to MongoDB")
    //     }
    // } catch (error) {
    //     console.error('MongoDB connection error:', error)
    // }


}

module.exports = db;