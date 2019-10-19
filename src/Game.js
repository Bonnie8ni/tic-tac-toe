import React, { Component } from 'react';
import styles from './Game.module.scss';

const toSymbol = (n) => {
    switch (n) {
        case 0:
            return '';
        case 1:
            return 'O';
        case -1:
        default:
            return 'X';
    }
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

class Game extends Component {
    state = {
        grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        player: 1,
        winner: 0,
    }

    componentDidUpdate(prevProps, PrevState) {
        if (PrevState.grids !== this.state.grids) {
            this.setState({
                winner: this.getWinner(),
            })
        }
    }

    getWinner = () => {
        const { grids } = this.state;
        for (const line of lines) {
            const [i, j, k] = line;
            if (grids[i] === grids[j] && grids[j] === grids[k] && grids[i] !== 0) {
                return grids[i];
            }
        }
        return 0;
    }

    handleClick = (idx) => () => {
        if (this.state.winner !== 0) return;
        const grids = [...this.state.grids];
        if (grids[idx] !== 0) return;

        grids[idx] = this.state.player;
        this.setState({
            grids,
            player: -this.state.player,
        })
    }

    reset = () => {
        this.setState({
            grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            player: 1,
        })
    };

    render() {
        const { grids, player, winner } = this.state;
        return (
            <div className={styles.game}>
                <div className={styles.board}>
                    {
                        grids.map((n, idx) => (
                            <div
                                key={`grid-${idx}`}
                                className={styles.grid}
                                onClick={this.handleClick(idx)}
                            >
                                <span>{toSymbol(n)}</span>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.title}><u>TIC TAC TOE</u></div>
                    PLAYER：{toSymbol(player)}<br />
                    WINNER：{toSymbol(winner)}<br />
                    <button
                        className={styles.btn}
                        onClick={this.reset}
                    >
                        RESET                                                              
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;