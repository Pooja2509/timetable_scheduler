import React,{Component} from 'react'
import classes from './Auth.css'
import App from '../App'
import {connect} from 'react-redux'

class Auth extends Component{

    state = {
        userName:'',
        password:''
    }


    onchange = (event,part) =>{
        this.setState({
            [part]:event.target.value
        })
    }

    onSignIn = ()=>{
           if(!(this.state.userName==='schedule@nith.com'&&this.state.password==='majorProject@CSE'))
           window.alert('error code: 401 : unauthorized')
           else
           this.props.changeAuth();
    }

    render(){
       
    let auth =null 
    if(this.props.auth){
    auth = <App></App>
    console.log("you are doing wrong") 
    }
    else
    auth = (<div className = {classes.auth}>
            <img src="https://img.icons8.com/bubbles/100/000000/cloud-account-login-male.png" alt='user icon'></img>                
            <br/>
            <label>UserName: <input onChange = {(event)=>this.onchange(event,'userName')} 
            className={classes.input} />
            </label>
            <br/>
            <label>Password: <input type='password' onChange = {(event)=>this.onchange(event,'password')} 
            className={classes.input} /> </label>
            <br/>
            <button className = {classes.button} onClick= {()=>this.onSignIn()}>SignIn</button>
        </div>) 
        return auth
    }


}

const mapStateToProps = state => {

    return ({
        auth:state.auth
    })
}

const mapDispatcToProps = dispatch =>{
    return ({
        changeAuth:()=>{dispatch({type:'changeAuth'})}
    })
}

export default connect(mapStateToProps,mapDispatcToProps)(Auth)