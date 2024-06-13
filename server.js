const express = require('express');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const { Authentication } = require("./middleware/authentication")

//DB connection
require("./db/connection");

//router
const { userRouter } = require("./routes/user.routes");
const prodcutRouter = require("./routes/product.routes");

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);

app.use(Authentication);

app.use("/product", prodcutRouter);

//listen(server)
app.listen(PORT, () => {
    console.log("Your Server is running on PORT no ==> " + PORT)
})





// const express = require("express");
// const cors = require("cors");
// // const jwt = require("jsonwebtoken");
// // const { Sequelize } = require("sequelize");

// const { userRouter } = require("./routes/user.routes");
// const { productRouter } = require("./routes/product.routes");
// const { Authentication } = require("./middleware/authentication");
// // const { verifyRefresh } = require("./middleware/authentication");

// console.log(Authentication);
// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin: "*"
// }));

// require("dotenv").config();

// //DB connection
// require("./db/connection");


// app.get("/", (req, res) => {
//     res.send("Welcome to Our App");
// });

// app.use("/user", userRouter);

// app.use(Authentication);

// app.use(productRouter);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log("Your Server is running on PORT no ==> " + PORT)
// })