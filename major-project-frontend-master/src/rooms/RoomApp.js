import React,{Component} from 'react'
import classes from './RoomApp.css'
import Rooms from './Rooms'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class RoomApp extends Component{
    
    state={
         rooms:[]
    }

    onAddRoom=()=>{
        let rooms = this.state.rooms.map(room=>({...room,
            unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        rooms.push({
            id:'',
            name:'',
            capacity:'',
            restrict:'',
            unavailableEntitySet:[]
        })
        this.setState({
            rooms
        })

    }

    onDelRoom = (index)=>{

        let rooms = this.state.rooms.map(room=>({...room,
            unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        rooms.splice(index,1)
        this.setState({
            rooms
        })
    }

    onChangeRoom = (event,index,part)=>{
        let rooms = this.state.rooms.map(room=>({...room,
            unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
        rooms[index][part]=event.target.value.toString() 
        console.log(rooms[index][part])
        this.setState({
            rooms
        })    

    }


    onSubRoom = ()=>{
        console.log(this.state.rooms)
        let valid = true
        let rooms = this.state.rooms.map(room=>({...room,
            unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))})) 
        if(!rooms.length){
            valid = false
        } 
        rooms.forEach((room)=>{
            if( !((room.id.toString().trim().length && room.capacity.toString().trim().length &&
            room.name.trim().length)  && (room.restrict === 'true' || room.restrict === "false")) ){
            valid = false
            }
            room.unavailableEntitySet.forEach((busySchedule) => {
               if( !(busySchedule.day.toString().trim().length && busySchedule.from.toString().trim().length && 
               busySchedule.to.toString().trim().length)){
               valid = false
            }
            })  
        })
        if(!valid){
            this.showError()
            return
        }

        axios.post('http://localhost:8080/v1/rooms',rooms).then(response=>{
        this.props.showPopup(response.data)
            this.setState({
                rooms:[]
            })   
        }).catch(err=>{
            this.props.showPopup(err.response.data)
        })   
    }
    
    onSubBusySchedules=(unavailableEntitySet,index)=>{
        let rooms = this.state.rooms.map(room=>({...room,
            unavailableEntitySet:room.unavailableEntitySet.map(busySchedule=>({...busySchedule}))}))
            rooms[index].unavailableEntitySet=unavailableEntitySet;
        this.setState({
            rooms
        })
    }
    showError = () => {
        this.props.showPopup("Please Check rooms data");
      };

    render(){

        return(
            <div className = {classes.room} >
            <Rooms rooms = {this.state.rooms} 
            onChangeRoom = {(event,index,part)=>this.onChangeRoom(event,index,part)} 
            onDelClick = {(index)=>this.onDelRoom(index)}
            visAdd = {this.props.visAdd} 
            onSubBusySchd={(busyschedules,index)=>this.onSubBusySchedules(busyschedules,index)} />
            <button onClick = {()=>this.onAddRoom()} className = {classes.addRoom} >AddRoom</button>
            <button onClick = {()=>this.onSubRoom()} className = {classes.subRoom}>SubmitRooms</button>
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

export default connect(null,mapDispatchToProps)(withRouter(RoomApp))