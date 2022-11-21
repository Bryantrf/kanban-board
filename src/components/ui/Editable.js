import { React, useState } from "react";
import { css } from '@emotion/css'
import { X } from 'react-feather'

function Editable(props){
    const [showEdit, setShowEdit]= useState(false)
 return (
    <div className={css`width: 100%;`}>
        {
            showEdit ?
            (<form className={css`display: flex; flex-direction: column; gap: 10px;`}
            onSubmit={(event)=> {
                if(props.onSubmit)props.onSubmit()
            }}
            >
            <input type="text" 
            defaultValue={props.text}
            placeholder={props.placeholder || ""} 
            className={css `border: 2px solid #0079bf;  border-radius: 5px;  outline: none; font-size: 1rem; padding: 10px;`}/>
            <div className={css`display: flex; gap: 8px; align-items: center;`}>
                <button type="summit" className={css`  cursor: pointer; border-radius: 5px;  outline: none; background-color: #0079bf; color: #fff; border: none; transition: 100ms ease;  padding: 10px;`}>
                    {props.buttonText || "Add"}</button>
               <X className={css`  cursor: pointer; height: 24px; width: 24px;`} onClick={()=> setShowEdit(false)}/>
            </div>
        </form>)
        : <p className={css` padding: 6px 12px;  border-radius: 3px;  background-color: #eee; color: #000; cursor: pointer; text:center;  transition: 200ms;`} onClick={()=> setShowEdit(true)}>{props.text || "Add item"}</p>
        }
        
    </div>
 )
}

export default Editable;
