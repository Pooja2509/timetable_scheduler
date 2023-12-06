import React,{Component} from 'react'
import Rooms from '../laboratories/Rooms'
import axios from 'axios'
import classes from './ViewRoom.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class ViewRoom extends Component  {
  
   state = {
       loaded:false,
       pageNo:0,
       rooms:[],
       value:''
   } 


   componentDidMount(){      
    axios.get('http://localhost:8080/v1/laboratories').then(response => 
       this.setState({loaded:true,rooms:response.data.content})).catch(err=>{
        this.props.showPopup(err.response.data)
        this.props.history.replace('/')
       })  
   } 

   clickNext = ()=>{
      let pageNo = this.state.pageNo;
      pageNo = pageNo+1       
      axios.get('http://localhost:8080/v1/laboratories?pageNo='+pageNo ).then(response =>  
        this.setState({loaded:true,pageNo, rooms:response.data.content})).catch(err => {
            this.props.showPopup(err.response.data)
            this.setState({loaded:true})
        })
        this.setState({loaded:false})   
    }
 
   clickPrev = ()=>{
    let pageNo = this.state.pageNo;
    pageNo = pageNo-1
    if(pageNo<0){
    this.props.showPopup('there are no rooms')
    return
    }
    axios.get('http://localhost:8080/v1/laboratories?pageNo='+pageNo ).then(response => 
      this.setState({loaded:true,pageNo,rooms:response.data.content})).catch(err=>{
        this.props.showPopup(err.response.data)
        this.setState({loaded:true})
      })
      this.setState({loaded:false})   
   }


   onChangeRoom = (event,index,part)=>{
    let rooms = this.state.rooms.map(room=>({...room,
        unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
    rooms[index][part]=event.target.value
    this.setState({
        rooms
    })    

}
   onUpdate = (index)=>{
    let rooms = this.state.rooms.map(room=>({...room,
        unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
    let room = rooms[index]
    let valid =true
    if(!(room.id.toString().trim().length && room.name.trim().length))
            valid = false
            room.unavailableEntitySet.forEach((busySchedule) => {
               if(!(busySchedule.day.toString().trim().length && 
               busySchedule.from.toString().trim().length && 
               busySchedule.to.toString().trim().length) )
               valid =false
            })
     if(!valid){
         this.showError()
         return
     }

     axios.put('http://localhost:8080/v1/laboratories/'+ room.id,room).then(response=>{
        rooms[index] = response.data 
        this.setState({loaded:true,rooms})}).catch(err=>{
            this.props.showPopup(err.response.data)
            this.setState({loaded:false})
        })
     this.setState({loaded:false})   
   }

   showError = ()=> {
       this.props.showPopup('please check laboratories data')
   }

   onSubBusySchedules=(busySchedules,index)=>{
    let rooms = this.state.rooms.map(room=>({...room,
        unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        rooms[index].unavailableEntitySet=busySchedules;
    this.setState({
        rooms
    })
   }

   onDelete = (index) => {
    let rooms = this.state.rooms.map(room=>({...room,
        unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
    let id = rooms[index].id    
    rooms.splice(index,1)
    axios.delete('http://localhost:8080/v1/laboratories/'+id).then(res => {
        this.props.showPopup(res.status)
        this.setState({loaded:true,rooms})
        }).catch(err=>{
            this.props.showPopup(err.response.data)
            this.setState({loaded:true})
        })
    this.setState({loaded:false})
   }

  render(){
      let comp = null
      if(this.state.loaded){
        comp = (<Rooms visAdd = {false} rooms = {this.state.rooms} 
        onChangeRoom = {(event,index,part)=>this.onChangeRoom(event,index,part)} 
        onDelClick = {(index)=>this.onDelete(index)} 
        onUpdate = {(index)=>this.onUpdate(index)}
        onSubBusySchd={(busyschedules,index)=>this.onSubBusySchedules(busyschedules,index)} />)
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

export default connect(null,mapDispatchToProps)(withRouter(ViewRoom))



