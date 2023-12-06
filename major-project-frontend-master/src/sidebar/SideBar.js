import React,{Component} from 'react'
import classes from './SideBar.css'
import {Link} from 'react-router-dom'
import Module from './Module'
class sideBar extends Component{
   
    state = {
        visTeacher :false,
        visRoom :false,
        visBranch :false,
        visLab : false
    }
   
    onChangeVisibility = (name)=>{
       let visibilities = {
        visTeacher :false,
        visRoom :false,
        visBranch :false,
        visLab : false
    }
       visibilities[name]=!this.state[name] 
       this.setState(visibilities)
    }

    render(){
    return(
    <div className = {classes.sideBar}>
        <img src="https://img.icons8.com/bubbles/100/000000/cloud-account-login-male.png" alt='user icon'></img>
        <Module changeVisSidebar = {()=>this.props.changeVisSidebar()} name = "Teachers" type="visTeacher" vis={this.state.visTeacher} changeVisibility = {(name)=>this.onChangeVisibility(name)}/>
        <Module changeVisSidebar = {()=>this.props.changeVisSidebar()} name = "Rooms" type="visRoom" vis={this.state.visRoom} changeVisibility = {(name)=>this.onChangeVisibility(name)}/>
        <Module changeVisSidebar = {()=>this.props.changeVisSidebar()} name = "Branches" type="visBranch" vis={this.state.visBranch} changeVisibility = {(name)=>this.onChangeVisibility(name)}/>
        <Module changeVisSidebar = {()=>this.props.changeVisSidebar()} name = "Labs" type="visLab" vis={this.state.visLab} changeVisibility = {(name)=>this.onChangeVisibility(name)}/>
    </div>
    )}
}

export default sideBar