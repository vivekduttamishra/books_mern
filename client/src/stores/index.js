import { userReducer } from './user-store'
import { AuthorActions, authorsReducer, selectedAuthorReducer } from './author-store'
import { statusReducer } from './status-store'
import { combineReducers } from 'redux'
import { logActions,promisedPayload } from '../utils/redux-middlewares'
import { configureStore, Tuple } from '@reduxjs/toolkit'




const reducer = combineReducers({
    authors: authorsReducer,
    selectedAuthor: selectedAuthorReducer,
    user: userReducer,
    status: statusReducer,  // This is for status management.
})


export default configureStore({
  reducer,
  middleware: () => new Tuple(
    logActions( AuthorActions.AUTHOR_DELETE),
    promisedPayload
  ),
})

