import logo from './logo.svg';
import './App.css';
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from "axios"

// axios.default.baseURL = "http://localhost:8080/"

function App() {

  const [addSection, setAddSection] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const [dataList, setDataList] = useState([])

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
      if(data.data.success){//in data->data->success see browser console
        setAddSection(false)
        alert(data.data.message)//in data section data message see browser console
      }
    }catch(error){
      console.log("Error while submitting the form", error)
    }
  }

  const getFetchData = async()=>{
    const data = await axios.get("http://localhost:8080/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }

  useEffect (()=>{
    getFetchData()
  }, [])

  console.log(dataList)
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

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                dataList.map((e1)=>{
                  return(
                    <tr>
                      <td>{e1.name}</td>
                      <td>{e1.email}</td>
                      <td>{e1.mobile}</td>
                      <td>
                        <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete'>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
