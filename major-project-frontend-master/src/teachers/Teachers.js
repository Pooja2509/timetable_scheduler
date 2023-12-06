import React from 'react'
import Teacher from './Teacher'

const teachers = (props)=>{
   
    let teachers = props.teachers.map((teacher,index)=>(<Teacher visAdd = {props.visAdd} teacher={teacher} key={index}
        onChangeTeacher = {(event,part)=>props.onChangeTeacher(event,index,part)} 
        onDelClick = {() => props.onDelClick(index)} 
        onSubBusySchd={(busyschedules)=>props.onSubBusySchd(busyschedules,index)} 
        onUpdate = {()=>props.onUpdate(index)}/>))
    
    return teachers;

}

export default teachers;