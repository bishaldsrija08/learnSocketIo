const mongoose = require('mongoose')


async function connectToDatabase() {
    try {
        const connectionString = "mongodb+srv://user:pass@cluster0.wy8zd5z.mongodb.net/?appName=Cluster0"
        await mongoose.connect(connectionString)
        console.log("Databae connected successfully!")
    } catch (error) {
        console.log("Database connection failed:", error)
    }
}

module.exports = connectToDatabase