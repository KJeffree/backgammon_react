import React from 'react'
import Point from './Point'

const GameGrid = (props) => {

    const pointNodes = props.points.map((point, index) => {
        let name = null
        if (index <= 11 && index % 2 == 0)
        {
            name = "triangle1"
        } else if (index <= 11 && index % 2 != 0) {
            name = "triangle2"
        } else if (index > 11 && index %2 == 0) {
            name = "triangle3"
        } else {
            name = "triangle4"
        }
        return <Point key={index} className={`item${index} ${name}`} position={index} />
    })
    return (
        <div>
            {pointNodes}
        </div>
    )
}

export default GameGrid;