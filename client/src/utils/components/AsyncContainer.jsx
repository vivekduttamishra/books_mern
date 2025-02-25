import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading";
import ErrorView from './ErrorView';


export const AsyncContainer = ({ actionId, action, children }) => {


    let status = useSelector(s => s.status[actionId]);
    let dispatch = useDispatch()

    useEffect(() => {
        //action()(dispatch)
        dispatch(action());

    }, [])

    


    if (!status || status.status === "pending")
        return <Loading />

    if (status.status === 'error') 
        return <ErrorView error={status.error} />

    return children;


}

