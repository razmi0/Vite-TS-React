import { ReactNode } from "react";

interface Button {
    children : ReactNode
  }
  

function Button( {children} : Button ) {
  return <button className="btn btn-warning" >{ children }</button>;
}

export default Button;
