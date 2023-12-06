import React,{Component} from 'react'
import classes from './BranchApp.css'
import Branches from './Branches'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class BranchApp extends Component{

    state={
        branches:[]
    }

    onAddBranch = ()=>{
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches.push({
            year:'',
            name:'',
            lunch:'',
            capacity:'',
            unavailableEntitySet:[],
            subjectEntities:[],
            labEntities:[]
        })

        this.setState({
            branches
        })

    }

    onDelBranch = (index)=>{

        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches.splice(index,1);
        this.setState({
            branches
        })    
    }

    onChangeBranch = (event,index,part)=>{
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches[index][part] = event.target.value;
        this.setState({
            branches
        })
    }

    onSubunavailableEntitySet = (unavailableEntitySet,index) => {
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches[index].unavailableEntitySet=unavailableEntitySet;

        this.setState({
            branches
        })

    }

    onSubBranches = ()=>{
        console.log(this.state.branches)
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        if(!branches.length){
            this.props.showPopup('Please Check branches data')
            return 
        }

        let valid = true
        branches.forEach(branch=>{
            if( !(branch.year.toString().trim().length && branch.name.trim().length && 
            branch.capacity.toString().trim().length &&
            branch.lunch.toString().trim().length))
            valid =false
            branch.unavailableEntitySet.forEach(unavailableEntity=>{
                if(!(unavailableEntity.day.toString().trim().length &&
                 unavailableEntity.from.toString().trim().length && 
                unavailableEntity.to.toString().trim().length) )
                valid = false
            })
            branch.subjectEntities.forEach(subject=>{
                if(!((subject.courseCode.toString().trim().length && 
                subject.roomId.toString().trim().length &&
                subject.noOfGroups.toString().trim().length && 
                subject.noOfClasses.toString().trim().length &&
                subject.noOfSlots.toString().trim().length && 
                subject.noOfTuts.toString().trim().length)&& (subject.restrict==='true'
                || subject.restrict === 'false')))
                valid = false
                subject.teacherIdsSet.forEach(teacherId=>{
                    if(!teacherId.teacherId.toString().trim().length)
                    valid = false
                })

            })
            branch.labEntities.forEach(lab=>{
                if(!(lab.noOfGroups.toString().trim().length &&
                lab.noOfSlots.toString().trim().length && 
                lab.noOfLabs.toString().trim().length &&
                lab.laboratoryId.toString().trim().length &&
                lab.courseCode.toString().trim().length))
                valid = false
                lab.teacherIdsSet.forEach(teacherId=>{
                    if(!teacherId.teacherId.toString().trim().length)
                    valid = false
                })
            })
        })
        if(!valid){ 
            this.showError()  
            return 
        }
            axios.post('http://localhost:8080/v1/branches',branches).then(response=>{   
            this.props.showPopup(response.data)
            this.setState({
                    branches:[]
                })
            }).catch(err=>this.props.showPopup(err.response.data))
    }

    showError = () => {
        this.props.showPopup('please check branches data')
    }

    onSubSubjects = (id,subjectEntities)=>{
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches[id].subjectEntities=subjectEntities
        this.setState({
            branches
        })
    }


    onSubLabs = (id,labEntities)=>{
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
        branches[id].labEntities=labEntities
        this.setState({
            branches
        })
    }


    render(){
        return(
            <div className = {classes.branch} >
                <Branches branches = {this.state.branches} 
                visAdd = {true}
                onDelClick = {(index)=>this.onDelBranch(index)} 
                onChangeBranch = {(event,index,part)=>this.onChangeBranch(event,index,part)} 
                onSubBusySchd={(unavailableEntitySet,index)=>this.onSubunavailableEntitySet(unavailableEntitySet,index)} 
                onSubSubjects = {(id,subjectEntities)=>this.onSubSubjects(id,subjectEntities)} 
                onSubLabs = {(id,labEntities)=>this.onSubLabs(id,labEntities)} />
                <button onClick = {()=>this.onAddBranch()} className = {classes.addBranch}>addBranch</button>
                <button onClick = {()=>this.onSubBranches()} className = {classes.subBranch} >submitBranch</button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {

    return ({
        showPopup:(code)=>dispatch({type:'showPopup',payload:code})
    })
}

export default connect(null,mapDispatchToProps)(withRouter(BranchApp))