import React,{Component} from 'react'
import BusySchedules from './BusySchedules' 
import classes from './Unavailable.css'
class Unavailable extends Component{
state={
    busySchedules:this.props.busySchedules,
    showBusySched:false
}


changeBusySchedule=(event,index,part)=>{
     let busySchedules = this.state.busySchedules.map(busySchedule=> ({...busySchedule}))
     busySchedules[index][part]= event.target.value
     this.setState({
         busySchedules:busySchedules
     })
}

onAddBusySchedule=()=>{
     let busySchedules = this.state.busySchedules.map(busySchedule=> ({...busySchedule}));
     busySchedules.push({
         day:'',
         from:'',
         to:''
     })

     this.setState({
             busySchedules:busySchedules
         })
}

onDeleteBusySchedule = (index)=>{
    let busySchedules = this.state.busySchedules.map(busySchedule=>({...busySchedule}));
    busySchedules.splice(index,1);
    console.log(busySchedules)
    this.setState({
        busySchedules
    })
}

onSubBusySchedule = ()=>{
    let busySchedules = this.state.busySchedules.map(busySchedule=>({...busySchedule}));
    this.props.onSubBusyScheds(busySchedules);
    this.setState({
        showBusySched:!this.state.showBusySched
    })
  
}

onChangeShowSched=()=>{
    this.setState({
        showBusySched:!this.state.showBusySched
    })
}




 render(){
     let code=
         (this.state.showBusySched ?
         <div className = {classes.unavailable}>
         <BusySchedules  busySchedules={this.state.busySchedules} 
         onchange={(event,index,part)=>this.changeBusySchedule(event,index,part)}
         onDelClick = {(index)=>this.onDeleteBusySchedule(index)} />
         <button className={classes.buttonAdd} onClick = {()=>this.onAddBusySchedule()}>add</button>
         <button className={classes.buttonSub} onClick = {()=>this.onSubBusySchedule()}>submit</button>
         </div>
         :<button onClick ={()=>this.onChangeShowSched()} className = {classes.buttonAddSched}>AddBusySchedule</button>)
         
        return code 
     
 }

}

export default Unavailable;