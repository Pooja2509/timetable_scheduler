import React from 'react'
import classes from './BusySchedule.css'
const busySchedule = (props)=>{

    return(
        <div className={classes.busy}>
           <label >day  : <input  value={props.busySchedule.day}  placeholder="Day"
           onChange = {(event)=>props.onchange(event,props.index,'day')} type = "number"/> </label>
           <label >from : <input  value={props.busySchedule.from} placeholder="from"
           onChange = {(event)=> props.onchange(event,props.index,'from') } type = "number"/> </label>
           <label >to   : <input  value={props.busySchedule.to} placeholder="to"
           onChange = {(event)=>props.onchange(event,props.index,'to')} type = "number"/> </label>
           <button className={classes.buttonDelete} onClick= {()=>props.onDelClick()}>delete</button>
        </div>
    )
}

export default busySchedule;