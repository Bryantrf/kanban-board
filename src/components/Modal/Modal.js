import React from "react";
import { css } from '@emotion/css'



function Modal(props) {
  return (
    <div
      className={css`  position: fixed; top: 0; left: 0; height: 100%; min-height: 100vh; width: 100%; background-color: rgba(0, 0, 0, 0.46);  display: flex;  justify-content: center; align-items: center; z-index: 20;`}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className={css`overflow-y: auto;  max-height: 95vh;  background-color: #fff;  border-radius: 3px; box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.12);`}
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modal;