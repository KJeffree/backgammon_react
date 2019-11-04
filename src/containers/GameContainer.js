import React from 'react'
import GameGrid from '../components/GameGrid'
import DieContainer from './DieContainer'

class GameContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            points: [
                {color: 1, number: 2, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 2, number: 5, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 2, number: 3, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 1, number: 5, hilight: false},
                {color: 2, number: 5, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 1, number: 3, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 1, number: 5, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 0, number: 0, hilight: false},
                {color: 2, number: 2, hilight: false}
            ],
            bar: [0, 0],
            player: 1,
            dice: {1: 1, 2: 1}
        }
        this.handleDieClick = this.handleDieClick.bind(this)
        this.hilightPoints = this.hilightPoints.bind(this)
    }

    handleDieClick(number1, number2) {
        this.setState({dice: {1: number1, 2: number2}})
    }

    hilightPoints(pointIndex){
        console.log("HilightedPoints called")
        let newPoints = this.state.points
        let targetPoint1 = newPoints[pointIndex + this.state.dice[1]]
        let targetPoint2 = newPoints[pointIndex + this.state.dice[2]]

        targetPoint1.hilight = (targetPoint1.color == this.state.player || targetPoint1.color == 0) && targetPoint1.number < 5 ? true : false
        targetPoint2.hilight = (targetPoint2.color == this.state.player || targetPoint2.color == 0) && targetPoint2.number < 5 ? true : false
        this.setState({points: newPoints})
    }

    render() {
        return (
            <div>
            <GameGrid player={this.state.player} onCounterClick={this.hilightPoints} bar={this.state.bar} dice={this.state.dice} points={this.state.points}/>
            <DieContainer dice={this.state.dice} handleDieRoll={this.handleDieClick}></DieContainer>
            </div>
        )
    }


}

export default GameContainer