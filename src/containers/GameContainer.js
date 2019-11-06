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
            player: {number: 1, diceRolled: false},
            dice: [{number: 1, used: true, double: false}, {number: 1, used: true, double:false}],
            selectedCounterIndex: null
        }
        this.handleDieClick = this.handleDieClick.bind(this)
        this.hilightPoints = this.hilightPoints.bind(this)
        this.onPointClick = this.onPointClick.bind(this)
        this.handlePlayerChange = this.handlePlayerChange.bind(this)
    }

    handlePlayerChange() {
        if (this.state.player.number == 1){
            this.setState({player: {number: 2, diceRolled: false}})
        } else {
            this.setState({player: {number: 1, diceRolled: false}})
        }
    }

    handleDieClick(number1, number2) {
        if (this.state.player.diceRolled == false){
            if (number1 == number2){
                this.setState({dice: [{number: number1, used: false, double: true}, {number: number2, used: false, double: true}], player: {number: this.state.player.number, diceRolled: true}})
            } else {
                this.setState({dice: [{number: number1, used: false, double: false}, {number: number2, used: false, double: false}], player: {number: this.state.player.number, diceRolled: true}})
            }
            
        }
    }

    onPointClick(pointIndex) {
        if (this.state.points[pointIndex].hilight == true){
            let distanceMoved = pointIndex - this.state.selectedCounterIndex
            distanceMoved = distanceMoved < 0 ? -distanceMoved : distanceMoved
            for(let die of this.state.dice){
                if (die.number == distanceMoved && die.used == false && die.double == true){
                    die.double = false
                    break
                } else if (die.number == distanceMoved && die.used == false){
                    die.used = true
                    break
                }
            }
            let newPoints = this.state.points
            newPoints[this.state.selectedCounterIndex].number -= 1
            newPoints[this.state.selectedCounterIndex].color = newPoints[this.state.selectedCounterIndex].number == 0 ? 0 : this.state.player.number
            if (newPoints[pointIndex].number == 1 && newPoints[pointIndex].color != this.state.player.number){
                newPoints[pointIndex].number -= 1
                let newBar = this.state.bar
                if (newPoints[pointIndex].color == 1){
                    newBar[0] += 1
                } else {
                    newBar[1] += 1
                }
                this.setState({bar: newBar})
            }
            newPoints[pointIndex].number += 1
            newPoints[pointIndex].color = this.state.player.number
            for(let point of newPoints){
                point.hilight = false
            }
            this.setState({points: newPoints})
        }
        
    }

    hilightPoints(pointIndex){
        this.setState({selectedCounterIndex: pointIndex})
        let newPoints = this.state.points
        for (let point of newPoints){
            point.hilight = false
        }
        let targetPoint1 = this.state.player.number == 1 ? newPoints[pointIndex + this.state.dice[0].number] : newPoints[pointIndex - this.state.dice[0].number]
        let targetPoint2 = this.state.player.number == 1 ? newPoints[pointIndex + this.state.dice[1].number] : newPoints[pointIndex - this.state.dice[1].number]

        targetPoint1.hilight = (targetPoint1.color == this.state.player.number || (targetPoint1.color != this.state.player.number && targetPoint1.number == 1) || targetPoint1.color == 0) && targetPoint1.number < 5 && this.state.dice[0].used == false ? true : false
        targetPoint2.hilight = (targetPoint2.color == this.state.player.number || (targetPoint2.color != this.state.player.number && targetPoint2.number == 1) || targetPoint2.color == 0) && targetPoint2.number < 5 && this.state.dice[1].used == false ? true : false
        this.setState({points: newPoints})
    }

    render() {
        return (
            <div>
                <GameGrid player={this.state.player.number} onPointClick={this.onPointClick} onCounterClick={this.hilightPoints} bar={this.state.bar} dice={this.state.dice} points={this.state.points}/>
                <div className="bottom-bar">
                    <DieContainer dice={this.state.dice} handleDieRoll={this.handleDieClick} changePlayer={this.handlePlayerChange}></DieContainer>
                    <button onClick={this.handlePlayerChange}>Next Player</button>
                </div>
            </div>
            
        )
    }


}

export default GameContainer