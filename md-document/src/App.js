import FileSearch from "./component/FileSearch";
import {flattenArr,objToArr} from "./util/helper";
import FileList from  "./component/FileList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Btns from "./component/Button";
import './App.css';
import defaultFiles from "./util/defaultFiles";
import {faFile,faFileImport} from "@fortawesome/free-solid-svg-icons";
import TabList from "./component/tabList";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React,{useState,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [files,setFiles] = useState(flattenArr(defaultFiles));
  const [openFilesId,setOpenFilesId] = useState([]);
  const [unSaveFilesId,setUnSaveFilesId] = useState([]);
  const [searchFiles,setSearchFiles] = useState([]);
  const [activeId,setActiveId] = useState("");
  const filesArr = objToArr(files);
  //  console.log(files);
  //  console.log(filesArr);
  let openFiles = openFilesId.map(itemId => {
    return files[itemId];
  })
  const activeFiles = files[activeId];
  const fileArr = searchFiles.length > 0 ? searchFiles : filesArr; 

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
    // let nowFiles = files.map(item => {
    //   if(item.id === id){
    //     item.body = value;
    //   }
    //   return item;
    // })
    let nowfile = {...files[id],body:value}

    // console.log(nowFiles)
    setFiles({...files,[id]:nowfile});
    if(!unSaveFilesId.includes(id)){
      setUnSaveFilesId([...unSaveFilesId,id]);
    }
  }
  const fileDelete = (id) => {
    delete files[id];
    // console.log(files);
    setFiles(files);
    tabListClose(id);
  }
  const fileSave = (id,value) => {
    // console.log(value)
    // console.log(id)
    // let newfile = files.map(item => {
    //   if(item.id === id){
    //     item.title = value
    //     item.isEdit = false
    //   }
    //   return item;
    // })
    console.log(id)
    console.log(files)
    console.log(files[id])
    let newfile = {
      ...files[id],
      title:value,
      isEdit:false
    }
       console.log(newfile);
    setFiles({
      ...files,
      [id]:newfile
    });
     filesClick(id);
    // console.log(openFiles);
  }
  const fileSearch = (value) => {
   let newfile = filesArr.filter(file => file.title.includes(value));
    // console.log(newfile)
    setSearchFiles(newfile);
  }
  const createList = ()=>{
    console.log(fileArr);
    let newfile = filesArr.filter(file => file.isEdit)
     console.log(newfile)
    if(!newfile.length>0){
      let nowid = uuidv4();
      setFiles({
        ...files,
        [nowid]:{
          id:nowid,
          title:'',
          body:'##请输入内容',
          createdAt:new Date().getTime,
          isEdit:true
        }
      })

    }
  }
  return (
    <div className="App container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-3 bg-danger left-panel ">
          <FileSearch title="我的云文档"  onFileSearch={(value)=>{ fileSearch(value)}} />
          <FileList files={fileArr}
            onFileClick = {(id)=>{
              filesClick(id)
            }}
            onFileDelete = {(id)=>{
              fileDelete(id);
            }}
            onFileSave = {(id,value) =>{
              fileSave(id,value);
            }}

            ></FileList>
          <div className="row no-gutters btn-group">
            <div className="col">
            <Btns text={'新建'} bgColor={'btn-primary'} icon={faFile} onPressed = {()=>{createList()}}
              
            ></Btns>
            </div>
            <div className="col">
            <Btns text={'导入'} bgColor={'btn-success'} icon={faFileImport} onPressed = {()=>{}}></Btns>
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
