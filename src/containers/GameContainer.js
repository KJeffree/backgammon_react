import React from 'react'
import GameGrid from '../components/GameGrid'

class GameContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            points: [
                {color: 1, number: 2},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 2, number: 5},
                {color: 0, number: 0},
                {color: 2, number: 3},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 1, number: 5},
                {color: 2, number: 5},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 1, number: 3},
                {color: 0, number: 0},
                {color: 1, number: 5},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 0, number: 0},
                {color: 2, number: 2}
            ],
            bar: [0, 0],
            player: 1,
            dice: {1: 0, 2: 0}
        }
    }

    render() {
        return (
            <GameGrid points={this.state.points}/>
        )
    }


}

export default GameContainer