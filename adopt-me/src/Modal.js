import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }
  //when the elRef.current div is created initially, it will return the createPortal and return the
  //the modal with the passed elements from parent component.
  //after rendered initally, then this component becomes a function which is the one within useEffect.
  //that means when we get in the Modal for the second time and the function will remove the dom
  //in the third time, it will do the same as the first time.
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
