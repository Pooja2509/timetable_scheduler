import React from 'react'
import classes from './Room.css'
import Unavailable from '../busyschedules/Unavailable'
 
const room = (props)=>{
    return(
        <div  className = {classes.room}>
            {props.visAdd?<label>Id: <input onChange= {(event)=>props.onChangeRoom(event,'id')} type="number"
             placeholder = 'id' value = {props.room.id} /></label>:null}
            <label>name: <input onChange= {(event)=>props.onChangeRoom(event,'name')} placeholder = 'name'
            value = {props.room.name} /></label>
            <button onClick = {()=>props.onDelClick()} className = {classes.delButton}> Delete</button>
            {!props.visAdd?<button onClick = {()=>props.onUpdate()} className = {classes.updateButton} >update</button>:null}
            <Unavailable onSubBusyScheds={(busySchedules)=>props.onSubBusySchd(busySchedules)} 
            busySchedules = {props.room.unavailableEntitySet}/>
        </div>
    )

}
export default room