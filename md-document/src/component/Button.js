import React ,{} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Btn = ({text,bgColor,icon,onClick}) =>{
    return (
        <button type="button" className={`btn btn-block no-border ${bgColor}`}   >
            <FontAwesomeIcon icon={icon} className="mr-2"></FontAwesomeIcon>{text}
        </button>
    )
}
Btn.prototype = {
    text:PropTypes.string,
    bgColor:PropTypes.string,
    icon:PropTypes.object.isRequired,
    onClick:PropTypes.func
}

export default Btn;