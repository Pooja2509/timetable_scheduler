import React from 'react'
import classes from './Output.css'
import Row from './Row'
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import td from '@material-ui/core/td';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import tr from '@material-ui/core/tr';
// import Paper from '@material-ui/core/Paper';


const output  = (props) => {

    let branch = props.branch
    let arr = [0,1,2,3,4,5,6,7,8,9]

        let schedules = []

        schedules =[]
        var subjectEntity
        var schedule
        for(subjectEntity of branch.subjectEntities){
           for(schedule of subjectEntity.scheduleSet){
               schedules.push({
                day:schedule.day,
                from:schedule.from,
                to:schedule.to,
                group:schedule.group,
                courseCode:subjectEntity.courseCode,
                room:subjectEntity.roomId,
                teachers: subjectEntity.teacherIdsSet.map(teacherId=>(teacherId.teacherId))
            })
           }
        }

        for(subjectEntity of branch.labEntities){
            for(schedule of subjectEntity.scheduleSet){
                schedules.push({
                 day:schedule.day,
                 from:schedule.from,
                 to:schedule.to,
                 group:schedule.group,
                 courseCode:subjectEntity.courseCode,
                 room:subjectEntity.laboratoryId,
                 teachers: subjectEntity.teacherIdsSet.map(teacherId=>(teacherId.teacherId))
             })
            }
         }


    schedules.sort((a,b)=>{ 
        if(a.day>b.day)
        return 1;
    else if(a.day<b.day)
        return -1;
    else {
        if(a.from >b.from)
            return 1;
        else if(a.from<b.from)
            return -1;
        else
            return 1;
    }})
    
   let finalSchedules = []
  const rows = ['mon','Tue','wed','thu','fri']
   finalSchedules = rows.map((row,index)=>{
        return (schedules.filter(schedule => (schedule.day == index)))
   })

    const columns = ['8.00-9.00','9.00-10.00','10.00-11.00','11.00-12.00','12.00-1.00',
           '1.00-2.00','2.00-3.00','3.00-4.00','4.00-5.00','5.00-6.00']    
    columns.unshift(branch.year + '\n' + branch.name)
   
    return(
        <div className = {classes.align}>
        <table className = {classes.table}> 
             <thead><tr>{columns.map(slot=> <td key ={slot} className = {classes.td} colspan = {1}>
                {slot}</td> )}
            </tr></thead>
            <tbody>
               {rows.map((row,index) => (<Row key = {index} schedules = {finalSchedules[index]} row = {row}></Row>))}
               </tbody>    
        </table></div>)
}


export default output