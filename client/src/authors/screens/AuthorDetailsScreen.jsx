import { useParams } from 'react-router-dom'
import { AuthorActions, getAuthorById } from '../../stores/author-store';
import { useSelector } from 'react-redux';
import {AsyncContainer} from '../../utils/components/AsyncContainer';

const AuthorDetailsScreen = () => {

    const { id } = useParams();
    const selectedAuthor = useSelector(s => s.selectedAuthor)

    //getAuthorById(id)


    return (
        <AsyncContainer actionId={AuthorActions.AUTHOR_SELECT} 
                        action = {()=>getAuthorById(id)} 
        >
            <div className="author-details-screen">
                <h1>{selectedAuthor?.name}</h1>
                <div className="row">
                    <div className="col col-4">
                        <img src={selectedAuthor?.photo} />
                    </div>
                    <div className="col col-8">
                        <h2>Biography</h2>
                        <p>{selectedAuthor?.biography}</p>
                    </div>
                </div>
            </div>
        </AsyncContainer>
    )
}

export default AuthorDetailsScreen;