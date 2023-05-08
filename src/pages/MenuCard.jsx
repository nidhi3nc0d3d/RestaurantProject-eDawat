import React from "react";


function MenuCard(props) {
    return (
        <div className="menu-card">
            <img src={props.menuImage} alt={props.menuName} className="menu-card-img" />
            <h2 className="menu-card-heading">{props.menuName}</h2>
            <button className="menu-card-btn" onClick={() => props.onClickHandeler(props.menuId)} >Get Categories</button>
        </div>
    );
}

export default MenuCard;