const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080


//Schema or Model
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
}, {timestamps: true})

const userModel = mongoose.model("user", schemaData)

app.get('/', (req, res)=>{
    res.json({message: "Server is Running"})
})

//database
mongoose.connect("mongodb://127.0.0.1:27017/crudOperation")
.then(()=>{
    console.log("Connect to DataBase")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

