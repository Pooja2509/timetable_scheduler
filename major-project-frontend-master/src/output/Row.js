import React from 'react'
import classes from './Output.css'

const row = (props)=>{
    console.log(props.schedules)
    let schedule
    let structure = [[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]]
    let visited = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],
    [false,false],[false,false],[false,false],[false,false]]
    for(schedule of props.schedules){
        for(let i=schedule.from;i<=schedule.to;i++){
            if(schedule.group === 0){
                structure[i][0] = 0
                structure[i][1] = 0

            }
            else if(schedule.group ===1){
                structure[i][0] = 1
            }
            else if(schedule.group === 2){
                structure[i][1] = 2
            }
        }
    }

    let arr = [0,1,2,3,4,5,6,7,8,9]

    let rows =[0 , 1]

    return (
        rows.map(row=>{
          if(row==0)
          return (<tr>
              <td  className = {classes.td} rowspan = {2}>{props.row}</td>
              {arr.map(index=>{
                  if((structure[index][0] == -1&&structure[index][1] == -1)){
                    visited[index][0] =true
                    visited[index][1] = true
                    return <td key = {index} className = {classes.td} rowspan = {2}> {'break'}</td>
                }
                else if(structure[index][0] == -1)
                     return <td key = {index} className = {classes.td} rowspan = {1}> {'break'}</td>
                else if((structure[index][0] === 0 && structure[index][1] === 0
                    &&visited[index][0] === false&&visited[index][1]=== false)){
                        let schedule,x
                        for(x of props.schedules){
                        if(x.group === 0 && x.from === index ){
                            schedule =x;
                            break;
                        }
                    }
                    for(let i=schedule.from;i<=schedule.to;i++){
                        visited[i][0] = true
                        visited[i][1]=  true
                    }
                    return (<td key = {index} className = {classes.td} rowspan = {2} colspan = {schedule.to-schedule.from+1} >
                        {schedule.courseCode}<br />
                        {schedule.room}<br/>{schedule.teachers}
                        </td>)}
                else if(structure[index][0] ===1 &&visited[index][0] === false){
                    let schedule,x
                    for(x of props.schedules){
                        if(x.group === 1 && x.from === index ){
                            schedule =x;
                            break;
                        }
                    }
                    for(let i=schedule.from;i<=schedule.to;i++){
                    visited[i][0] = true
                    }   
                    return (<td key = {index} className = {classes.td} rowspan = {1} colspan = {schedule.to-schedule.from+1}>
                         {schedule.courseCode}<br />
                            {schedule.room}<br/>{schedule.teachers}
                     </td>)
                }  
                else if(structure[index][0] === -1&& visited[index][0] ==false) {
                    visited[index] = true   
                    return (<td key = {index} className = {classes.td} rowspan = {1}></td>)
                }
            })}
        </tr>)
        else 
        return (<tr> {arr.map(index=>{
            if(structure[index][1]===-1&&visited[index][1] === false)
            return <td key = {index} className = {classes.td} rowspan = {1}></td>
            if(structure[index][1] === 2 && visited[index][1] === false){
                let schedule,x
                for(x of props.schedules){
                    if(x.group === 2 && x.from === index ){
                        schedule =x;
                        break;
                        }

                    }
                    if(!schedule)
                    return null
                    for(let i=schedule.from;i<=schedule.to;i++){
                        visited[i][1] = true
                        return <td key = {index} className = {classes.td} rowspan = {1} colspan = {schedule.to-schedule.from+1}>
                        {schedule.courseCode}<br />
                        {schedule.room}<br/>
                        {schedule.teachers}
                        </td>
                    }
                }
            return null
            })}
        </tr>)}
    ))  
}

export default row;