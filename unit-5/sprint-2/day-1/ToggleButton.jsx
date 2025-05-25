import React, { useState } from "react";
export default function ToggleButton(){
const [text,setText]=useState(true)
let setColor='green'
let handleText='off'
if(text===true){
    handleText='on'
}
else{
    handleText='off'
}
if(text===true){
    setColor='green'
}
else {
    setColor='red'
}
function handleClick(){
setText(prev=>!prev)
}
return (
    <>
    <button onClick={handleClick} style={{color:setColor}} >{handleText}</button>
    </>
)
}