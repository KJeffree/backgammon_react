import React from 'react'
import Checker from './Checker'

const Point = (props) => {
    let checkerNodes = [];
    for(let i = 0; i < props.counterNumber; i++) {
        if (props.triangle === "triangle1" || props.triangle === "triangle2") {
            checkerNodes.push(<Checker player={props.player} pointNumber={props.pointNumber} key={i} name={`checker${5 - 1 - i}`} color={props.color}></Checker>)
        } else {
            checkerNodes.push(<Checker pointNumber={props.pointNumber} key={i} name={`checker${i}`} color={props.color}></Checker>)
        }
        
    }
    return (
        <div className={`${props.name} point`}>
            <img className={`point`} src={`${props.triangle}.png`} alt="point" />
            {checkerNodes}
        </div>
    )
}

export default Point