import React from "react";


function CategoryCard(props)
{
    return <div className = "category-card">
        <img className = "category-card-img" src = {props.catImage} alt = {props.catName}/>
        <h2 className = "category-card-heading">{props.catName}</h2>
        <button className = "category-card-dish-btn" 
            onClick = {() => props.onClickBtn(props.catId)}
        >Get Dishes</button>
    </div>
}

export default CategoryCard;