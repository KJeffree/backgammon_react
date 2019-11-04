import React from 'react'

const Checker = (props) => {
    let image = null;
    if (props.color == 1)
    {
        image = <img className="checker" src={`black.png`} alt="checker"></img>
    } else {
        image = <img className="checker" src={`white.png`} alt="checker"></img>
    }
    return (
        <div className={`${props.name}`}>
            {image}
        </div>
    )
    
}

export default Checker;