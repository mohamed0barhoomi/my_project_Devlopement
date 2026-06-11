const express=require("express")
const cors = require("cors")

// app use ...
const app = express()
app.use(express.json())
app.use(cors())
// using ".env"
const dotenv = require("dotenv")
dotenv.config()

// routing

app.use("/api/user",require("./routes/user_route"))
app.use("/api/admin",require("./routes/admin_route"))





// connection databse
const Connect_DB = require("./config/connect_db")
Connect_DB()


//connection to localhost 
const port = process.env.PORT
app.listen(port,()=>console.log("my app run at port ",port))