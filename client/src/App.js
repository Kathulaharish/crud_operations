import logo from './logo.svg';
import './App.css';
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from './components/Formtable';

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
        getFetchData()
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

  // console.log(dataList)

  const handleDelete = async(id)=>{
    const data = await axios.delete("http://localhost:8080/delete/"+id)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (id)=>{

  }
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

        {
          addSection && (
            <Formtable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleClose={()=>setAddSection(false)}
            />
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
              { dataList[0] ? (
                dataList.map((e1)=>{
                  return(
                    <tr>
                      <td>{e1.name}</td>
                      <td>{e1.email}</td>
                      <td>{e1.mobile}</td>
                      <td>
                        <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete' onClick={()=>handleDelete(e1._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                }) )
                : (
                  <p style={{textAlign: "center"}}>No Data</p>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
