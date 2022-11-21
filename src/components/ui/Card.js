import { React, useState } from "react";
import { css } from '@emotion/css'
import { MoreHorizontal, Clock, User } from 'react-feather'
import Chip from './Chip'
import CardInfo from './CardInfo'
import Dropdown from './Dropdown'



function Card(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { id, title, description, tag, duedate, assignee } = props.card;
    return (
        <>
            {showModal && (
                <CardInfo
                    onClose={() => setShowModal(false)}
                    card={props.card}
                    boardId={props.boardId}
                    updateCard={props.updateCard}
                />
            )}
            <div
                draggable
                onDragEnd={() => props.dragEnded(props.boardId, id)}
                onDragEnter={() => props.dragEntered(props.boardId, id)}
                onClick={() => setShowModal(true)}
                className={css`padding: 10px; display: flex; flex-direction: column; gap: 10px; background-color: #fff; border-radius: 10px;`}>
                <div className={css`  display: flex; align-items: flex-start;`}>
                    <div className={css` flex: 3; display: flex; flex-wrap: wrap; gap: 5px; font-size: 14px; line-height: 21px;`}>
                        <Chip text={tag} color="red" />
                    </div>
                    <div
                        className={css`width: 30px; height: 20px; transform: translateX(15px);  flex: 1; cursor: pointer; transition: 200ms;`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowDropdown(true);
                        }}
                    >
                        <MoreHorizontal />
                        {showDropdown && (
                            <Dropdown
                                className={css`box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.12); padding: 20px; width: 150px !important; cursor: default;`}
                                onClose={() => setShowDropdown(false)}
                            >
                                <p className={css`border-bottom: 1px solid #f8f8f8; cursor: pointer;`}

                                    onClick={() => props.removeCard(props.boardId, id)}>
                                    Delete Card
                                </p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className={css`flex: 1;font-weight: bold; font-size: 1rem; line-height: 1.875rem;`}>{title}</div>
                <div className={css`flex: 1;font-weight: 100; font-size: 0.90rem; line-height: 1.875rem; padding:10px max-width:50%;`}>{description}</div>

                <div className={css`display: flex; justify-content: space-between; align-items: center;`}>
                    <p className={css` border-radius: 40px; padding: 4px 12px; background-color: #f8f8f8; color: #000; width: fit-content; font-size: 14px; line-height: 21px;  display: flex; gap: 5px; align-items: center;`}>
                        <Clock className={css`height: 13px; width: 13px;`} />
                        {duedate}
                    </p>
                    <p className={css` border-radius: 40px; padding: 4px 12px; background-color: #f8f8f8; color: #000; width: fit-content; font-size: 14px; line-height: 21px;  display: flex; gap: 5px; align-items: center;`}>
                        <User className={css`height: 13px; width: 13px;`} />
                        {assignee}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Card;