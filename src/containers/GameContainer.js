import React from 'react'
import GameGrid from '../components/GameGrid'
import DieContainer from './DieContainer'
import PlayerIndicatorContainer from '../components/PlayerIndicator'

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
            selectedCounterIndex: null,
            countersRemoved: [0, 0]
        }
        this.handleDieClick = this.handleDieClick.bind(this)
        this.hilightPoints = this.hilightPoints.bind(this)
        this.onPointClick = this.onPointClick.bind(this)
        this.handlePlayerChange = this.handlePlayerChange.bind(this)
        this.checkAllCountersInHomeOrRemoved = this.checkAllCountersInHomeOrRemoved.bind(this)
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
        if (this.state.bar[this.state.player.number - 1] > 0){
            if (this.state.player.number == 1){
                this.setState({selectedCounterIndex: -1})
            } else {
                this.setState({selectedCounterIndex: 24})
            }
            let newPoints = this.state.points
            for (let point of newPoints){
            point.hilight = false
            }
            let targetPoint1 = this.state.player.number == 1 ? newPoints[-1 + number1] : newPoints[24 - number1]
            let targetPoint2 = this.state.player.number == 1 ? newPoints[-1 + number2] : newPoints[24 - number2]

            targetPoint1.hilight = (targetPoint1.color == this.state.player.number || (targetPoint1.color != this.state.player.number && targetPoint1.number == 1) || targetPoint1.color == 0) && targetPoint1.number < 5 ? true : false
            targetPoint2.hilight = (targetPoint2.color == this.state.player.number || (targetPoint2.color != this.state.player.number && targetPoint2.number == 1) || targetPoint2.color == 0) && targetPoint2.number < 5 ? true : false
            this.setState({points: newPoints})
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
            if (this.state.bar[this.state.player.number - 1] > 0){
                let newBar = this.state.bar
                newBar[this.state.player.number - 1] -= 1
                this.setState({bar: newBar})
            } else {
                newPoints[this.state.selectedCounterIndex].number -= 1
                newPoints[this.state.selectedCounterIndex].color = newPoints[this.state.selectedCounterIndex].number == 0 ? 0 : this.state.player.number
            }

            if (distanceMoved == 0){
                newPoints[pointIndex].number -= 1
                newPoints[pointIndex].color = newPoints[pointIndex].number == 0 ? 0 : this.state.player.number
                let newCountersRemoved = this.state.countersRemoved
                newCountersRemoved[this.state.player.number - 1] += 1
                this.setState({countersRemoved: newCountersRemoved})

                for (let die of this.state.dice){
                    if (this.state.player.number == 1 && 24 - die.number == pointIndex && die.used == false && die.double == true){
                        die.double = false
                        break
                    } else if (this.state.player.number == 1 && 24 - die.number == pointIndex && die.used == false){
                        die.used = true
                    } else if (this.state.player.number == 2 && -1 + die.number == pointIndex && die.used == false && die.double == true){
                        die.double = false
                        break
                    } else if (this.state.player.number == 2 && -1 + die.number == pointIndex && die.used == false){
                        die.used = true
                    }
                }
                
            }
            
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
            newPoints[pointIndex].hilight = false
            if (this.state.bar[this.state.player.number - 1] == 0) {
                for(let point of newPoints){
                    point.hilight = false
                }
            }
            this.setState({points: newPoints})
        }
        
    }

    checkAllCountersInHomeOrRemoved(){
        let numberOfCounters = 0
        if (this.state.player.number == 2){
            for (let i=0; i < 6; i++){
                if (this.state.points[i].color == this.state.player.number){
                    numberOfCounters += this.state.points[i].number                    
                }
            }
            numberOfCounters += this.state.countersRemoved[1]
        } else {
            for (let i=23; i > 17; i--){
                if (this.state.points[i].color == this.state.player.number){
                    numberOfCounters += this.state.points[i].number                    
                }
            }
            numberOfCounters += this.state.countersRemoved[0]
        }
        return numberOfCounters == 15 ? true : false
    }

    hilightPoints(pointIndex){
        this.setState({selectedCounterIndex: pointIndex})
        let newPoints = this.state.points
        if (this.state.bar[this.state.player.number - 1] > 0){
            return
        }
        for (let point of newPoints){
            point.hilight = false
        }
        let targetPoint1 = this.state.player.number == 1 ? newPoints[pointIndex + this.state.dice[0].number] : newPoints[pointIndex - this.state.dice[0].number]
        let targetPoint2 = this.state.player.number == 1 ? newPoints[pointIndex + this.state.dice[1].number] : newPoints[pointIndex - this.state.dice[1].number]

        if ((pointIndex + this.state.dice[0].number) > 23 && this.state.player.number == 1){
            targetPoint1 = null;
        } else if ((pointIndex + this.state.dice[1].number) > 23 && this.state.player.number == 1){
            targetPoint2 = null;
        }

        if ((pointIndex - this.state.dice[0].number < 0) && this.state.player.number == 2){
            targetPoint1 = null;
        } else if ((pointIndex - this.state.dice[1].number) < 0 && this.state.player.number == 2){
            targetPoint2 = null
        }
        

        if (targetPoint1 != null){
            targetPoint1.hilight = (targetPoint1.color == this.state.player.number || (targetPoint1.color != this.state.player.number && targetPoint1.number == 1) || targetPoint1.color == 0) && targetPoint1.number < 5 && this.state.dice[0].used == false ? true : false
        }

        if (targetPoint2 != null){
            targetPoint2.hilight = (targetPoint2.color == this.state.player.number || (targetPoint2.color != this.state.player.number && targetPoint2.number == 1) || targetPoint2.color == 0) && targetPoint2.number < 5 && this.state.dice[1].used == false ? true : false
        }

        if (this.checkAllCountersInHomeOrRemoved()){
            let playerNumber = this.state.player.number
            let removableCounterIndexPlayer1Die1 = this.state.dice[0].used ? null : 24 - this.state.dice[0].number
            let removableCounterIndexPlayer1Die2 = this.state.dice[1].used ? null : 24 - this.state.dice[1].number
            let removableCounterIndexPlayer2Die1 = this.state.dice[0].used ? null : -1 + this.state.dice[0].number
            let removableCounterIndexPlayer2Die2 = this.state.dice[1].used ? null : -1 + this.state.dice[1].number

            console.log("1", playerNumber == 2 && removableCounterIndexPlayer2Die1 == pointIndex && newPoints[pointIndex].color == this.state.player.number)
            console.log("2", playerNumber == 2 && removableCounterIndexPlayer2Die2 == pointIndex && newPoints[pointIndex].color == this.state.player.number)
            console.log("3", playerNumber == 1 && removableCounterIndexPlayer1Die1 == pointIndex && newPoints[pointIndex].color == this.state.player.number)
            console.log("4", playerNumber == 1 && removableCounterIndexPlayer1Die2 == pointIndex && newPoints[pointIndex].color == this.state.player.number)
            if (playerNumber == 2 && removableCounterIndexPlayer2Die1 == pointIndex && newPoints[pointIndex].color == this.state.player.number){
                newPoints[pointIndex].hilight = true
            } else if (playerNumber == 2 && removableCounterIndexPlayer2Die2 == pointIndex && newPoints[pointIndex].color == this.state.player.number){
                newPoints[pointIndex].hilight = true
            } else if (playerNumber == 1 && removableCounterIndexPlayer1Die1 == pointIndex && newPoints[pointIndex].color == this.state.player.number){
                newPoints[pointIndex].hilight = true
            } else if (playerNumber == 1 && removableCounterIndexPlayer1Die2 == pointIndex && newPoints[pointIndex].color == this.state.player.number){
                newPoints[pointIndex].hilight = true
            }
        }
        this.setState({points: newPoints})
    }

    render() {
        return (
            <div>
                <div className="game-grid-container">
                <GameGrid player={this.state.player.number} onPointClick={this.onPointClick} onCounterClick={this.hilightPoints} bar={this.state.bar} dice={this.state.dice} points={this.state.points}/>
                
                <div className="bottom-bar">
                    <PlayerIndicatorContainer player={this.state.player}></PlayerIndicatorContainer>
                    <p className={this.state.player.diceRolled ? "hidden" : "shown"}>Click die to roll</p>
                    <DieContainer dice={this.state.dice} handleDieRoll={this.handleDieClick} changePlayer={this.handlePlayerChange}></DieContainer>
                    <button onClick={this.handlePlayerChange}>Next Player</button>
                </div>
                </div>
            </div>
            
        )
    }


}

export default GameContainer