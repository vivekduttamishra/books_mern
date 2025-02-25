import AuthorService from "../authors/services/AuthorService";
import delay from '../utils/delay';
import { actionCreator } from "../utils/redux-utils";
import { createStatus, setStatus } from "./status-store"

const authorService = new AuthorService();

//actions that we will use.
export const AuthorActions = {
    AUTHORS: "AUTHORS",
    AUTHOR_SELECT: "AUTHOR_SELECT",
    AUTHOR_ADD: "AUTHOR_ADD",
    AUTHOR_DELETE: "AUTHOR_DELETE",
    AUTHOR_UPDATE: "AUTHOR_UPDATE",
    AUTHOR_UNSELECT: "AUTHOR_UNSELECT"
}

export const authorsReducer = (authors = [], action) => {
    switch (action.type) {
        case AuthorActions.AUTHORS: //setting a new list of authors
            return action.payload;

        case AuthorActions.AUTHOR_ADD: //add new author to existing list
            return [...authors, action.payload]


        case AuthorActions.AUTHOR_DELETE: //{ type:'AUTHOR_DELETE', payload: 'jeffrey-archer'}
            return authors.filter(a => a.id !== action.payload)

        case AuthorActions.AUTHOR_UPDATE: //updating an author
            return authors.map(a => a.id === action.payload.id ? action.payload : a)

        default:
            return authors;
    }

}

export const selectedAuthorReducer = (author = null, action) => {
    switch (action.type) {
        case AuthorActions.AUTHOR_SELECT:
            return action.payload;

        case AuthorActions.AUTHOR_DELETE:
            if (author?.id === action.payload)
                return null;
        case AuthorActions.AUTHOR_UNSELECT:
            return null;
    }
    return author;
}




//Action Creators

export const getAllAuthors = () => (

    {
        type:AuthorActions.AUTHORS, 
        payload:authorService.getAll()
    }
)



export const getAuthorById = id => actionCreator(AuthorActions.AUTHOR_SELECT, authorService.getAuthorById(id))

export const deleteAuthorById= (id)=> actionCreator(AuthorActions.AUTHOR_DELETE, authorService.removeById(id))

export const addAuthor= (author)=> actionCreator(AuthorActions.AUTHOR_ADD, authorService.addAuthor(author))
   