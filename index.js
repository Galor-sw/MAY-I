const {app} = require("./server/routers/mainRoute");
const port = process.env.PORT || 4020;
// const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

app.listen(port, () => console.log(`Express server is running on port ${port}`));
