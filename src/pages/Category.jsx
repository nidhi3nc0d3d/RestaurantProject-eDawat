import React, { useState, useEffect } from 'react';

export const AddCategory = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [hasError, setHasError] = useState(false);
  function useFetchAllMenus() {
    const [menuList, setMenuList] = useState([]);
    useEffect(() => {
      fetch("https://localhost:7053/api/Menus").then(response => response.json()).then(data => {
        setMenuList(prevData => {
          const currMenuList = [];
          for (var i = 0; i < data.length; i++) {
            const menu = data[i];
            const currMenu = {};
            currMenu.menuId = menu.menuId;
            currMenu.menuName = menu.menuName;
            currMenu.menuImage = menu.menuImage;

            currMenuList.push(currMenu);
          }

          return currMenuList;
        })
      });
    }, []);
    return menuList;
  }
  const data = useFetchAllMenus();

  function onClickHandeler() {
    if (categoryName === "" || selectedMenuId === null) {
      setHasError(true);
    }
    else {
      const data = {
        catName: categoryName,
        catImage: categoryImage
      }
      fetch("https://localhost:7053/api/Categories/" + selectedMenuId, {
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json"
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data)
      })

      setHasError(false);
      setCategoryImage("");
      setCategoryName("");
    }
  }

  return <div>
    <form>
      <fieldset>
        <legend className='MenuDetails-Heading'>
          Enter category
        </legend>
        <select className= 'DropDown' onChange={(event) => { setSelectedMenuId(event.target.value); }} required>
          <option hidden>select a menu</option>
          {
            data.map((menu, index) => <option key={index} value={menu.menuId}>{menu.menuName}</option>)
          }
        </select>
        <br />
        <input className='inputMenu'
          placeholder="Enter category name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
        <br />
        <input className='inputMenu'
          placeholder="Enter category image"
          value={categoryImage}
          onChange={(event) => setCategoryImage(event.target.value)}
        />
        <br />
        <button className='Submit-button'
          onClick={onClickHandeler}
          type="button"
        >Submit</button>
        {
          hasError ? <p>Enter all fields</p> : null
        }
      </fieldset>
    </form>
  </div>
};

export const DeleteCategpry = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  function useFetchAllCategories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      fetch("https://localhost:7053/api/Categories").then(response => response.json()).then(data => {
        setCategories(prev => {
          const currCategories = [];
          for (var i = 0; i < data.length; i++) {
            const cat = data[i];
            const currCat = {};
            currCat.catId = cat.catId;
            currCat.catName = cat.catName;
            currCat.catImage = cat.catImage;
            currCategories.push(currCat);
          }
          return currCategories;
        })
      })
    }, []);
    return categories;
  }
  const categories = useFetchAllCategories();

  function onClickHandeler() {
    if (selectedCategoryId === null) {
      alert("Please! Select a category!");
      return;
    }
    const categoryName = categories.find(cat => cat.catId == selectedCategoryId).catName;

    const consent = window.confirm("Are you sure?\n" + categoryName + " will be deleted!");
    if (consent === false)
      return;

    fetch("https://localhost:7053/api/Categories/" + selectedCategoryId, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors'
    })
  }
  return <div>
    <form>
      <fieldset>
        <legend className='MenuDetails-Heading'>
          Delete Category
        </legend>
        <select className= 'DropDown'onChange={(event) => setSelectedCategoryId(event.target.value)}>
          <option hidden>Select a category</option>
          {
            categories.map(category => <option value={category.catId} key={category.catId}>{category.catName}</option>)
          }
        </select>
        <br />
        <button className= 'Submit-button'type="button" onClick={onClickHandeler}>Delete</button>
      </fieldset>
    </form>

  </div>
};
