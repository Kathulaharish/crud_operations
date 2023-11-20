import logo from './logo.svg';
import './App.css';
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';
import axios from "axios"

// axios.default.baseURL = "http://localhost:8080/"

function App() {

  const [addSection, setAddSection] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const handleOnChange = (e)=>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    // this is for sending the data to the database
    try{
      const data = await axios.post("http://localhost:8080/create", formData)
      console.log(data)
    }catch(error){
      console.log("Error while submitting the form", error)
    }
  }
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

        {
          addSection && (
            <div className='addContainer'>
          
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={()=>setAddSection(false)}><MdOutlineClose/></div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={handleOnChange}/>
  
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={handleOnChange}/>
  
              <label htmlFor="mobile">Mobile</label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnChange}/>
  
              <button className="btn">Submit</button>
            </form>
          </div>
          )

        }


      </div>
    </>
  );
}

export default App;
