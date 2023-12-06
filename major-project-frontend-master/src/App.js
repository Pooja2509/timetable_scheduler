import React, { Component } from 'react';
import classes from  './App.css';
import {withRouter} from 'react-router'
import Table from './output/Table'
// import LabApp from './labs/LabApp'
import RoomApp from './rooms/RoomApp'
// import Unavailable from './busyschedules/Unavailable';
import TeacherApp from './teachers/TeacherApp'
import LaboratoryApp from './laboratories/RoomApp'
import BranchApp from './branches/BranchApp';
// import SubjectApp from './subjects/SubjectApp'
import Auth from './autharization/Auth'
import SideBar from './sidebar/SideBar'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import ViewRoom from './view/ViewRoom'
import ViewTeacher from './view/ViewTeacher';
import ViewBranch from './view/ViewBranch'
import ViewLaboratory from './view/ViewLaboratory'
import Popup from './popup/Popup'

class App extends Component {

  render() {
    let sidebar = null;
    let auth = null;
    if(!this.props.auth)
     auth = <Auth/>
    if(this.props.visSidebar)
    sidebar = <SideBar changeVisSidebar = {()=>this.props.changeVisSidebar()} />

    return (
      <div className={classes.App}>
         {auth}
         <Popup />
         {this.props.auth?
        <div className = {classes.navBar} >
          <button className = {classes.button} onClick = {()=>{
      this.props.history.replace('/viewMenu');this.props.changeVisSidebar()}} >Menu</button>
          <button className = {classes.logout} onClick = {()=>{this.props.history.replace('/');
          this.props.changeAuth()}}>Log out</button>
          <button className = {classes.logout} onClick = {()=>this.props.history.replace('/viewResults')} >results</button> 
        </div>:null}
        
        <Route path = "/addTeachers" exact render = {()=> (<TeacherApp  visAdd= {true} teachers = {[]}/>)} />
        <Route path = "/addRooms" exact render = {() => (<RoomApp visAdd = {true} rooms= {[]} /> )}/>
        <Route path = "/addBranches" exact render = {() => (<BranchApp visAdd={true} branches = {[]} /> )} />
        <Route path = "/addLabs" exact render = {() => (<LaboratoryApp /> )} />
        <Route path = "/viewRooms" exact render = {() => (<ViewRoom/> )} />
        <Route path = "/viewTeachers" exact render = {()=> (<ViewTeacher/>)} />
        <Route path = "/viewBranches" exact render = {()=> (<ViewBranch />)} />
        <Route path = "/viewLabs" exact render = {()=> (<ViewLaboratory />)} />
        <Route path = "/viewResults" exact render = {()=>(<Table />)} />
        <Route path = "/viewMenu" exact render = {()=> sidebar} />
      </div>);
  }
}

const mapStateToProps = state =>{
    
  return ({
    auth:state.auth,
    visSidebar:state.visSidebar
  })
}

const mapDispatchToProps = dispatch =>{
   
  return ({
    changeAuth: ()=> {dispatch({type:'changeAuth'})},
    changeVisSidebar:()=>{
      dispatch({type:'changeVisSidebar'})}
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));
