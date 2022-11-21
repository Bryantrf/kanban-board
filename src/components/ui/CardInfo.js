import React, { useEffect, useState } from "react";
import { css } from '@emotion/css'

import {
    Calendar,
    List,
    Type,
} from "react-feather";

import Modal from "../Modal/Modal";


function CardInfo(props) {
    const [values, setValues] = useState({
        ...props.card,
    });

    const updateDate = (date) => {
        if (!date) return;

        setValues({
            ...values,
            date,
        });
    };


    const { id, title, description, tag, duedate, assignee } = props.card;

    useEffect(() => {
        if (props.updateCard) props.updateCard(props.boardId, values.id, values);
    }, [values]);

    return (
        <Modal onClose={props.onClose}>
            <div className={css` padding: 30px; display: flex; flex-direction: column; gap: 30px; min-width: 550px; width: fit-content;  max-width: 650px; height: fit-content;`}>
                <div className={css` width: 100%;  display: flex; flex-direction: column; gap: 10px;`}>
                    <div className={css`  display: flex; gap: 10px; align-items: center;`}>
                        <p className={css`display: flex;gap: 10px; flex-wrap: wrap;`}>Title:</p>
                        <input defaultValue={title} text={title}
                            className={css`width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;`} type="text" 
                            onChange={(e) => {
                                setValues({ ...values, title: e.target.value })
                            }}
                          />
                    </div>

                </div>

                <div className={css` width: 100%;  display: flex; flex-direction: column; gap: 10px;`}>
                    <div className={css`  display: flex; gap: 10px; align-items: center;`}>
                        <p className={css`display: flex;gap: 10px; flex-wrap: wrap;`}>Description:</p>
                        <input defaultValue={description} className={css`width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;`} 
                        type="text"
                        onChange={(e) => {
                            setValues({ ...values, description: e.target.value })
                        }} />
                    </div>
                </div>

                <div className={css` width: 100%;  display: flex; flex-direction: column; gap: 10px;`}>
                    <div className={css`  display: flex; gap: 10px; align-items: center;`}>
                        <p>Tag:</p>
                        <select defaultValue={tag} className={css`width: 100%; padding: 16px 20px; border: none;  border-radius: 4px; background-color: #f1f1f1;`}  
                        onChange={(e) => {
                            setValues({ ...values, tag: e.target.value })
                        }} >
                            <option value="SEO">SEO</option>
                            <option value="Long Form">Long Form</option>
                            <option value="Blog post">Blog post</option>
                        </select>
                    </div>
                </div>

                <div className={css` width: 100%;  display: flex; flex-direction: column; gap: 10px;`}>
                    <div className={css`  display: flex; gap: 10px; align-items: center;`}>
                        <p className={css`display: flex;gap: 10px; flex-wrap: wrap;`}>Assignee:</p>
                        <input defaultValue={assignee} className={css`width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;`} 
                        type="text" 
                        onChange={(e) => {
                            setValues({ ...values, assignee: e.target.value })
                        }}/>
                    </div>
                </div>

                <div className={css` width: 100%;  display: flex; flex-direction: column; gap: 10px;`}>
                    <div className={css`  display: flex; gap: 10px; align-items: center;`}>
                        <p>Due Date:</p>
                        <input defaultValue={values.date}
                            min={new Date().toISOString().substr(0, 10)}
                            onChange={(e) => {
                                setValues({ ...values, duedate: e.target.value })
                            }}
                             className={css`width: fit-content; border: 2px solid #ddd; border-radius: 5px; outline: none; font-size: 1rem; padding: 10px;`} type="date" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CardInfo;