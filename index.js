const express  = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const authRoute = require("./routes/auth");
const updateRoute = require("./routes/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.log(err));

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/update",updateRoute);


app.listen(process.env.PORT || 8000,()=>{
    console.log("Running server");
})