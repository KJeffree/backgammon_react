import React from 'react'

const Die = (props) => {
    return (
        <img src={`${props.dice}.png`} height="150" alt={`die ${props.dice}`}></img>
    )
}

export default Die