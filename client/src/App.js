import logo from './logo.svg';
import './App.css';
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';

function App() {

  const [addSection, setAddSection] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
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
              <input type="text" id="name" name="name"/>
  
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email"/>
  
              <label htmlFor="mobile">Mobile</label>
              <input type="number" id="mobile" name="mobile"/>
  
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
