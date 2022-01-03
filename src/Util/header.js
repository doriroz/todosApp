import React from "react";
import classes from "./header.module.css";

const header = (props) => {
    return <header><h1 className={classes.header}>{props.title}</h1></header>
}

export default header;