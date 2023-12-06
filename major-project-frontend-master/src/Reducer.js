let initialState = {
    auth:false,
    showLoader:false,
    visSidebar:false,
    statusCode:'',
}

const reducer = (state = initialState,action)=>{
     switch(action.type){
         case 'changeAuth':
             return ({...state,auth:!state.auth})
         case 'changeVisSidebar':
             return ({...state,visSidebar:!state.visSidebar})
        case 'closePopup':
            return ({...state,statusCode:''})   
        case 'showPopup':
            return ({...state,statusCode:action.payload})          
        case 'showLoader':
            return ({...state,showLoader:true})
        case 'closeLoader':
            return ({...state,showLoader:false})    
         default :
         return state
     }

}

export default reducer