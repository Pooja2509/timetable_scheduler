import React,{Component} from 'react'
import Branches from '../branches/Branches'
import axios from 'axios'
import classes from './ViewRoom.css'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'

 class ViewBranch extends Component  {
  
   state = {
       loaded:false,
       pageNo:0,
       branches:[],
       value:''
   } 


   componentDidMount(){
    axios.get('http://localhost:8080/v1/branches').then(response =>  
       this.setState({loaded:true,branches:response.data.content})).catch(err=>{
        this.props.showPopup(err.message)
        this.props.history.replace('/')
       })  
   } 

   clickNext = ()=>{
      let pageNo = this.state.pageNo;
      pageNo = pageNo+1       
      axios.get(' http://localhost:8080/v1/branches?pageNo='+pageNo ).then(response =>  
        this.setState({loaded:true,pageNo, branches:response.data.content})).catch(err => {
          this.props.showPopup(err.response.data)
          this.setState({loaded:true})
        }
        )
        this.setState({loaded:false})   
    }

    showError = () => {
        this.props.showPopup('please check branches data');
    }
  
     clickPrev = ()=>{
      let pageNo = this.state.pageNo;
      pageNo = pageNo-1
      if(pageNo<0){
      this.props.showPopup('there are no branches')
      return 
      }
      axios.get(' http://localhost:8080/v1/branches?pageNo='+pageNo ).then(response => { 
        this.setState({loaded:true,pageNo,branches:response.data.content})    
        console.log(response.data.content)}).catch(err=>{
          this.props.showPopup(err.response.data)
          this.setState({loaded:true})
        })
        this.setState({loaded:false})   
     }


    onDelete = (index)=>{
        let branches = this.state.branches.map(branch=>({...branch,
            unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
            subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
            labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
        }))
            let id = this.state.branches[index].id;
            axios.delete(' http://localhost:8080/v1/branches/'+id).then(res => {
                this.props.showPopup(res.data)
                branches.splice(index,1)
                this.setState({loaded:true,branches})
            }).catch(err=>{
                this.props.showPopup(err.response.data)
                this.setState({loaded:true})
            })
            this.setState({loaded:false})
    }
    
  onUpdate = (index) => {
    let branches = this.state.branches.map(branch=>({...branch,
        unavailableEntitySet:branch.unavailableEntitySet.map(busySchedule=>({...busySchedule})),
        subjectEntities:branch.subjectEntities.map(subject=>({...subject,teacherIdsSet:subject.teacherIdsSet.map(teacherId=>({...teacherId}))})),
        labEntities:branch.labEntities.map(lab=>({...lab,teacherIdsSet:lab.teacherIdsSet.map(teacherId=>({...teacherId}))}))
    }))
    let branch =  branches[index] 
     let valid = true
     if( !(branch.year.toString().trim().length && branch.name.trim().length && 
     branch.capacity.toString().trim().length&&
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
         subject.noOfTuts.toString().trim().length)&&(subject.restrict.toString() === 'true' ||
         subject.restrict.toString() === 'false')))
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
     if(!valid){
         this.showError()
         return    
     }
    axios.put(' http://localhost:8080/v1/branches/'+ branch.id,branch).then(response=>{
        branches[index]=response.data    
        this.setState({loaded:true,branches})
    }).catch(err=>{
      this.props.showPopup(err.response.data)
      this.setState({loaded:true})
    })
    this.setState({loaded:false})
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
      let comp = null 
      if(this.state.loaded){
        comp = <Branches branches = {this.state.branches} 
        visAdd = {false}
        onDelClick = {(index)=>this.onDelete(index)} 
        onChangeBranch = {(event,index,part)=>this.onChangeBranch(event,index,part)} 
        onSubBusySchd={(unavailableEntitySet,index)=>this.onSubunavailableEntitySet(unavailableEntitySet,index)} 
        onSubSubjects = {(id,subjectEntities)=>this.onSubSubjects(id,subjectEntities)} 
        onSubLabs = {(id,labEntities)=>this.onSubLabs(id,labEntities)}
        onUpdate = {(id)=>this.onUpdate(id)} />
      }
      else{ 
        console.log(this.state.loaded)
        comp = <div className = {classes.loader}></div>
      }
   return (<div>
       <div className = {classes.viewRoom} >
       <button onClick = {()=> this.clickPrev() } className = {classes.buttonPrev}> PREV</button>
       <button onClick = {()=>this.clickNext()} className = {classes.buttonNext}> NEXT </button>
       </div>
       {comp}
   </div>);
   }
} 

const mapDispatchToProps = dispatch => {

  return ({
      showPopup:(code)=>dispatch({type:'showPopup',payload:code})
  })
}

export default connect(null,mapDispatchToProps)(withRouter(ViewBranch))