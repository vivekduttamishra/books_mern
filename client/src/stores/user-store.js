import { setStatus } from "./status-store";
import delay from "../utils/delay";

export const UserActions = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT'
}

export const userReducer = (user=null, action)=>{
    switch(action.type){
        case UserActions.USER_LOGIN:
            return action.payload;
        case UserActions.USER_LOGOUT:
            return null;
        default:
            return user;
    }
}


export const login=async(dispatch,email,password)=>{

    setStatus(dispatch, UserActions.LOGIN, "pending");
    await delay(2000);
    if(email.endsWith("@books.org") && password.endsWith("@books.org")){
        setStatus(dispatch, UserActions.LOGIN, "success");
        dispatch({type: UserActions.USER_LOGIN, payload: {email, password}});
    }
    else{
        setStatus(dispatch, UserActions.LOGIN, "error", { code: 401, message: "Invalid credentials" });
        dispatch({type: UserActions.USER_LOGOUT});
    }
    
}

export const logout=async(dispatch)=>{
    
    dispatch({type: UserActions.USER_LOGOUT});
}