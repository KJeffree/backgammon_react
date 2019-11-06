import React from 'react'
import Checker from './Checker'

const Bar = (props) => {
    
    let counterNodes = []
    for (let i = 0; i < props.counters; i++){
        counterNodes.push(<Checker color={props.color} name={`checker${5 - 1 - i}`}></Checker>)
    }
  
    return (
        <div className={`bar ${props.name}`} alt="bar"> {counterNodes} </div>
    )
}

export default Bar;