import React,{Component} from 'react'
import classes from './ViewRoom.css' 
import Teachers from '../teachers/Teachers'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
class ViewTeacher extends Component{
    state = {
        loaded:false,
        teachers : [],
        pageNo: 0,
        value:''
    }

    componentDidMount(){      
        axios.get('http://localhost:8080/v1/teachers?pageNo= ' + this.state.pageNo).then(response => 
           this.setState({loaded:true,teachers:response.data.content})).catch(err=>{
               this.props.showPopup(err.response.data)
               this.props.history.replace('/')
           })  
       } 
 
       onDelete = (index) => {
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        let id = teachers[index].id    
        axios.delete('http://localhost:8080/v1/teachers/'+id).then(res=>{
        teachers.splice(index,1)    
        this.props.showPopup('deleted successfully')
            this.setState({loaded:true,teachers})
        }).catch(err=>{
            this.props.showPopup(err.response.status)
            this.setState({loaded:true})
        })
        this.setState({loaded:false})
       }

       clickNext = ()=>{
          let pageNo = this.state.pageNo;
          pageNo = pageNo+1
           axios.get('http://localhost:8080/v1/teachers?pageNo='+pageNo ).then(response => 
            this.setState({loaded:true,pageNo, teachers:response.data.content})).catch(err => {
                this.props.showPopup(err.response.data)
                this.setState({loaded:true})
            })
            this.setState({loaded:false})   
        }
 
        showError = ()=>{
            this.props.showPopup('please check teachers data')
        }
        onUpdate = (index) => {
        let teachers = this.state.teachers.map(teacher=>({...teacher,
                unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        let teacher = teachers[index]
        let valid = true
            if(!(teacher.id.toString().trim().length && teacher.name.trim().length))
            valid = false
            teacher.unavailableEntitySet.forEach(busySchedule=>{
                if(!(busySchedule.day.toString().trim().length && 
                busySchedule.from.toString().trim().length && 
                busySchedule.to.toString().trim().length) )
            valid = false
            })
        
        if(!valid){
            this.showError()
            return
        }
            axios.put('https://8adfff43.ngrok.io/v1/teachers/'+ teacher.id,teacher).then(response=>{
            teachers[index]=response.data
            this.setState({loaded:true,teachers})}).catch(err=>{
                this.props.showPopup(err.response.data)
                this.setState({loaded:true})
            })
            this.setState({loaded:false})
        }    
        
    
       clickPrev = ()=>{
        let pageNo = this.state.pageNo;
        pageNo = pageNo-1
        if(pageNo<0){
            this.props.showPopup('there are no teachers')
            return
        }

        axios.get('http://localhost:8080/v1/teachers?pageNo='+pageNo ).then(response => { 
          this.setState({loaded:true,pageNo,teachers:response.data.content})    
          console.log(response.data.content)}).catch(err => {
                this.props.showPopup(err.response.data)
                this.setState({loaded:true})
              }
          )
          this.setState({loaded:false})   
       }

    onChangeTeacher = (event,index,part)=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers[index][part] = event.target.value
        console.log(event.target.value)
        this.setState({
            teachers
        })
    }   

    onSubunavailableEntitySet=(unavailableEntitySet,index)=>{
        let teachers = this.state.teachers.map(teacher=>({...teacher,
            unavailableEntitySet:teacher.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        teachers[index].unavailableEntitySet = unavailableEntitySet;

        this.setState({
            teachers
        })   
    }

    render(){
        let comp = null
        if(this.state.loaded){
              comp = <Teachers visAdd = {false} teachers={this.state.teachers} 
              onDelClick = {(index)=>this.onDelete(index)}
              onChangeTeacher = {(event,index,part)=>this.onChangeTeacher(event,index,part)} 
              onSubBusySchd={(unavailableEntitySet,index)=>this.onSubunavailableEntitySet(unavailableEntitySet,index)}
              onUpdate = {(index)=>this.onUpdate(index)} />
        } 
        else{ 
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

export default connect(null,mapDispatchToProps)(withRouter(ViewTeacher))