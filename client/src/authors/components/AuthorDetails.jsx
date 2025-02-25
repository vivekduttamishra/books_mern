import Conditional from "../../utils/components/Conditional";
import withBorder from "../../utils/hoc/with-broder";
import { withVisibility } from "../../utils/hoc/with-visibility";
import {withTitleExpander } from "../../utils/components/TitledComponent"

const AuthorDetails = ({selectedAuthor,deleteAuthorById}) => {


    //console.log('selectedAuthor',selectedAuthor);

    return (
    <div className="author-details-screen">
      
            <h1>{selectedAuthor.name}</h1>
            <div className="row">
                <div className="col col-4">
                    <img src={selectedAuthor.photo} />
                    <button onClick={()=>deleteAuthorById(selectedAuthor.id)} className='btn btn-danger'>Remove Author</button>
                </div>
                <div className="col col-8">
                    <h2>Biography</h2>
                    <p>{selectedAuthor.biography}</p>
                </div>
            </div>
    </div>
    )
}

//export default withVisibility( withTitleExpander(AuthorDetails,'Author Details') );

export default withTitleExpander(withVisibility(AuthorDetails),'Author Details')