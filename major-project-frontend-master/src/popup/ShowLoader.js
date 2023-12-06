import React from 'react'
import classes from './Popup.css'
import {connect} from 'react-redux'
const showLoader = (props)=> {
    console.log('hi')
    let comp = null
    console.log(props)
    if(props.showLoader)
    comp = (<div className = {classes.popup}>
        <div className = {classes.loader} ></div>
    </div>)
    return comp
}

const mapStateToProps = state => {
    return ({
        showLoader :  state.showLoader 
    })
}

export default connect(mapStateToProps,null)(showLoader);