import { useEffect } from 'react'
import Loading from '../../utils/components/Loading';
import { Link } from 'react-router-dom'
import TitledComponent from '../../utils/components/TitledComponent';
import withBorder from '../../utils/hoc/with-broder';

import { useDispatch, useSelector } from 'react-redux';

import AuthorService from '../services/AuthorService';
import { AuthorActions, getAllAuthors } from '../../stores/author-store';

//let authorService = new AuthorService();
// async function getAllAuthors(dispatch){
//     //let dispatch = useDispatch();
//     let authors=await authorService.getAll();
//     dispatch({type:AuthorActions.AUTHORS, payload:authors});
// }


const AuthorListScreen = () => {

    let authors = useSelector(s => s.authors);
    
    
    let status = useSelector(s => s.status[AuthorActions.AUTHORS]);
    let dispatch = useDispatch();

    useEffect(() => {
        
        getAllAuthors()(dispatch)


    }, []);


    if (!status || status.status === "pending")
        return <Loading />

    if (status.status === "error") {
        console.error('error', status.error);
        return (
            <div>
                <h2>Some Error Occured: {status.error.message}</h2>
                <button 
                onClick={()=>getAllAuthors()(dispatch)}
                className="btn btn-primary">Retry</button>
            </div>
        )
    }


    
    return (
        <TitledComponent title="Author List" expandable={true} >
            <div className="author-list-screen">

                <div className="row">
                    {
                        authors.map(author => (
                            <div className=" author-card card col col-12 col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={author.id}  >
                                <img src={author.photo} className="card-img-top" alt={author.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{author.name}</h5>
                                    <p className="card-text">{author.biography?.substring(0, 50)}</p>

                                    <Link to={`/authors/${author.id}`} className="btn btn-primary">Details</Link>


                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </TitledComponent>
    )
}

export default AuthorListScreen;