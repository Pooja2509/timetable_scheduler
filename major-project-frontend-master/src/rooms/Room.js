import React from 'react'
import classes from './Room.css'
import Unavailable from '../busyschedules/Unavailable'

const room = (props)=>{
    return(
        <div  className = {classes.room}>
            {props.visAdd?<label>Id: <input name='id' onChange= {(event)=>props.onChangeRoom(event,'id')} placeholder = "id" value = {props.room.id}
            type="number" /></label>:null}
            <label>name: <input name='name' onChange= {(event)=>props.onChangeRoom(event,'name')} placeholder = 'name' value = {props.room.name}/></label>
            <label>capacity: <input name='capacity' onChange= {(event)=>props.onChangeRoom(event,'capacity')} placeholder = 'capacity' value = {props.room.capacity} 
            type = "number" /></label>
            <label>restrict: <input name='restrict' onChange= {(event)=>props.onChangeRoom(event,'restrict')} placeholder = 'restrict' value = {props.room.restrict} /></label>
            <br/>
            <button onClick = {()=>props.onDelClick()} className = {classes.delButton}> Delete</button>
            {!props.visAdd?<button onClick = {()=> props.onUpdate()} className = {classes.updateButton}>update</button>:null}
            <Unavailable busySchedules = {props.room.unavailableEntitySet} onSubBusyScheds={(busyschedules)=>props.onSubBusySchd(busyschedules)} />
        </div>
    )

}
export default room