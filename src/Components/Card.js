import React from 'react';


function Card({item, id, handleClick}){
//We create a dynamic class that will allow us to format the css based on whether the card is active or not.
//The function below says if the state is not empty it will be active and equal to the item stat determined by the function (i.e. either "correct" or "wrong")
    const itemClass = item.stat ? " active " + item.stat : ""
    
//The return function includes the dynamic class and the on click function which will both activate once the card is clicked
    return (
        <div className={"card" + itemClass} onClick={() => handleClick(id)}>
            <img src={item.img} alt="no" />
        </div>
    )
}

export default Card