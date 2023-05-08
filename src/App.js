import './App.css';
// import NavBar from './components/NavBar';
import SideBar from './components/Sides/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Menu,DisplayMenu,AddMenu} from './pages/Menu';
import {Category,AddCategory,DisplayCategory,DeleteCategpry } from './pages/Category';
import {Dish,AddDish,DisplayDish,UpdateDish,DeleteDish} from './pages/Dish';
import Support from './pages/Support';
// import { Footer } from './components/Sides/Footer';


function App() {
  return (
    <div className="App">
      <Router>
      <SideBar/>
        <Routes>
          <Route path='./Menu' element={<Menu />} />
          <Route path='/Menu/Display' element={<DisplayMenu />} />
          <Route path='/Menu/Add' element={<AddMenu />} />

          <Route path='./Category' element={<Category />} />
          <Route path='/Category/AllCategory' element={<DisplayCategory />} />
          <Route path='/Category/AddCategory' element={<AddCategory />} />
          <Route path='/Category/Delete' element={<DeleteCategpry />} />


          <Route path='./Dish' element={<Dish/>} />
          <Route path='/Dish/AllDishes' element={<DisplayDish/>} />
          <Route path='/Dish/NewDish' element={<AddDish/>} />
          <Route path='//Dish/Update' element={<UpdateDish/>} />
          <Route path='/Dish/Delete' element={<DeleteDish />} />

          <Route path='/support' element={<Support />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
