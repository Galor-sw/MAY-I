const {app} = require("./server/routers/mainRoute");
const port = process.env.PORT || 4020;
const mongoose = require("mongoose");
const MongoStorage = require("./server/data/mongoStorage");
mongoose.set('strictQuery', true);
const DB = new MongoStorage();
const path = require("path");

require('dotenv').config();

app.listen(port, () => console.log(`Express server is running on port ${port}`));
