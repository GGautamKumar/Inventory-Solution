import React from "react";
import "./index.css";


const ContainerLayout = (props) => {
  return (
    <div className={`main-container ${props.layoutClassName || ""}`}>
    <div
      className={
        props.className
          ? `container-header ${props.className}`
          : "container-header"
      }
    >
      <h4 className="header-title">{props.title}</h4>
      {props.extra}
    </div>
    <div className="layout-children">
      {props.children}
    </div>
  </div>
  )
}

export default ContainerLayout