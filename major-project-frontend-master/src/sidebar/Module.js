import React from 'react'
import {withRouter} from 'react-router'
import classes from './Module.css'
const module = (props) => {
    let children = null
    const routeComponent = ()=>{
        props.history.replace('/'+'add'+props.name)
        props.changeVisSidebar()
    }

    const routeViewComponent = () =>{
        props.history.replace('/'+ 'view' + props.name)
        props.changeVisSidebar()
    }
    if(props.vis){
        children = (<div>
            <button className = {classes.button} onClick = { routeComponent } >add{props.name}</button>
            <button className = {classes.button} onClick = { routeViewComponent } >view{props.name}</button>
            </div>)
    }


     return(
         <div className = {classes.module} >
             <button onClick = {()=> props.changeVisibility(props.type)} 
             className = {classes.button} > {props.name}</button>
             {children} 
         </div>
     )  
}

export default withRouter(module)