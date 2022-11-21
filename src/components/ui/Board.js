import { React } from "react";
import { css } from '@emotion/css'
import { MoreHorizontal } from 'react-feather'
import Card from './Card'
import Editable from "./Editable";

function Board(props) {
    return (
        //board
        <div className={css`min-width: 290px; max-height: 100%; display:flex; flex-direction:column; gap:20px`}>
            <div className={css`display: flex; justify-content: space-between; align-items: center;`}>
                <p className={css`font-weight: bold; font-size: 1rem; display: flex; gap: 5px; align-items: center;`}> {props.board.key} <span className={css`color: rgb(145, 145, 145);`}>{props.board.cards?.length}</span>
                </p>
            </div>
            <div className={css`background-color: #f8f8f8; min-height:200px;  padding: 10px;  border-radius: 5px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto;`}>
                {
                    props.board.cards?.map(card =>
                        <Card key={card.id}
                            card={card}
                            boardId={props.board.id}
                            removeCard={props.removeCard}
                            dragEntered={props.dragEntered}
                            dragEnded={props.dragEnded}
                            updateCard={props.updateCard} />
                    )
                }
            </div>
        </div>
    )
}

export default Board;