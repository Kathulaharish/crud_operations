const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");


const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors())
//here we are accepting data in JSON format
app.use(express.json())

const PORT = process.env.PORT || 8080


//Schema or Model
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {timestamps: true})

const userModel = mongoose.model("user", schemaData)


//read data api
// http://localhost:8080/
app.get('/', async (req, res)=>{
    const data = await userModel.find({})
    res.json({success: true, data: data})
})

//create data || save data in mongodb
// http://localhost:8080/create
/*
    {
        name,
        email,
        mobile,
    }

*/
app.post("/create", async(req, res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true, message: "Data saved successfully"})
})

//update data api
// http://localhost:8080/update
/*
    {
        id: "",
        name : "",
        email: "",
        mobile: ""
    }

*/
app.put("/update", async(req, res)=>{
    console.log(req.body)
    const {_id, ...rest } = req.body

    console.log(rest)

    const data = await userModel.updateOne({_id: _id}, rest)
    res.send({success: true, message: "Data updated successfully", data: data})
})

//delete data api
// http://localhost:8080/delete/id
app.delete('/delete/:id', async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id: id})
    res.send({success: true, message: "data deleted successfully"})
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

