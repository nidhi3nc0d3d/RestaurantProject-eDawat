import './App.css';
// import NavBar from './components/NavBar';
import SideBar from './components/Sides/SideBar';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AddMenu } from './pages/Menu';
import { AddCategory, DeleteCategpry } from './pages/Category';
import { AddDish, UpdateDish, DeleteDish } from './pages/Dish';
import Support from './pages/Support';
import ShowMenus from './pages/ShowMenus';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

function App() {
  function isVerified()
  {
    const info = sessionStorage.getItem("isVerified");
    if(info == "true")    
    {
      return true;
    }
    return false;
  } 
  const navigate = useNavigate();

  


  function onClickHandeler(userName, password) {
    if (userName === "") {
      alert("Please enter the user-name!");
      return;
    }
    if (password === "") {
      alert("Please enter the password!");
      return;
    }
    const data = {
      userId: userName,
      password: password
    }
    fetch("https://localhost:7053/api/Users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }).then(response => response.json()).then(dat => {
      
      // setting information in localStorage
      sessionStorage.setItem("isVerified", dat);
      if(dat == false)
      alert("user-name or password is incorrect!!");
      else
      {
        console.log("done") 
        navigate("/")
      }
    });

  }

 
  console.log(isVerified());
  return ( 
    <div className="App">
      
        <SideBar /> 
        <Routes>
          <Route path="/" element={isVerified() ? <Welcome /> : <Navigate to = "/login"/>} exact />
          <Route path='/ShowMenus' element={isVerified() ? <ShowMenus /> : <Navigate to = "/login"/>} />
          <Route path='/Menu/Add' element={isVerified() ? <AddMenu /> : <Navigate to = "/login"/>} />

          <Route path='/Category/AddCategory' element={isVerified() ? <AddCategory /> : <Navigate to = "/login"/>} />
          <Route path='/Category/Delete' element={isVerified() ? <DeleteCategpry /> : <Navigate to = "/login"/>} />

          <Route path='/Dish/NewDish' element={isVerified() ? <AddDish /> : <Navigate to = "/login"/>} />
          <Route path='//Dish/Update' element={isVerified() ? <UpdateDish /> : <Navigate to = "/login"/>} />
          <Route path='/Dish/Delete' element={isVerified() ? <DeleteDish /> : <Navigate to = "/login"/>} />

          <Route path='/support' element={isVerified() ? <Support /> : <Navigate to = "/login"/>} />

          
          <Route path="/login" element= {<Login onClickHandeler = {onClickHandeler}/>}/>
          <Route path="*" element={isVerified() ? <Welcome /> : <Navigate to = "/login"/>} />
        </Routes>
     
    </div>
  );
}

export default App;
