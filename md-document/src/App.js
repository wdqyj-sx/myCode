import FileSearch from "./component/FileSearch";
import DefaultFiles from "./util/defaultFiles";
import FileList from  "./component/FileList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Btns from "./component/Button";
import './App.css';
import defaultFiles from "./util/defaultFiles";
import {faFile,faFileImport} from "@fortawesome/free-solid-svg-icons";
import TabList from "./component/tabList";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React,{useState} from "react";

function App() {
  const [files,setFiles] = useState(defaultFiles);
  const [openFiles,setOpenFiles] = useState([]);
  const [unSaveFiles,setUnSaveFiles] = useState([]);
  const [activeId,setActiveId] = useState("");
 
  return (
    <div className="App container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-3 bg-danger left-panel ">
          <FileSearch title="我的云文档"  onFileSearch={(value)=>{console.log(value)}} />
          <FileList files={files}
            onFileClick = {(id)=>{
              console.log(id)
            }}
            onFileDelete = {(id)=>{
              console.log('de',id)
            }}
            onFileSave = {(id,value) =>{
              console.log(id,value);
            }}
            ></FileList>
          <div className="row no-gutters btn-group">
            <div className="col">
            <Btns text={'新建'} bgColor={'btn-primary'} icon={faFile} onClick = {()=>{}}></Btns>
            </div>
            <div className="col">
            <Btns text={'导入'} bgColor={'btn-success'} icon={faFileImport} onClick = {()=>{}}></Btns>
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          <TabList files={openFiles} nowId={activeId} unsaveId={unSaveFiles} onClose={(id)=>console.log('clos',id)} onSel={(id)=>console.log(id)}></TabList>
          <SimpleMDE value={defaultFiles[0].body} onChange={(value)=>console.log(value)} />;
        </div>
      </div>
    </div>
  );
}

export default App;
