import React from 'react'
import Lab from './Lab'

const labs = (props)=>{
     
    let labs = props.labs.map((lab,index)=>(<Lab lab = {lab} key = {index} 
        onAddTeacher = {()=>props.onAddTeacher(index)}
        onChangeLab = {(event,part,id)=>props.onChangeLab(event,index,part,id)} 
        onDelClick= {()=>props.onDelLab(index)} />))


    return labs
}

export default labs