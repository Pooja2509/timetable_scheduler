import React from 'react'
import Subject from './Subject'

const subjects = (props) =>{
    let subjects = props.subjects.map((subject,index)=> ( <Subject  subject ={subject} key={index} 
    onDelClick = {()=>props.onDelClick(index)}
    onAddTeacher = {()=>props.onAddTeacher(index)}
    onChangeSubject = {(event,part,id)=>props.onChangeSubject(event,index,part,id)}  />))
    return subjects
}

export default subjects