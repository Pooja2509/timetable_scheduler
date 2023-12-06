import React,{Component} from 'react'
import Subjects from './Subjects'
import classes from './SubjectApp.css'



class SubjectApp extends Component{

    state = {
       subjects:this.props.subjects,
       add:false 
    }

    onAddTeacher = (id)=>{
        let subjects = this.state.subjects.map(subject=>({...subject,
            teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        subjects[id].teacherIdsSet.push({teacherId:''})
        this.setState({subjects})
    }

    onAddSubject = ()=>{
        let subjects = this.state.subjects.map(subject=>({...subject,
            teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        subjects.push({
            courseCode:'',
            teacherIdsSet:[{teacherId:''}],
            noOfSlots:'',
            noOfClasses:'',
            roomId:'',
            noOfGroups:'',
            noOfTuts:'',
            restrict:''
        })

        this.setState({
            subjects
        })
    }

    onDelSubject = (index) =>{
        let subjects = this.state.subjects.map(subject=>({...subject,
            teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        subjects.splice(index,1);
        this.setState({
            subjects
        })
    }

    onChangeSubject = (event,index,part,id) =>{
        let subjects = this.state.subjects.map(subject=>({...subject,
            teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))}))        
        if(id<0)
        subjects[index][part]=event.target.value
        else{
        subjects[index][part][id].teacherId=event.target.value
        }
        this.setState({
            subjects
        })
    }

    onSubSubject = ()=>{
        let subjects = this.state.subjects.map(subject=>({...subject,
            teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))}))        
        this.props.onSubSubjects(subjects)
        this.setState({
            add:false
        })
    }

    showSub=()=>{
        this.setState({
            add:!this.state.add
        })
    }

    render(){


            let sub=(this.state.add?<div className = {classes.subject} >
            <Subjects subjects = {this.state.subjects} 
            onDelClick = {(index)=>this.onDelSubject(index)}
            onAddTeacher = {(index)=>this.onAddTeacher(index)}
            onChangeSubject = {(event,index,part,id)=>this.onChangeSubject(event,index,part,id)} />
            <button onClick = {()=>this.onAddSubject()} className = {classes.addSubject} >addSubject</button>
            <br/>
            <button onClick = {()=>this.onSubSubject()} className = {classes.subSubject}> subSubject</button>
            </div>:<button  onClick = {()=>this.showSub()}
            className = {classes.addSubjects}>addSubjects</button>)
            return sub;
        
    }

}

export default SubjectApp