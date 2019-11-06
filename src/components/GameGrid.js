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
        return <Point onCounterClick={props.onCounterClick} onPointClick={props.onPointClick} player={props.player} key={index} hilighted={point.hilight} color={point.color} counterNumber={point.number} pointNumber={index} name={`item${index} ${point.hilight ? "hilighted" : null}`} triangle={name} />
    })
    return (
        <div className="gameGrid">
            {pointNodes}
            <Bar counters={props.bar[0]} color={1} name="bar1"></Bar>
            <Bar counters={props.bar[1]} color={2} name="bar2"></Bar>
        </div>
    )
}

export default GameGrid;