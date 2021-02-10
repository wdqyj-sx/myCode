import React, { useState,useEffect } from "react";
import useKey from "../hook/useKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const FileList = ({ files,onFileClick,onFileDelete,onFileSave }) => {
    const keyEnters = useKey(13);
    const KeyEsc = useKey(27)
    const [editState, seteditState] = useState(false);
    const [value, setValue] = useState('');
    const onCancleEdit = (e)=>{
        e.preventDefault();
        // console.log(e);
        seteditState(false)
        setValue('')
    }
useEffect(()=>{
 const keyEnter = (e)=>{
     if(keyEnters && editState) {
         
         let fileItem = files.find(file => file.id === editState);
         onFileSave(fileItem.id,value)
         seteditState(false);
         setValue("")
     }
     else if (KeyEsc && editState) {
         seteditState(false) 
         setValue("");
     }
 }
 document.addEventListener("keyup",keyEnter);
 return ()=>{
     document.removeEventListener("keyup",keyEnter);
 }
})
    return (
        <ul className="list-group">
            {
                files.map(item =>
                    <li className="list-group-item d-flex justify-content-between align-items-center " key={item.id}>
                        {
                            (editState!==item.id) &&
                            <>
                                <span className="col-1">
                                    <FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon>
                                </span>

                                <span className="col-6" style={{cursor:"pointer"}}
                                    onClick = {()=>{
                                        onFileClick(item.id)
                                    }}
                                >
                                    {item.title}

                                </span>
                                <button type="button" className="btnIcon col-1"
                                    onClick={() => { 
                                        seteditState(item.id)
                                        setValue(item.title)
                                    }}
                                >
                                    <FontAwesomeIcon title="编辑" icon={faEdit}></FontAwesomeIcon>
                                </button>
                                <button type="button" className="btnIcon col-1"
                                    onClick={() => {
                                        onFileDelete(item.id)
                                     }}
                                >
                                    <FontAwesomeIcon title="删除" icon={faTrash}></FontAwesomeIcon>
                                </button>
                            </>

                        }
                        {
                           ( editState === item.id) &&
                            <>
                                <input className="form-control " style={{ height: 24 }} value={value}  onChange={(e) => { setValue(e.target.value) }}></input>
                                <button type="button" className="btnIcon "
                                    onClick={(e)=>{
                                      onCancleEdit(e)
                                    }}
                                >
                                    <FontAwesomeIcon title="关闭" size="lg" icon={faTimesCircle}></FontAwesomeIcon>
                                </button>
                            </>
                        }

                    </li>


                )
            }

        </ul>
    )
}
FileList.prototype = {
    files: PropTypes.array,
    onFileClick:PropTypes.func,
    onFileDelete:PropTypes.func,
    onFileSave:PropTypes.func
}

export default FileList