


export const actionCreator= (actionId, action)=> {

   // console.log('action in action creator',action);
    

    return {type:actionId, payload:action}
}

/* action map

    const actionMap={
        "AUTHORS": (state,action)=>{},
        "AUTHOR_SELECT":(state,action)=>{}
    }

*/

export const createReducer=( reducerMap, defaultState=null)=>{


    return (state=defaultState, action) => {
        if(reducerMap[action.type])
            return reducerMap[action.type](state, action)
        else
            return state; //default use case.
    }
}