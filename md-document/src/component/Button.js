import React ,{} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Btn = ({text,bgColor,icon,onPressed}) =>{
    return (
        <button type="button" className={`btn btn-block no-border ${bgColor}`} onClick = {()=>{
            onPressed()
        }}  >
            <FontAwesomeIcon icon={icon} className="mr-2"></FontAwesomeIcon>{text}
        </button>
    )
}
Btn.prototype = {
    text:PropTypes.string,
    bgColor:PropTypes.string,
    icon:PropTypes.object.isRequired,
    onPressed:PropTypes.func
}

export default Btn;