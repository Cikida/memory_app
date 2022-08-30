import React from 'react';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Card from './Card'// We import the card component


function Cards(){

//STATES AND INITIALIZATION:

//We create the items const and initialize it with an array which states the id, image and state for each card

    const [items, setItems] = useState([
        { id: 1, img: 'https://bit.ly/3As6n6m', stat: "" },
        { id: 1, img: 'https://bit.ly/3As6n6m', stat: "" },
        { id: 2, img: 'https://bit.ly/3AtxjCO', stat: "" },
        { id: 2, img: 'https://bit.ly/3AtxjCO', stat: "" },
        { id: 3, img: 'https://bit.ly/3dWDRlR', stat: "" },
        { id: 3, img: 'https://bit.ly/3dWDRlR', stat: "" },
        { id: 4, img: 'https://bit.ly/3wtB9e7', stat: "" },
        { id: 4, img: 'https://bit.ly/3wtB9e7', stat: "" },
        { id: 5, img: 'https://bit.ly/3CxclWr', stat: "" },
        { id: 5, img: 'https://bit.ly/3CxclWr', stat: "" },
        { id: 6, img: 'https://bit.ly/3co6xUp', stat: "" },
        { id: 6, img: 'https://bit.ly/3co6xUp', stat: "" },
        { id: 7, img: 'https://bit.ly/3criUz5', stat: "" },
        { id: 7, img: 'https://bit.ly/3criUz5', stat: "" },
        { id: 8, img: 'https://bit.ly/3AQ2Hgn', stat: "" },
        { id: 8, img: 'https://bit.ly/3AQ2Hgn', stat: "" }
    ].sort(() => Math.random() - 0.5))

//We create a const that will allow us to check whether the id of the element we clicked is the same as the previous item that we clicked.
//The prev will store the id of the previously clicked card. So we initalize it to -1.
    const [prev, setPrev] = useState(-1)

//We create a const to show and hide the Modal and Alert components based on clicking the "End Game" and "Did I win or lose" buttons respectively

    const [show, setShow] = useState(false);
    
    const [show1, setShow1] = useState(false);

//We create a counter const for the timer and initialize it to 120 seconds.
    
    const [counter, setCounter] = useState(120);

//We create a status const that will indicate whether a play won or lost the game when they click it. We initialise it to the player losing.
    
    const [status,setStatus]=useState({heading:"SORRY, YOU LOSE!",body:"You lose the memory game", next:"Press restart to play again"})

//We create a popover const so we can create a popover compoment that show the player the rules of the game

    const popover = (
        <Popover id="popover-basic" className='popover'>
          <Popover.Header as="h3" className='headerpop'>How to play the memory game</Popover.Header>
          <Popover.Body className='bodypop'>
            <ol>
                <li> When the game starts try to memorize the <strong>matching cards</strong> as much as possible.</li> 
                <li> Then flip the cards that you think will be a match. If you get it right the cards will remain flipped and turn green</li> 
                <li> If you don't get it right within 120 seconds you lose the game. </li>
                <li> To find out of you wom or lost presss the "Did I Win or Lose" button</li>
                <li> If you lose the game you can start again by pressing the restart button</li>
            </ol>
          </Popover.Body>
        </Popover>
      );
      


//FUNCTIONS CONTROLLING STATES:

//The check function checks if the current cards id matches the previous card's id. If yes both cards have the state= "Correct" if not both cards have the state "wrong"
    function check(current){
        if(items[current].id === items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 1000)
        }}

// The function below is for the close button within the Modal component
const handleClose = () => setShow(false);

//The function below is for running the timer that we had initialised within the counter const

React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

//In order to determine if the player has won or lost we will use the stat element in the items array. If all stat items = correct then the player has won.
//To test this we create a const called Method which is an array of the item stats.
  const Method = items.map(item => {
    const container = item.stat;
    return container;
})

//Then we create the function below which will test if each element in the array Method is equal to "correct" If all elememts are correct then the user has won.
//The alert changes as such to display that the user has won when they press the "Did I win or lose" button
function gameOver(){
    setShow1(true)
Method.map((element) => {
    if (element === "correct") {
  
  setStatus({heading:"CONGRATULATIONS",body:"You won the memory game", next:"Press restart to play again"})
}else{
    setStatus({heading:"SORRY,YOU LOSE",body:"You lost the memory game", next:"Press restart to play again"})
}
})}

//The function below ends the game by ending the timer and showing the Modal component
function endGame () {
    setCounter(0)
    setShow(true)
  }

//The user should be able to restart the game. The function below achieves this
function reStart(){
    window.location.reload(false)
    setCounter(120)
}


//On clicking we create a condition that if prev's id= -1 that means no card has been clicked before so we set the 
// id of prev to the id of the card we clicked. If this is not true then we run the function "check"
function handleClick(id){
        if(prev === -1){
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }}

//The user should easily be able to request help(that will inform them about the rules of the game) from UI.//
//The function below achieves this//
const Help = () => (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="success">How to play</Button>
        </OverlayTrigger>
      );


//The CARD component is rendered using the array.Map()method below with keys for the props passed to that component//
    return (
<div>
    <Alert show={show1} variant="success"status={status}>
      <Alert.Heading>{status.heading}</Alert.Heading>
         <p>{status.body}</p>
            <hr />
         <p>{status.next}</p>
            <hr />
      <div className="d-flex justify-content-end">
         <Button onClick={() => setShow1(false)} variant="outline-success">
            Close
         </Button>
      </div>
    </Alert>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>The Timer has been reset. Press restart to start again</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    <div className="container" >
           
        {items.map((item, index) => (
        <Card key={index} item={item} id={index} handleClick={handleClick} />
        )) }
            
    </div>

    <table>
        <tr>
            <td>
                <Button variant="outline-dark" onClick={reStart}>Restart</Button>
            </td>
            <td>
                <Button variant="outline-dark" onClick={endGame}>End Game</Button>
            </td>

            <td>
                <Help />
            </td>

            <td>
                <Button className="status"onClick= {gameOver}>Did I Win or Lose?</Button>
            </td>

            <td>
                <Toast>
                    <Toast.Header>
                    <strong className="me-auto">Countdown: {counter}</strong>
                    </Toast.Header>
                </Toast>
            </td>

        </tr>

    </table>        

</div>
    )
}

export default Cards