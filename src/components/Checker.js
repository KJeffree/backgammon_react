import React from 'react'

const Checker = (props) => {

    function handleClick(){
        if (props.color === props.player)
        {
            props.onCounterClick(props.pointIndex);
        }
    }

    let image = null;
    if (props.color === 1)
    {
        image = <img onClick={handleClick} className="checker" src={`black.png`} alt="checker"></img>
    } else {
        image = <img onClick={handleClick} className="checker" src={`white.png`} alt="checker"></img>
    }
    return (
        <div className={`${props.name}`}>
            {image}
        </div>
    )
    
}

export default Checker;