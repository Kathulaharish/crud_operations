import logo from './logo.svg';
import './App.css';
import { MdOutlineClose } from "react-icons/md";

function App() {

  return (
    <>
      <div className="container">
        <button className="btn btn-add">Add</button>
        <div className='addContainer'>
          
          <form>
            <div className="close-btn"><MdOutlineClose/></div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"/>

            <label htmlFor="mobile">Mobile</label>
            <input type="number" id="mobile" name="mobile"/>

            <button className="btn">Submit</button>
          </form>
        </div>

      </div>
    </>
  );
}

export default App;
