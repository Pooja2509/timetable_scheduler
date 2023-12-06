import React from 'react'
import Room from './Room'

const rooms = (props)=>{
   
    let rooms = props.rooms.map((room,index)=>(<Room visAdd = {props.visAdd}  room = {room} key ={index}
    onDelClick ={()=>props.onDelClick(index)}  
    onChangeRoom = {(event,part)=>props.onChangeRoom(event,index,part)}
    onSubBusySchd={(busyschedules)=>props.onSubBusySchd(busyschedules,index)} 
    onUpdate = {()=>props.onUpdate(index)}/>))


    return rooms
}

export default rooms