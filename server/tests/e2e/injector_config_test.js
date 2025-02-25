
const injector = require('../../src/utils/injector');

const JsonAuthorRepository = require('../../src/repositories/json/json-author.repository');
const JsonBookRepository = require('../../src/repositories/json/json-book.repository');

const Author  = require('../../src/repositories/mongoose/models/author.model');
const MongooseAuthorRepository = require('../../src/repositories/mongoose/mongoose-author.repository');

const AuthorService = require('../../src/services/author.service');
const BookService = require('../../src/services/book.service');

const User  = require('../../src/repositories/mongoose/models/user.model');
const MongooseUserRepository = require('../../src/repositories/mongoose/mongoose-user.repository');
const UserService = require('../../src/services/user.service');


injector
    //.addService("authorRepository", JsonAuthorRepository)
    .addServiceObject("author",Author)
    .addService("authorRepository", MongooseAuthorRepository)

    .addServiceObject("user", User)
    .addService("userRepository", MongooseUserRepository)


    .addService("bookRepository", JsonBookRepository)
    .addService("authorService", AuthorService)
    .addService("bookService", BookService)
    .addService('userService', UserService)


//console.log('injector.container',injector.container);

