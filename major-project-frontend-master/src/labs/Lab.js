import React from 'react'
import classes from './Lab.css'

const lab = (props)=>{
    let teachers = props.lab.teacherIdsSet.map((teacher,id)=>(<label key ={id}>  teacherId: <input 
        placeholder ='teacherId' onChange = {(event)=>props.onChangeLab(event,'teacherIdsSet',id)} 
    value = {teacher.teacherId} type = "number" /></label>))
    return(
        <div className = {classes.lab}>
            <label> courseCode: <input value = {props.lab.courseCode}placeholder ='courseCode' 
            onChange = {(event)=>props.onChangeLab(event,'courseCode',-1)} /></label>
            <label> labId: <input value = {props.lab.laboratoryId}placeholder ='labId'
             onChange = {(event)=>props.onChangeLab(event,'laboratoryId',-1)} type = "number" /></label>
            <label> noOfSlots: <input value = {props.lab.noOfSlots}placeholder ='noOfSlots' 
            onChange = {(event)=>props.onChangeLab(event,'noOfSlots',-1)} type = "number" /></label>
            <br/>
            <label> noOfGroups: <input className ={classes.height} value = {props.lab.noOfGroups}placeholder ='noOfGroups'
             onChange = {(event)=>props.onChangeLab(event,'noOfGroups',-1)} type="number" /></label>
            <label> noOfLabs: <input value = {props.lab.noOfLabs}placeholder ='noOfLabs' 
            onChange = {(event)=>props.onChangeLab(event,'noOfLabs',-1)} type="number" /></label>
            <br/>
            {teachers}
            <button onClick = {()=>props.onAddTeacher()} className = {classes.addTeacher} >addTeacher</button>
            <br/>
            <button onClick = {()=>props.onDelClick()} className = {classes.delTeacher}>delete</button>
        </div>
    )
}

export default lab;