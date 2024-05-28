const express = require("express");
const connectionDb = require("./connection");
const userRouter = require("./routes/user");
const errorHandler = require("./middleware/errroHandler");
const contact = require("./routes/contact");
const app = express();
require("dotenv").config();
connectionDb();
app.use(express.json());
app.use("/user", userRouter);
app.use("/contact", contact);
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Port is listening on ${process.env.PORT}`);
})
