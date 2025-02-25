import { userReducer } from './user-store'
import { AuthorActions, authorsReducer, selectedAuthorReducer } from './author-store'
import { statusReducer } from './status-store'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { logActions,promisedPayload,thunkCopyCat } from '../utils/redux-middlewares'
import {thunk} from 'redux-thunk'


const reducer = combineReducers({
    authors: authorsReducer,
    selectedAuthor: selectedAuthorReducer,
    user: userReducer,
    status: statusReducer,  // This is for status management.
})

export default createStore(
    reducer,
    applyMiddleware(
        logActions( AuthorActions.AUTHOR_DELETE),
        thunkCopyCat,
        promisedPayload
    ));