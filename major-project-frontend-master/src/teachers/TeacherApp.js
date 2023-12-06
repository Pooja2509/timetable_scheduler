import React,{Component} from 'react'
import Teachers from './Teachers'
import classes from './TeacherApp.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class TeacherApp extends Component{
    state={
        teachers:[] 
    }
     
    onDelTeachers = (index)=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers.splice(index,1)
        this.setState({
                teachers
        })
    }

    onAddTeachers = ()=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers.push({
            id:'',
            name:'',
            unavailableEntitySet:[]
        })
        this.setState({
            teachers
        })
    }

    onChangeTeacher = (event,index,part)=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers[index][part] = event.target.value
        this.setState({
            teachers
        })
    }
   
    showError = () =>{
        this.props.showPopup('please check teachers data')
    }

    onSubTeachers = ()=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        if(!teachers.length){
        this.showError()
        return
        }
        let valid = true
        teachers.forEach(teacher=>{
            if(!(teacher.id.toString().trim().length && teacher.name.trim().length) )
            valid = false
            teacher.unavailableEntitySet.forEach(busySchedule=>{
                if(!(busySchedule.day.toString().trim().length && 
                busySchedule.from.toString().trim().length && 
                busySchedule.to.toString().trim().length ))
                valid = false
            })
        })
        
        if(!valid){
            this.showError()
            return
        }

        axios.post('https://8adfff43.ngrok.io/v1/teachers',teachers).then(response=>{        
        this.props.showPopup(response.status)
                this.setState({
                    teachers:[]
                })
            }).catch(err=>this.props.showPopup(err.response.data));
    }

    onSubunavailableEntitySet=(unavailableEntitySet,index)=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers[index].unavailableEntitySet = unavailableEntitySet;

        this.setState({
            teachers
        })   
    }

    render() {
        return(
            <div className={classes.teacher}>   
            <Teachers visAdd = {this.props.visAdd} teachers={this.state.teachers} 
            onDelClick = {(index)=>this.onDelTeachers(index)}
            onChangeTeacher = {(event,index,part)=>this.onChangeTeacher(event,index,part)} 
            onSubBusySchd={(unavailableEntitySet,index)=>this.onSubunavailableEntitySet(unavailableEntitySet,index)} />
             <button className = {classes.addButton} onClick={()=>this.onAddTeachers()}>Add Teacher</button>
            <button className = {classes.subButton} onClick={()=>this.onSubTeachers()} >Submit Teachers</button>
            </div>
        )
    }

    


}

const mapDispatchToProps = dispatch => {

    return ({
         showPopup:(code)=>dispatch({type:'showPopup',payload:code}),
        showLoader: ()=>dispatch({type:'showLoader'}),
        closeLoader: ()=>dispatch({type:'closeLoader'})
    })
}



export default connect(null,mapDispatchToProps)(withRouter(TeacherApp))