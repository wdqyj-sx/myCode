import {useEffect,useState} from "react";

const useKey = (target) => {
    const [keyPress,setKeyPress] = useState(false)
    const keyPreSSHandle = ({keyCode}) => {
        if(keyCode === target) {
            setKeyPress(true)
        }
    }
    const keyUpHandle = ({keyCode})=> {
        if(keyCode === target) {
            setKeyPress(false);
        }
    }
    useEffect(()=>{
        document.addEventListener('keydown',keyPreSSHandle);
        document.addEventListener('keyup',keyUpHandle);
        return ()=>{
            document.removeEventListener('keydown',keyPreSSHandle);
            document.removeEventListener('keyup',keyUpHandle)
        }
    },[])
    return keyPress
}

export default useKey;