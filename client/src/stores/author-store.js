import AuthorService from "../authors/services/AuthorService";
import delay from '../utils/delay';
import { actionCreator, createReducer } from "../utils/redux-utils";
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


const  authorsReducerMap={
    AUTHORS: (authors,{payload})=>payload,
    AUTHOR_ADD: (authors,{payload})=>authors.contact(payload),
    AUTHOR_DELETE: (authors,{payload})=>authors.filter(a=>a.id!==payload),
    AUTHOR_UPDATE: (authors,{payload})=> authors.map( a=> a.id===payload.id,payload,a),   
}

export const authorsReducer = createReducer(authorsReducerMap,[]);

export const selectedAuthorReducer = createReducer({
    [AuthorActions.AUTHOR_SELECT]: (author,{payload})=> payload,
    [AuthorActions.AUTHOR_UNSELECT]: ()=>null,
    [AuthorActions.AUTHOR_DELETE]: (author,{payload})=> author.id===payload?null:author
})



//Action Creators

export const getAllAuthors = () => (

    {
        type:AuthorActions.AUTHORS, 
        payload:authorService.getAll()
    }
)



export const getAuthorById = id => actionCreator(AuthorActions.AUTHOR_SELECT, authorService.getById(id))

export const deleteAuthorById= (id)=> actionCreator(AuthorActions.AUTHOR_DELETE, authorService.removeById(id))

export const addAuthor= (author)=> actionCreator(AuthorActions.AUTHOR_ADD, authorService.addAuthor(author))
   