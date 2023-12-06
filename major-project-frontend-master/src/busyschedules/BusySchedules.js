import React from 'react'
import BusySchedule from './BusySchedule'
const busySchedule = (props)=>{
   let busySchedules=props.busySchedules.map((busySchedule,index)=> 
       (<BusySchedule key={index} busySchedule={busySchedule} 
        onDelClick= {()=>props.onDelClick(index)}
        index = {index}
        onchange = {(event,index,part)=>props.onchange(event,index,part)} />)
   )
   return busySchedules;
}

export default busySchedule;