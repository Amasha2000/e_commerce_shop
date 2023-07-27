const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("../api/routes/user")
const authRoute = require("../api/routes/auth")
const productRoute = require("../api/routes/product")
const cartRoute = require("../api/routes/cart")
const orderRoute = require("../api/routes/order")
const stripeRoute = require("../api/routes/stripe")
const cors = require('cors')

dotenv.config();

mongoose.connect(
   process.env.MONGO_URL
)
.then(()=>console.log("DB Connection is successful!"))
.catch((err)=>{
    console.log(err);
});

app.use(express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/checkout",stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is Running!");
  });