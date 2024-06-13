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

app.get("/", (req, res) => {
    res.send("Kryzen Server");
  });

app.use("/user",userRouter);

//app.use(Authentication);

app.use("/product", prodcutRouter);


app.listen(PORT, () => {
    console.log("Your Server is running on PORT no ==> " + PORT)
})

