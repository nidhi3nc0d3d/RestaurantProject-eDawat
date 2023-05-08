import React, { useState, useEffect } from "react";
import DishCard from "./DishCard";
import CategoriesByMenuId from "./CategoriesByMenuId";

function DishesByCatId(props) {
    function useFetchAllDishes() {
        const [dishes, setDishes] = useState([]);
        useEffect(() => {
            console.log("hey");
            fetch("https://localhost:7053/api/Dishes").then(response => response.json()).then(data => {
                setDishes(prev => {
                    const currDishes = [];
                    data.forEach(dish => {
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
        }, [])
        return dishes;
    }

    function useFetchAllDishesByCatId(id) {
        const [dishes, setDishes] = useState([]);
        useEffect(() => {
            console.log("hello");
            fetch("https://localhost:7053/api/Dishes/catId=" + id).then(response => response.json()).then(data => {
                setDishes(prev => {
                    const currDishes = [];
                    data.forEach(dish => {
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
            })
        }, [])
        return dishes;
    }
    const dishes = useFetchAllDishesByCatId(props.catId);

    const [goToCat, setGoToCat] = useState(false);

    return goToCat === false ?
        <div className="dishes-cat">
            <button className="go-to-cat-btn" onClick={() => setGoToCat(true)}>Go to categories</button>
            {
                dishes.length === 0 ? <h2 className="dish-no-cat" style={{ color: "Red" }}>No Dishes found</h2> :
                    dishes.map(dish => <DishCard
                        dishName={dish.dishName}
                        dishImage={dish.dishImage}
                        dishDescription={dish.dishDescription}
                        dishNature={dish.dishNature}
                        dishPrice={dish.dishPrice}
                        key={dish.dishId}
                    />)
            }
        </div> : <CategoriesByMenuId menuId={props.menuId} />
}

export default DishesByCatId;

