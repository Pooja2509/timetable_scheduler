import React,{Component} from 'react'
import Labs from './Labs'
import classes from './LabApp.css'

class LabApp extends Component{
    
    state = {
        labs:this.props.labs,
        show:false
    }
    
    onAddLab = () =>{
        let labs = this.state.labs.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.slice()}))
        labs.push({
            courseCode:'',
            noOfSlots:'',
            noOfGroups:'',
            laboratoryId:'',
            noOfLabs:'',
            teacherIdsSet:[{teacherId:''}]
        })
        this.setState({
            labs
        })
    }

    onChangeLab = (event,index,part,id) =>{
        let labs = this.state.labs.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        if(id<0)
        labs[index][part]=event.target.value 
        else
         labs[index][part][id].teacherId=event.target.value
         this.setState({
             labs
         })
    }

    onAddTeacher = (index) =>{
        let labs = this.state.labs.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))        
        labs[index].teacherIdsSet.push({teacherId:''})
        this.setState({
            labs
        })
    }

    onDelLab = (index)=>{
        let labs = this.state.labs.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))        
        labs.splice(index,1)
        this.setState({
            labs
        })
    }

    onSubLab = ()=>{
        let labs = this.state.labs.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))        
        this.props.onSubLabs(labs)
        this.setState({
            show:!this.state.show
        })
    }
    
    showLab = ()=>{
        this.setState({
            show:!this.state.show
        })
    }


    render(){
        
           let labs= this.state.show ?<div className = {classes.lab}>
            <Labs labs = {this.state.labs} 
            onAddTeacher = {(index)=>this.onAddTeacher(index)}
            onChangeLab = {(event,index,part,id)=>this.onChangeLab(event,index,part,id)} 
            onDelLab = {(index)=>this.onDelLab(index)} />
            <button onClick = {()=>this.onAddLab()} className = {classes.addLab}  >addLab</button>
            <br/>
            <button onClick = {()=>this.onSubLab()} className = {classes.subLab} >subLab</button>
            </div> : <button onClick = {()=>this.showLab()} className = {classes.showLab} >addLabs</button>
 
        return labs
    }
}

export default LabApp