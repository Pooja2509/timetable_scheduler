import React from 'react'
import classes from './Popup.css'
import {connect} from 'react-redux'


const popup = (props) => {     

    let text = null
    if(props.statusCode === 201)
    text = 'saved successfully'
    if(props.statusCode === 204)
    text = 'deleted successfully'
    let popup = null
     if(props.statusCode !== '' )
     popup = (<div className = {classes.popup}> <div className = {classes.popupInner}>
      <p>  status: {text?text:props.statusCode}</p>
     <button onClick = {()=> props.closePopup()} className = {classes.button} >Okay</button> 
     </div>  </div>)
    return popup
}

 const mapStateToProps = state => {
     return ({
       statusCode:state.statusCode
     })
 }


 const mapDispatchToProps = dispatch =>{
     
    return({
        closePopup:()=> dispatch({type:'closePopup'})
    })
 }

export default connect(mapStateToProps,mapDispatchToProps)( popup)
