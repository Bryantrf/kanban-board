import React, { useEffect, useRef } from "react";
import { css } from '@emotion/css'

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={css` position: absolute; right: 0; top: 100%; background-color: #fff; border-radius: 3px; min-height: 40px; min-width: 150px;  width: fit-content; height: fit-content;  max-width: 250px; max-height: 390px; overflow-y: auto; z-index: 5;`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;