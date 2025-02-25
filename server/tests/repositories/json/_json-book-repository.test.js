const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const JsonBookRepository = require('../../../src/repositories/json/json-book.repository')
const path=require('path')
const {NotFoundError}=require('../../../src/utils/errors')
const fs=require('fs')


chai.use(chaiAsPromised)
const {expect,should} = chai;
should();

const masterFilePath=path.join(process.cwd(), '/tests/repositories/json/books-test-master.json');
const filePath= '/tests/repositories/json/books-test.json';
console.log('filePath',filePath);

describe('JsonBookRepository V1', () => {

    let bookRepository;

    beforeEach(()=>{
        let testFile = path.join(process.cwd(), filePath);
        if(fs.existsSync(testFile)){
            fs.rmSync(testFile);

        }
        fs.copyFileSync(masterFilePath, testFile);
    })

    beforeEach(()=>{
        bookRepository = new JsonBookRepository(filePath);
    })

    describe('constructor()',()=>{

        it('should create an empty respository for non-existing file path', ()=>{
            let repository = new JsonBookRepository('invalid_path.json');
            expect(repository.data).to.deep.equal([]);
        })

        it('should load data from existing file path', ()=>{
            
            let repository = new JsonBookRepository(filePath);
            expect(repository.data).has.length(5);
        })

    })

    describe('getAll()',()=>{

        it('should return all books', async ()=>{
           await expect(bookRepository.getAll()).to.eventually.have.length(5);
        })

    })

    describe('getById()',()=>{

        it('should return a valid book with valid id', async()=>{
            let id = 'the-accursed-god'; //this is a valid id in the system.
            let book = await bookRepository.getById(id);
            expect(book).to.not.be.null;
            book.id.should.equal(id);
        })

        it('should fail with NotFoundError for invalid id', async()=>{
            await expect(bookRepository.getById('invalid_id'))
                        .to.be
                        //.rejectedWith('Invalid ID');
                        //.rejectedWith(NotFoundError, 'Invalid ID')
                        .rejectedWith(NotFoundError)
                       
        })

    })

    describe('create()',()=>{
        it('should create a new book', async()=>{
            let newBook = {
                id: 'new-book-id',
                title: 'New Book Title',
                author: 'New Author Name',
                publicationYear: 2022
            }
            let createdBook = await bookRepository.create(newBook);
            createdBook.id.should.equal('new-book-id');
            expect(bookRepository.data).to.include(createdBook);
        })
    })

});