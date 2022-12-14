const {app} = require("./server/routers/mainRoute");
const port = process.env.PORT || 4020;
const mongoose = require("mongoose");
const MongoStorage = require("./server/data/mongoStorage");
const DB = new MongoStorage();
const path = require("path");
mongoose.set('strictQuery', true);
require('dotenv').config();

// require('dotenv').config({path: path.join(process.cwd() + ".env")});

// DB.connect();

app.listen(port, () => console.log(`Express server is running on port ${port}`));
