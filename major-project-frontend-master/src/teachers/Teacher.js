import React from 'react'
import Unavailable from '../busyschedules/Unavailable'
import classes from './Teacher.css'
const teacher = (props)=>{

return(
    <div className ={classes.teacher}>
       {props.visAdd ? <label>Id:<input placeholder='id' type = "number"
        onChange= {(event)=>props.onChangeTeacher(event,'id')} value = {props.teacher.id} /> </label> : null}
        <label>name:<input placeholder='name'
        onChange= {(event)=>props.onChangeTeacher(event,'name')} value = {props.teacher.name} />  </label>
        <button onClick={()=>props.onDelClick()} className= {classes.delButton} >Delete</button>
        {!props.visAdd?<button onClick = {()=>props.onUpdate()} className= {classes.updateButton} >update</button>:null}
        <Unavailable busySchedules = {props.teacher.unavailableEntitySet} onSubBusyScheds={(busyschedules)=>props.onSubBusySchd(busyschedules)} />  
    </div>
)

}

export default teacher;