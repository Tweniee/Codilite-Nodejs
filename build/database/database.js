"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../dependencies/dependencies");
// MongoDB connection URL
const mongoURI = "mongodb://localhost/mydatabase";
// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
dependencies_1.mongoose
    .connect(mongoURI, options)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    // Handle specific error conditions
    if (error.name === "MongoNetworkError") {
        console.error("Network error occurred. Check your MongoDB server.");
    }
    else if (error.name === "MongooseServerSelectionError") {
        console.error("Server selection error. Ensure" + " MongoDB is running and accessible.");
    }
    else {
        // Handle other types of errors
        console.error("An unexpected error occurred:", error);
    }
});
// Gracefully close the connection when the application exits
process.on("SIGINT", () => {
    dependencies_1.mongoose.connection.close(() => {
        console.log("Mongoose connection is disconnected" + " due to application termination");
        process.exit(0);
    });
});
