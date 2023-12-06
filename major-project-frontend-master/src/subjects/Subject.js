import React from 'react'
import classes from './Subject.css'

const subject  = (props) =>{

    let teachers=props.subject.teacherIdsSet.map((x,id)=>(<label key ={id}>teacherId: <input className ={classes.teacher} 
        onChange={(event)=>props.onChangeSubject(event,'teacherIdsSet',id)}
        placeholder = 'teacherId' value={x.teacherId} type = "number"/></label>))

    return(
        <div className = {classes.subject}>
            <label>courseCode: <input onChange={(event)=>props.onChangeSubject(event,'courseCode',-1)}
            placeholder = 'courserCode' value={props.subject.courseCode}/></label>
            <label>noOfSlots: <input onChange={(event)=>props.onChangeSubject(event,'noOfSlots',-1)}
            type="number" placeholder = 'noOfSlots' value={props.subject.noOfSlots}/></label>
            <label>noOfClasses: <input onChange={(event)=>props.onChangeSubject(event,'noOfClasses',-1)}
            type="number" placeholder = 'noOfClasses' value={props.subject.noOfClasses}/></label>
            <br/>
            <label >noOfGroups: <input className={classes.label} onChange={(event)=>props.onChangeSubject(event,'noOfGroups',-1)}
            type="number" placeholder = 'noOfGroups' value={props.subject.noOfGroups}/></label>
            <label>noOfTuts: <input onChange={(event)=>props.onChangeSubject(event,'noOfTuts',-1)}
            type="number" placeholder = 'noOfTuts' value={props.subject.noOfTuts}/></label>
            <label>restrict: <input onChange={(event)=>props.onChangeSubject(event,'restrict',-1)}
            placeholder = 'restrict' value={props.subject.restrict}/></label>
            <label>roomId: <input onChange={(event)=>props.onChangeSubject(event,'roomId',-1)}
            type="number" placeholder = '.roomId' value={props.subject.roomId}/></label>
            {teachers}
            <button onClick = {()=>props.onAddTeacher()} className = {classes.addTeacher} > AddTeacher</button>
            <br/>
            <button onClick = {()=>props.onDelClick()} className = {classes.delSub} >delete</button>
        </div>
    )

}

export default subject