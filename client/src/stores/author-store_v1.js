import AuthorService from "../authors/services/AuthorService";
import delay from '../utils/delay';
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

export const getAllAuthors = () => async(dispatch)=>{

    try {
        dispatch(createStatus(AuthorActions.AUTHORS, "pending"))
        let authors = await authorService.getAll();
        dispatch({ type: AuthorActions.AUTHORS, payload: authors }) //result
        dispatch(createStatus(AuthorActions.AUTHORS, "success")) //success status
    } catch (error) {
        dispatch(createStatus(AuthorActions.AUTHORS,"error",error))
    }
}

export const getAuthorById = (id) => async (dispatch) => {

    const actionId= AuthorActions.AUTHOR_SELECT;
    try{
        dispatch(createStatus(actionId, "pending"))
        let author = await authorService.getById(id);
        dispatch({ type: actionId, payload: author })
        dispatch(createStatus(actionId, "success"))
    }catch(error){
        dispatch(createStatus(actionId, "error", error))
    }
}

export const deleteAuthorById= (id)=> async (dispatch)=>{
    const actionId= AuthorActions.AUTHOR_DELETE;
    try{
        dispatch(createStatus(actionId, "pending"))
        await authorService.removeById(id);
        dispatch({ type: actionId, payload: id })
        dispatch(createStatus(actionId, "success"))
    }catch(error){
        dispatch(createStatus(actionId, "error", error))
    }
}

export const addAuthor= (author)=> async (dispatch)=>{

    const actionId= AuthorActions.AUTHOR_ADD;
    try{
        dispatch(createStatus(actionId, "pending"))
        let newAuthor = await authorService.addAuthor(author);
        dispatch({ type: actionId, payload: newAuthor })
        dispatch(createStatus(actionId, "success"))
    }catch(error){
        dispatch(createStatus(actionId, "error", error))
    }
}

