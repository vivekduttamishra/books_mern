const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const BookService = require('../../src/services/book.service')
const { NotFoundError, ValidationError } = require('../../src/utils/errors')

chai.use(chaiAsPromised)
const { expect, should } = chai;
should();

describe('BookService', () => {
    // Test cases here
    let bookRepository;
    let authorService;
    let bookService;

    let booksMasterDb = [{
        id: 'book-1',
        title: 'Book 1',
        authorId: 'valid-author-1',
        publicationDate: '2020-01-01'
    },
    {
        id: 'book-2',
        title: 'Book 2',
        authorId: 'valid-author-2',
        publicationDate: '2020-02-01'
    },
    {
        id: 'book-3',
        title: 'Book 3',
        authorId: 'valid-author-1',
        publicationDate: '2020-03-01'
    }
    ]


    beforeEach(() => {
        let booksDb = [...booksMasterDb]
        bookRepository = {
            getAll: sinon.stub(),
            getById: sinon.stub(),
            create: sinon.stub()
        }

        authorService = {
            getAuthorById: sinon.stub()
        }

        bookService = new BookService(bookRepository, authorService);

    })

    afterEach(() => {
        bookRepository.getAll.reset();
        bookRepository.getById.reset();
        bookRepository.create.reset();
        authorService.getAuthorById.reset();
    })

    describe('getAllBooks', () => {

        it('should return all books', async () => {


            bookRepository.getAll.resolves(booksMasterDb);
            let result = await bookService.getAllBooks();

            //ensure bookService got the data from the repository
            sinon.assert.called(bookRepository.getAll);
            result.should.deep.equal(booksMasterDb);
        })

    })

    describe('getById', () => {

        it('should return book by id', async () => {

            bookRepository.getById.resolves(booksMasterDb[0]);
            let result = await bookService.getById('book-1');

            result.should.deep.equal(booksMasterDb[0]);
            bookRepository.getById.callCount.should.equal(1);

        })

        it('should throw NotFoundError for invalid-id', async () => {

            bookRepository.getById.rejects(new NotFoundError('invalid id', 'invalid-d'));

            await expect(bookService.getById('invalid-id')).to.be.rejectedWith(NotFoundError, 'invalid id');
            await expect(bookRepository.getById.callCount).to.equal(1);
        })
    })

    describe('addBook', () => {

        let book;

        beforeEach(() => {
            authorService.getAuthorById.resolves({ id: 'valid-author-1', name: 'Author 1' });
            bookRepository.getById.resolves(null);
            book = {
                title: 'New Book',
                authorId: 'valid-author-1',
                price: 100,
                id: 'new-book'
            }
        })

        it('should add a valid book to the database', async () => {

            bookRepository.create.callsFake(async (x) => x);
            await expect(bookService.addBook(book)).to.eventually.equal(book);

            bookRepository.create.calledOnceWith(book);
            authorService.getAuthorById.callCount.should.equal(1);

        })

        describe('validation failure', () => {



            afterEach(() => {
                bookRepository.create.callCount.should.equal(0); //create shouldn't get called.

            })

            it('should throw ValidationError for missing title', async () => {
                book.id = null;
                book.title = null; //now the title is missing.
                await expect(bookService.addBook(book)).to.be
                    .rejectedWith(ValidationError)
                    .then(error => error.errors.title.should.equal('Required'));

            })

            it('should throw ValidationError for missing authorId', async () => {
                book.authorId = null; //now the authorId is missing.
                await expect(bookService.addBook(book))
                    .to.be
                    .rejectedWith(ValidationError)
                    .then(error => {

                        expect(error.errors.authorId).to.equal('Required')
                    })
            })

            it('should throw ValidationError for invalid authorId', async () => {

                book.authorId = 'invalid-author'; //now the authorId is invalid.
                authorService.getAuthorById.resolves(null); //now the author does not exist.
                await expect(bookService.addBook(book)).to.be.rejectedWith(ValidationError);
            })

            it('should throw ValidationError for existing bookId', async () => {
                book.bookId = 'existing-id'; //now the authorId is invalid.
                bookRepository.getById.resolves({ id: book.bookId, name: 'Existing Book' }); //now the book already exists.


                await expect(bookService.addBook(book)).to.be.rejectedWith(ValidationError);
            })

            it('should throw ValidationError for missing price', async () => {
                book.price = null; //now the price is missing.
                await expect(bookService.addBook(book)).to.be
                    .rejectedWith(ValidationError)
                    .then(error => error.errors.price.should.equal('Required'))
            })

            it('should throw ValidationError for invalid price', async () => {
                book.price = -1; //now the price is invalid.
                await expect(bookService.addBook(book)).to.be
                    .rejectedWith(ValidationError)
                    .then(error => error.errors.price.should.equal('Invalid price'));
            })

        })
    })

})


