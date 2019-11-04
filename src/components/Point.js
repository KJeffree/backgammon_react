import React from 'react'

const Point = (props) => {
    return (
        <img className={`${props.name} point`} src={`${props.triangle}.png`} alt="point" />
    )
}

export default Point