import React from 'react'

const Die = (props) => {
    let dieStatus = props.used ? "tick.png" : "EmptyCircle.png"
    dieStatus = props.double ? "times_two.jpg" : dieStatus
    console.log(props.used)
    const image = <img width={50} src={dieStatus} alt={dieStatus}></img>
    return (
        <div>
        <img src={`${props.dice}.png`} height="150" alt={`die ${props.dice}`}></img>
        {dieStatus != null? image : null}
        </div>
    )
}

export default Die