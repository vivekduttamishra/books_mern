import { useState,useEffect } from "react";


export const withTime=(Target)=>{

    return (props)=>{
        const [time,setTime]=useState(new Date());
        useEffect(()=>{

            const iid=setInterval(()=>{
                setTime(new Date());
            },1000);

            return ()=>{
                clearInterval(iid);
            }

        },[])



        return <Target {...props} time={time} />
    }


}