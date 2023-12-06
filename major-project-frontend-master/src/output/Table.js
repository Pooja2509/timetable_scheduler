import React, { Component } from 'react'
import classes from './table.css'
import axios from 'axios'
import Output from './Output'


class Table extends Component {
    state = {
        year:'',
        name:'',
        branch:''
    }

    onChangeYear = (event) => {
        this.setState({
            year:event.target.value
        })
    }


    onChangeBranch = (event) => {
        this.setState({
            name:event.target.value
        })
    }


    onSubmit = () => { 
         let {year,name} = this.state;
         if(!(year.trim().length&&name.trim().length)){
            window.alert('please enter valid data');
            return
         }
         axios.get('http://localhost:8080/v1/branches/0/?year='+ year + '&name='+name)
         .then(res => this.setState({branch:res.data}) )
         .catch(err => window.alert(err.response.data) )
    }



    render(){
        return (
            <div className = {classes.head}> 
                <input onChange = {(event)=>this.onChangeYear(event)} className = {classes.input} placeholder ='year'  />
                <input onChange = {(event)=>this.onChangeBranch(event)} className = {classes.input} placeholder = 'branch' />
                <button className = {classes.button} onClick = {()=>this.onSubmit()} >fetch</button>
                { this.state.branch ? <Output branch = {this.state.branch}></Output>  : null }
            </div>
        )
    }
}


export default Table