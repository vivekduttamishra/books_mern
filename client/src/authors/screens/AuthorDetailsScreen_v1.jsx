import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../../utils/components/Loading'
import NotFound from '../../utils/components/NotFound';
import { AuthorActions, getAuthorById } from '../../stores/author-store';
import { useDispatch, useSelector } from 'react-redux';
import { useStatus } from '../../stores/status-store';


const AuthorDetailsScreen=()=>{

    const {id}= useParams();
    const selectedAuthor = useSelector(s=>s.selectedAuthor)
    

    const status = useStatus(AuthorActions.AUTHOR_SELECT);
    const dispatch = useDispatch();

    useEffect(()=>{
    
        getAuthorById(id)(dispatch);
    
    },[id])    
  

    if(status.status==='pending')
        return <Loading />;


    else if(status.status==='error'){
        
        if(status.error.message.includes('Network Error')){
            return <h2>Network Error</h2>
        } else if(status.error.response.status===404)
            return <NotFound message={`Invalid Author: ${id}`}/>
        else
            return <h2>Unknown Error: {status.error.response.status}</h2>
  
    }


    return (
        <div className="author-details-screen">
            <h1>{selectedAuthor.name}</h1>   
            <div className="row">
                <div className="col col-4">
                    <img src ={selectedAuthor.photo}/>
                </div>
                <div className="col col-8">
                    <h2>Biography</h2>
                    <p>{selectedAuthor.biography}</p>
                </div>
            </div>         
        </div>
    )
}

export default AuthorDetailsScreen;