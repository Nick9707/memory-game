import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import catstello from './images/catstello.png'
import filmtocat from './images/filmtocat.png'
import inflatocat from './images/inflatocat.png'
import justicetocat from './images/justicetocat.jpg'
import mcefeeline from './images/mcefeeline.jpg'
import mountitetocat from './images/mountietocat.png'
import scubatovat from './images/scubatocat.png'
import vinyltocat from './images/vinyltocat.png'
import black from './images/black.jpeg'

function OctoCard(props) {
    return (
            <img className={props.isTurned ? "octocard open show disabled" : "octocard"}
                 onClick={props.onClick}
                 src={props.isTurned ? props.src : black}
                 alt="octocat"
            >
            </img>
    )
}

class Board extends React.Component {
    renderCard(i) {
        return (
            <OctoCard
                src={this.props.cards[i].src}
                value={this.props.cards[i].id}
                isTurned={this.props.cards[i].isTurned}
                onClick={() => this.props.onClick({position: i, id: this.props.cards[i].id})}
            />
        )
    }

    render() {
        return (
            <div className="deck">
                <div className="board-row">
                    {this.renderCard(0)}
                    {this.renderCard(1)}
                    {this.renderCard(2)}
                    {this.renderCard(3)}
                </div>
                <div className="board-row">
                    {this.renderCard(4)}
                    {this.renderCard(5)}
                    {this.renderCard(6)}
                    {this.renderCard(7)}
                </div>
                <div className="board-row">
                    {this.renderCard(8)}
                    {this.renderCard(9)}
                    {this.renderCard(10)}
                    {this.renderCard(11)}
                </div>
                <div className="board-row">
                    {this.renderCard(12)}
                    {this.renderCard(13)}
                    {this.renderCard(14)}
                    {this.renderCard(15)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let cards = [catstello, filmtocat, inflatocat, justicetocat, mcefeeline, mountitetocat, scubatovat, vinyltocat];
        let deck = [];
        for (let i = 0; i < 16; i++) {
            deck.push({
                id: i % 8,
                src: cards[i % 8],
                isTurned: false
            });
        }
        this.state = {
            cards: deck.sort(() => Math.random() - 0.5),
            lastClick: [],
        }
    }

    iswin(){
        return (this.state.cards.filter((x) => x.isTurned === false).length === 0) ? true : false;
    }
    handleClick(i) {
        if (this.state.lastClick.length === 1){
            if (i.id === this.state.lastClick[0].id) {
                let newCards = this.state.cards.slice();
                newCards[i.position].isTurned = true;
                this.setState({
                    cards: newCards,
                    lastClick: []
                })
            } else {
                let newCards = this.state.cards.slice();
                newCards[i.position].isTurned = true;
                let newLastClick = this.state.lastClick.slice();
                newLastClick.push(i);
                this.setState({
                    cards: newCards,
                    lastClick: newLastClick,
                })
            }
        } else if (this.state.lastClick.length === 2) {
            let newCards = this.state.cards.slice();
            newCards[this.state.lastClick[0].position].isTurned = false;
            newCards[this.state.lastClick[1].position].isTurned = false;
            newCards[i.position].isTurned = true;
            let newLastClick = [i];
            this.setState({
                lastClick: newLastClick,
                cards: newCards,
            })
        } else {
            let newCards = this.state.cards.slice();
            newCards[i.position].isTurned = true;
            this.setState({
                lastClick: [i],
                cards: newCards,
            })
        }
        if(this.iswin()){
            alert('You win');
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        cards={this.state.cards}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);