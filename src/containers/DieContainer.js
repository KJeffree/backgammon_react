import React from 'react'
import Die from '../components/Die'

const DieContainer = (props) => {

    function handleDieClick(event) {
        let number1 = Math.ceil(0 + Math.random() * (7 - 1))
        let number2 = Math.ceil(0 + Math.random() * (7 - 1))
        props.handleDieRoll(number1, number2)
    }

    return (
        <div className="dieContainer" onClick={handleDieClick}>
            <Die dice={props.dice[0].number}/>
            <Die dice={props.dice[1].number}/>
        </div>
    )
}

export default DieContainer;