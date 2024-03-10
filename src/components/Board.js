import React from 'react'
import { useState } from 'react'
import { boardDefault } from './Words';
import Letter from './Letter';
import EmptyLetter from './EmptyLetter';

function Board({mainPlayer, playerName}) {
    if (mainPlayer) {
        return (
            <div className='board'>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={0} />
                    <Letter letterPos={1} attemptVal={0} />
                    <Letter letterPos={2} attemptVal={0} />
                    <Letter letterPos={3} attemptVal={0} />
                    <Letter letterPos={4} attemptVal={0} />
                </div>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={1} />
                    <Letter letterPos={1} attemptVal={1} />
                    <Letter letterPos={2} attemptVal={1} />
                    <Letter letterPos={3} attemptVal={1} />
                    <Letter letterPos={4} attemptVal={1} />
                </div>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={2} />
                    <Letter letterPos={1} attemptVal={2} />
                    <Letter letterPos={2} attemptVal={2} />
                    <Letter letterPos={3} attemptVal={2} />
                    <Letter letterPos={4} attemptVal={2} />
                </div>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={3} />
                    <Letter letterPos={1} attemptVal={3} />
                    <Letter letterPos={2} attemptVal={3} />
                    <Letter letterPos={3} attemptVal={3} />
                    <Letter letterPos={4} attemptVal={3} />
                </div>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={4} />
                    <Letter letterPos={1} attemptVal={4} />
                    <Letter letterPos={2} attemptVal={4} />
                    <Letter letterPos={3} attemptVal={4} />
                    <Letter letterPos={4} attemptVal={4} />
                </div>
                <div className="row2">
                    <Letter letterPos={0} attemptVal={5} />
                    <Letter letterPos={1} attemptVal={5} />
                    <Letter letterPos={2} attemptVal={5} />
                    <Letter letterPos={3} attemptVal={5} />
                    <Letter letterPos={4} attemptVal={5} />
                </div>
                {playerName ? <h1 className='m-2'>{playerName}</h1> : ""}
            </div>
        )
    }
    else {
        return (
            <div className='board'>
                <div className="row2">
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                <div className="row2">
                <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                <div className="row2">
                <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                <div className="row2">
                <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                <div className="row2">
                <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                <div className="row2">
                <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                    <EmptyLetter/>
                </div>
                {playerName ? <h1 className='m-2'>{playerName}</h1> : ""}
            </div>
        )
    }
    
}

export default Board