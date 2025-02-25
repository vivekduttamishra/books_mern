import { useEffect } from "react";
import AuthorDetails from "../components/AuthorDetails";
import TitledComponent, { withTitleExpander } from "../../utils/components/TitledComponent";

import AuthorList from "../components/AuthorList";
import { withTime } from "../../utils/hoc/with-date";

const AuthorManageScreen = ({time}) => {

    const { authors, selectedAuthor, getAllAuthors,getAuthorById,deleteAuthorById } = {}

    useEffect(() => {
        getAllAuthors();
    }, [])
    
    return (
            <div className="row author-manage-screen">
                
                <div className="col col-4 author-manage-list">
                    {time.toLocaleTimeString()}
                    <AuthorList authors={authors} 
                                getAuthorById={getAuthorById} 
                                selectedAuthor={selectedAuthor} />
                </div>
                <div className="col col-8 author-manage-details">
                    <AuthorDetails 
                                visibility={selectedAuthor}
                                selectedAuthor={selectedAuthor} 
                                deleteAuthorById={deleteAuthorById} />
                </div>
            </div>
    )
}

export default withTime( withTitleExpander( AuthorManageScreen, 'Author Management Console'));