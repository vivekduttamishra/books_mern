const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const fs = require('fs')

const JsonBookRepository = require('../../../src/repositories/json/json-book.repository')

const { NotFoundError } = require('../../../src/utils/errors')


chai.use(chaiAsPromised)
const { expect, should } = chai;
should();

const filePath = 'dummy_path.json';

describe('JsonBookRepository', () => {

    const db = [
        { id: 'book-1', title: 'Book 1' },
        { id: 'book-2', title: 'Book 2' }
    ]

    let bookRepository;
    let readFileSyncStub;
    let writeFileSyncStub;


    beforeEach(() => {
        readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(JSON.stringify(db));
        writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
        bookRepository = new JsonBookRepository(filePath);
    })

    afterEach(() => {
        readFileSyncStub.restore();
        writeFileSyncStub.restore();
    })

    describe('constructor()', () => {

        it('should create an empty respository for non-existing file path', () => {

            //studb to throw error
            readFileSyncStub.throws(new Error());
            let repository = new JsonBookRepository('invalid_path.json');
            expect(repository.data).to.deep.equal([]);
        })

        it('should load data from existing file path', () => {

            let repository = new JsonBookRepository(filePath);
            expect(repository.data).has.length(db.length);
        })

    })

    describe('getAll()', () => {

        it('should return all books', async () => {
            await expect(bookRepository.getAll()).to.eventually.deep.equal(db);
        })

    })

    describe('getById()', () => {

        it('should return a valid book with valid id', async () => {
            let id = db[0].id; //this is a valid id in the system.
            let book = await bookRepository.getById(id);
            expect(book).to.not.be.null;
            book.should.deep.equal(db[0]);
        })

        it('should fail with NotFoundError for invalid id', async () => {
            await expect(bookRepository.getById('invalid_id'))
                .to.be
                //.rejectedWith('Invalid ID');
                //.rejectedWith(NotFoundError, 'Invalid ID')
                .rejectedWith(NotFoundError)

        })

    })

    describe('create()', () => {
        it('should create a new book', async () => {
            let newBook = {
                id: 'new-book-id',
                title: 'New Book Title',
                author: 'New Author Name',
                publicationYear: 2022
            }

            //the new book is saved
            let _data;
            writeFileSyncStub.callsFake((path, data) => _data = JSON.parse(data));

            //make sure readfile sync is called
            await bookRepository.create(newBook);

            //writefile sync has been called
            expect(writeFileSyncStub.callCount).to.equal(1);
           
            expect(_data).to.deep.equal([...db, newBook]);



        })
    })

});