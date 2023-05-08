import React, {useEffect, useState} from 'react';

export const AddDish = () => {
  const [hasError, setHasError] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [dishName, setDishName] = useState("");
    const [dishPrice, setDishPrice] = useState(0);
    const [dishDescription, setDishDescription] = useState("");
    const [dishNature, setDishNature] = useState(null);
    const [dishImage, setDishImage] = useState("");
    const categories = useFetchCat();
    function useFetchCat() {
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

    function onClickHandeler()
    {
        if(selectedCategoryId === null || dishName === "" || dishNature === null)
        {
            setHasError(true);
        }
        else
        {
            const data = {
                dishName : dishName,
                dishPrice : dishPrice,
                dishDescription : dishDescription,
                dishNature : dishNature,
                dishImage : dishImage
            }
            fetch("https://localhost:7053/api/Dishes/" + selectedCategoryId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "POST",
                mode : "cors",
                body : JSON.stringify(data)
            })

            setDishName("");
            setDishImage("");
            setDishDescription("");
            setDishPrice(0);
        }
    }

    return <div>
        <form>
            <fieldset>
                <legend className='MenuDetails-Heading'>
                    Enter Dish
                </legend>
                <select className= 'DropDown' onChange = {e => setSelectedCategoryId(e.target.value)}>
                    <option hidden>Choose a category</option>
                    {
                        categories.map(category => <option value = {category.catId} key = {category.catId}>{category.catName}</option>)
                    }
                </select>
                <br/>
                <input className='inputMenu'
                    placeholder="Enter Dish Name"
                    value = {dishName}
                    onChange = {(event) => setDishName(event.target.value)}
                />
                <br/>
                <input className='inputMenu'
                    placeholder="Enter Dish Price"
                    value = {dishPrice}
                    onChange = {(event) => setDishPrice(event.target.value)}
                    type = "number"
                    min={0}
                />
                <br/>
                <select className= 'DropDown' onChange = {(e) => setDishNature(e.target.value)}>
                    <option hidden>Select Dish Nature</option>
                    <option value = "veg">Veg</option>
                    <option value = "non-veg">Non-veg</option>
                </select>
                <br/>
                <input className='inputMenu'
                    placeholder = "Enter dish image"
                    value = {dishImage}
                    onChange = {(event) => setDishImage(event.target.value)}
                />
                <br/>
                <textarea className='inputMenu'
                    placeholder="Enter description of dish"
                    value={dishDescription}
                    onChange = {(e) => setDishDescription(e.target.value)}
                />
                <br/>
                <button className='Submit-button'
                type = "button"
                onClick = {onClickHandeler}
                >Submit</button>
            </fieldset>
        </form>
    </div>
};

export const UpdateDish = () => {
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState(0);
  const [dishDescription, setDishDescription] = useState("");
  const [dishNature, setDishNature] = useState(null);
  const [dishImage, setDishImage] = useState("");
  function useFetchAllDishes()
{
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        console.log("hey");
        fetch("https://localhost:7053/api/Dishes").then(response => response.json()).then(data => {
            setDishes(prev => {
                const currDishes = [];
                data.forEach(dish=> {
                    const currDish = {};
                    currDish.dishId = dish.dishId;
                    currDish.dishPrice = dish.dishPrice;
                    currDish.dishName = dish.dishName;
                    currDish.dishDescription = dish.dishDescription;
                    currDish.dishNature = dish.dishNature;
                    currDish.dishImage = dish.dishImage;
                    currDishes.push(currDish);
                });
                return currDishes;
            })
        },)
    },[])
    return dishes;
}
  const dishes = useFetchAllDishes();

  function onClickHandeler() {
      if (selectedDishId === null) {
          alert("Please! Select a dish");
          return;
      }
      if (dishName === "" || dishImage === "" || dishPrice == 0 || dishName === "" || dishNature === null) {
          alert("Please fill all the fields!!");
          return;
      }
      
      const consent = window.confirm("Are you sure? \n" + dishName + " will be Updated!");

      if (consent == false)
          return;

      const data = {
          dishId: selectedDishId,
          dishName: dishName,
          dishPrice: dishPrice,
          dishDescription: dishDescription,
          dishNature: dishNature,
          dishImage: dishImage,
          isDeleted: false,
          categoryDishes: []
      }
      fetch("https://localhost:7053/api/Dishes/" + selectedDishId, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          mode: 'cors',
          method: 'PUT',
          body: JSON.stringify(data)
      })
  }

  return <div>
      <form>
          <fieldset>
              <legend className='MenuDetails-Heading'>
                  Update Dish
              </legend>
              <select className= 'DropDown' onChange={(event) => {
                  setSelectedDishId(event.target.value);
                  const dish = dishes.find(dish => dish.dishId == event.target.value);
                  setDishDescription(dish.dishDescription);
                  setDishName(dish.dishName);
                  setDishPrice(dish.dishPrice);
                  setDishImage(dish.dishImage);
                  setDishNature(dish.dishNature)
              }}>
                  <option hidden>Select a dish</option>
                  {
                      dishes.map(dish => <option value={dish.dishId} key={dish.dishId}>{dish.dishName}</option>)
                  }
              </select>
              <br />
              {
                  selectedDishId !== null ?
              <div>
              <input className='inputMenu'
                  placeholder="Enter Dish Name"
                  value={dishName}
                  onChange={(event) => setDishName(event.target.value)}
              />
              <br />
              <input className='inputMenu'
                  placeholder="Enter Dish Price"
                  value={dishPrice}
                  onChange={(event) => setDishPrice(event.target.value)}
                  type="number"
                  min={0}
              />
              <br />
              {
                  dishNature === "veg" ?
                      <select className= 'DropDown' onChange={(e) => setDishNature(e.target.value)}>
                          <option value="veg">Veg</option>
                          <option value="non-veg">Non-veg</option>
                      </select> :
                      <select className= 'DropDown' onChange={(e) => setDishNature(e.target.value)}>
                          <option value="non-veg">Non-veg</option>
                          <option value="veg">Veg</option>
                      </select>
              }
              <br />
              <input className='inputMenu'
                  placeholder="Enter dish image"
                  value={dishImage}
                  onChange={(event) => setDishImage(event.target.value)}
              />
              <br />
              <textarea className='inputMenu'
                  placeholder="Enter description of dish"
                  value={dishDescription}
                  onChange={(e) => setDishDescription(e.target.value)}
              />
              <br />
              <button className='Submit-button' type="button"
                  onClick={onClickHandeler}
              >Update</button>
              </div> : null
              }
          </fieldset>
      </form>
  </div>
};

export const DeleteDish = () => {
  const [selectedDishId, setSelectedDishId] = useState(null);
  function useFetchAllDishes()
{
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        console.log("hey");
        fetch("https://localhost:7053/api/Dishes").then(response => response.json()).then(data => {
            setDishes(prev => {
                const currDishes = [];
                data.forEach(dish=> {
                    const currDish = {};
                    currDish.dishId = dish.dishId;
                    currDish.dishPrice = dish.dishPrice;
                    currDish.dishName = dish.dishName;
                    currDish.dishDescription = dish.dishDescription;
                    currDish.dishNature = dish.dishNature;
                    currDish.dishImage = dish.dishImage;
                    currDishes.push(currDish);
                });
                return currDishes;
            })
        },)
    },[])
    return dishes;
}
    const dishes = useFetchAllDishes();

    function onClickHandeler()
    {
        if(selectedDishId === null)
        {
            alert("Please! Select a dish");
            return;
        }
        const dishName = dishes.find(dish => dish.dishId == selectedDishId).dishName;
        const consent = window.confirm("Are you sure? \n" + dishName + " will be deleted!");

        if(consent == false)
        return;

        fetch("https://localhost:7053/api/Dishes/" + selectedDishId, {
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            mode : 'cors',
            method : 'DELETE'
        })
    }

    return <div>
        <form>
            <fieldset>
                <legend className='MenuDetails-Heading'>
                    Delete Dish
                </legend>
                <select className= 'DropDown' onChange = {(event) => setSelectedDishId(event.target.value)}>
                    <option hidden>Select a dish</option>
                    {
                        dishes.map(dish => <option value = {dish.dishId} key = {dish.dishId}>{dish.dishName}</option>)
                    }
                </select>
                <br/>
                <button className='Submit-button' type = "button"
                onClick = {onClickHandeler}
                >Delete</button>
            </fieldset>
        </form>
    </div>
};
