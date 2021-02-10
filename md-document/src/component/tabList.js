import React from "react";
import PropTypes from "prop-types";
import className from "classname";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./tabList.scss";

const TabList = ({ files, nowId, unsaveId, onClose, onSel }) => {
  return (
    <ul className="nav nav-pills mb-3">
      
      {files.map((item) => {
        let classStyly = className({
          "nav-link": true,
          active: nowId === item.id,
        });
      
        let withCircle = unsaveId.includes(item.id);
        let iconS = className({
            'showI':true,
            'unsave':withCircle
        })
        return (
          <li
            className="nav-item"
            role="presentation"
            key={item.id}
            onClick={() => {
              onSel(item.id);
            }}
          >
            <a className={classStyly} href="#pills-home">
              
              {item.title} 
              <span
                className={iconS}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(item.id);
                }}
              >
               {!withCircle? <FontAwesomeIcon icon={faTimes} className="ml-2">
                </FontAwesomeIcon>: <FontAwesomeIcon icon={faCircle} className="ml-2">
                </FontAwesomeIcon>}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

TabList.propTypes = {
  files: PropTypes.array,
  nowId: PropTypes.string,
  unsaveId: PropTypes.array,
  onClose: PropTypes.func,
  onSel: PropTypes.func,
};

export default TabList;
