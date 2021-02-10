import React,{useState,useEffect,useRef} from "react";
import {faSearch,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import usekeyPressd from "../hook/useKey";
import PropTypes from "prop-types";
import useKey from "../hook/useKey";

const FileSearch = ({title,onFileSearch}) =>{
    const keyEnter = useKey(13);
    const KeyEsc = useKey(27)
    const [inputActive, setinputActive] = useState(false);
    const [value,setValue] = useState("");
    const closeSearch = ()=>{
        setinputActive(false)
        setValue("")
    }
    const node = useRef(null);
    useEffect(()=>{
        //组件加载时添加键盘监听事件
      
      const  handleKey = ()=>{
            // console.log(keyEnter)
            // console.log(KeyEsc)
            if(keyEnter && inputActive){
                onFileSearch(value)
            }
            else if(KeyEsc&& inputActive){
                closeSearch();
            }
        }
        document.addEventListener("keyup",handleKey)
        return ()=>{
            document.removeEventListener("keyup",handleKey)
        }
    })
    //让搜索框聚焦
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return (
        <div className="alert alert-primary mb-0">
            {!inputActive&&
            <div className="d-flex justify-content-between align-items-center">
                <span>{title}</span>
                <button type="button" className="btnIcon"
                    onClick={()=>{setinputActive(true)}}
                >
                    <FontAwesomeIcon title="打开" size="lg" icon={faSearch}></FontAwesomeIcon>
                </button>
            </div>    
        }
        {
            inputActive&& <div className="d-flex justify-content-between align-items-center">
                <input className="form-control " style={{height:24}} value={value} ref={node} onChange={(e)=>{setValue(e.target.value)} }></input>
                <button type="button" className="btnIcon "
                    onClick={closeSearch}
                >
                    <FontAwesomeIcon title="关闭" size="lg" icon={faTimesCircle}></FontAwesomeIcon>
                </button>
            </div>
        }
        </div>
    )
}
FileSearch.prototype = {
    title:PropTypes.string,
    onFileSearch:PropTypes.func.isRequired

}
FileSearch.defaultProps = {
    title:"我的云文档"
}
export default FileSearch;