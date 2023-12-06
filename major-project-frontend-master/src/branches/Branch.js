import React from 'react'
import classes from './Branch.css'
import Unavailable from '../busyschedules/Unavailable'
import SubjectApp from '../subjects/SubjectApp'
import LabApp from '../labs/LabApp'


const branch = (props)=>{
    return(
        <div className = {classes.branch} >
            <label >year: <input placeholder ='year'  onChange = {(event)=>props.onChangeBranch(event,'year')} value = {props.branch.year}/> </label>
            <label>branch: <input placeholder ='branch' onChange = {(event)=>props.onChangeBranch(event,'name')}
            value = {props.branch.name} /> </label>
            <label>lunch: <input placeholder ='lunch' onChange = {(event)=>props.onChangeBranch(event,'lunch')}
            type="number" value = {props.branch.lunch} /> </label>
            <label>capacity: <input placeholder ='capapcity' onChange = {(event)=>props.onChangeBranch(event,'capacity')}
            type="number" value = {props.branch.capacity} /> </label>           
            <div className = {classes.label}> 
            <Unavailable busySchedules= {props.branch.unavailableEntitySet}  onSubBusyScheds={(busyschedules)=>props.onSubBusySchd(busyschedules)} />
            </div>
            <br />
            <SubjectApp subjects = {props.branch.subjectEntities} onSubSubjects = {(subjects)=>props.onSubSubjects(subjects)}    />
            <br/>
            <LabApp labs = {props.branch.labEntities} onSubLabs = {(labs)=>props.onSubLabs(labs)} />
            <br/>
            <button onClick = {()=> props.onDelClick()} className = {classes.delButton} >delete</button>
            {!props.visAdd?<button onClick = {()=>props.onUpdate()} className = {classes.updateButton} >Update</button>:null}
        </div>
    )
}

export default branch
