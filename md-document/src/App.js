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
  const [openFilesId,setOpenFilesId] = useState([]);
  const [unSaveFilesId,setUnSaveFilesId] = useState([]);
  const [activeId,setActiveId] = useState("");
  const openFiles = openFilesId.map(itemId => {
    return files.find(item => item.id === itemId);
  })
  const activeFiles = files.find(item => item.id === activeId);
  const filesClick = (id)=>{
    setActiveId(id);
    if(!openFilesId.includes(id)){
      setOpenFilesId([...openFilesId,id]);
    }
    console.log(activeFiles)
  }
  const tabListClose = (id) => {
    // console.log(id);
    let lastOpenFilesId =  openFilesId.filter(item => item !==id);
    // console.log(lastOpenFilesId)
    setOpenFilesId(lastOpenFilesId);
    if(activeId === id&&setOpenFilesId) {
      setActiveId(lastOpenFilesId[0]);
    }
  }
  const tablistOnSel = (id) =>{
    setActiveId(id);
  }
  const MDEChange = (id,value) => {
    let nowFiles = files.map(item => {
      if(item.id === id){
        item.body = value;
      }
      return item;
    })
    // console.log(nowFiles)
    setFiles(nowFiles);
    if(!unSaveFilesId.includes(id)){
      setUnSaveFilesId([...unSaveFilesId,id]);
    }
  }
  return (
    <div className="App container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-3 bg-danger left-panel ">
          <FileSearch title="我的云文档"  onFileSearch={(value)=>{console.log(value)}} />
          <FileList files={files}
            onFileClick = {(id)=>{
              filesClick(id)
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
        
          <TabList files={openFiles} nowId={activeId} unsaveId={unSaveFilesId} onClose={(id) => { tabListClose(id)}} onSel={(id)=>{tablistOnSel(id)}}></TabList>
          {
            activeId ?  <SimpleMDE key={activeFiles&&activeFiles.id} value={ activeFiles&& activeFiles.body} onChange={(value)=>{MDEChange(activeId,value)}} />:<div className="none-files">请创建或打开文件</div>
          }
         
        </div>
      </div>
    </div>
  );
}

export default App;
