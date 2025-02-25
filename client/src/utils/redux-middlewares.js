

//create a logger middleware for redux

import { createStatus } from "../stores/status-store";

export const reduxLogger = store=> next=> action =>{

    console.log(`action`,action, store.getState())

    //IMPORTANT to make other middleware work!
    next(action);

}


export const  logActions = (...actions) => store=> next => action =>{

    if(actions.includes(action.type)){
        console.log(`action`,action, store.getState())
    }

    next(action);
}

export const thunkCopyCat = store=>next=>action=>{


    if(typeof(action) ==='function'){

        //run the function with dispatch and state
        action(store.dispatch, store.getState); //we can pass additional argument
    
        return ; //can't send to next middleware
    
    } else{
        return next(action);
    }

}

export const promisedPayload = store=>next=>action=>{
    if(action.payload instanceof Promise){
        //I am born to solve this problem.
        store.dispatch(createStatus(action.type, "pending"));
        action
            .payload
            .then(realPayload =>{
                store.dispatch({ type: action.type, payload: realPayload });
                store.dispatch(createStatus(action.type, "success"));
            })
            .catch(error => {
                store.dispatch(createStatus(action.type, "error",error));
            });

    }else{
        next(action) //not for me
    }
}
