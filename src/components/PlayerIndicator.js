import React from 'react'

const PlayerIndicatorContainer = (props) => {

    // const playerNodes = [<h2>Player 1</h2>, <h2>Player 2</h2>]
    // if (props.player.number == 1){
    //     playerNodes[0] = <h2 className="active">Player 1</h2>
    // } else {
    //     playerNodes[1] = <h2 className="active">Player 2</h2>
    // }
    const image = props.player.number == 1 ? "black.png" : "white.png"
    return (
        <div className="player-indicator">
            <h1>Current Player:</h1> 
            <img className="player-indicator" src={image} alt="player counter colour"></img>
        </div>
    )
}

export default PlayerIndicatorContainer;