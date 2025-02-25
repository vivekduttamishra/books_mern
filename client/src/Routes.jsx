import BookListScreen from './books/screens/BookListScreen'
import AuthorListScreen from './authors/screens/AuthorListScreen'
import AuthorAddScreen from './authors/screens/AuthorAddScreen'
import AuthorDetailsScreen from './authors/screens/AuthorDetailsScreen'
import BookAddScreen from './books/screens/BookAddScreen'
import BookDetailsScreen from './books/screens/BookDetailsScreen'
import UserLoginScreen from './users/screens/UserLoginScreen'
import UserRegistrationScreen from './users/screens/UserRegistrationScreen'


const routes={
    "book-list-screen": <BookListScreen/>,
    //"book-add-screen": <BookAddScreen/>,
    "book-details-screen": <BookDetailsScreen/>,
    "author-list-screen": <AuthorListScreen/>,
    "author-add-screen": <AuthorAddScreen/>,
    "author-details-screen": <AuthorDetailsScreen/>,
    "user-login-screen": <UserLoginScreen/>,
    "user-registration-screen": <UserRegistrationScreen/>,
}

export default routes;