import { Link } from 'react-router-dom'
import TitledComponent from '../../utils/components/TitledComponent';
import { useSelector } from 'react-redux';
import { AuthorActions, getAllAuthors } from '../../stores/author-store';
import {AsyncContainer} from '../../utils/components/AsyncContainer';


const AuthorListScreen = () => {

    let authors = useSelector(s => s.authors);
    console.log('authors in authorslist screen',authors)
    return (
        <AsyncContainer actionId={AuthorActions.AUTHORS} 
                        action={getAllAuthors}>
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
        </AsyncContainer>
    )
}

export default AuthorListScreen;