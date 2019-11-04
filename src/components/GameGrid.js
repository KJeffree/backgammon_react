import React from 'react'
import Point from './Point'
import Bar from './Bar'

const GameGrid = (props) => {

    const pointNodes = props.points.map((point, index) => {
        let name = null
        if (index <= 11 && index % 2 === 0)
        {
            name = "triangle1"
        } else if (index <= 11 && index % 2 !== 0) {
            name = "triangle2"
        } else if (index > 11 && index %2 === 0) {
            name = "triangle3"
        } else {
            name = "triangle4"
        }
        return <Point player={props.player} key={index} color={point.color} counterNumber={point.number} pointNumber={index} name={`item${index}`} triangle={name} position={index} />
    })
    return (
        <div className="gameGrid">
            {pointNodes}
            <Bar name="bar1"></Bar>
            <Bar name="bar2"></Bar>
        </div>
    )
}

export default GameGrid;