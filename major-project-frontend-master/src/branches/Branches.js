import React from 'react'
import Branch from './Branch'

const branches = (props) =>{

    let branches = props.branches.map((branch,index)=>(<Branch branch={branch} key={index} 
    onDelClick = {()=>props.onDelClick(index)} 
    visAdd = {props.visAdd}
    onChangeBranch = {(event,part)=>props.onChangeBranch(event,index,part)} 
    onSubBusySchd={(busyschedules)=>props.onSubBusySchd(busyschedules,index)} 
    onSubSubjects = {(subjects)=>props.onSubSubjects(index,subjects)} 
    onSubLabs = {(labs)=>props.onSubLabs(index,labs)} 
    onUpdate = {()=>props.onUpdate(index)}/>))
    
    return branches

}

export default branches