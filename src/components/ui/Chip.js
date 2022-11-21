import { React } from "react";
import { css } from '@emotion/css'
import { X } from 'react-feather'



function Chip(props) {
    return (
        <div className={css`display: flex; gap: 10; align-items: center; padding: 10px; border-radius:40px; font-size:14px; background-color: ${props.color}; border-radius: 40px; padding: 4px 12px; color: #fff;  width: fit-content;` } >
                {props.text}
            {
                props.close && <X className={css`height: 16px; width:16px; cursor: pointer;`} onClick={props.onClose} />
            }


        </div>
    )
}

export default Chip