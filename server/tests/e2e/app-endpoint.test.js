require('dotenv').config()
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const supertest = require('supertest')
require('./injector_config_test')
const app = require('../../src/app')  //this is what we will test
//const db = require('./test_connect');
const {MongoMemoryServer} = require('mongodb-memory-server')
const injector = require('../../src/utils/injector')
const mongoose = require('mongoose')

chai.use(chaiAsPromised)
const { expect, should } = chai;
should();


const authors = [
    {
        "id": "gandhi",
        "name": "Mahatma Gandhi",
        "biography": "The Father of the nation, freedom fighter, social reformer and acknolwedged greatest man of the century",
        tags: ["politics", "social revolution"]
    },
    {
        "id": "nehru",
        "name": "Jawahar Lal Nehru",
        "biography": "The first Prime Minister of India and the best seller author of The Discovery of India, and Glimpses of World Hisotry",
        tags: ["politics", "India", "Prime Minister"]
    }

]

describe.only('BookApiApp', () => {
    let mongodb;
    let uri;
 

    before(async()=>{
        mongodb = await MongoMemoryServer.create();  //run the server  
        uri = mongodb.getUri();
        await mongoose.connect(uri);     //connect to the database.
        console.log('Database connection established');
    })

    after(async() => {
        //db.close();
        await mongoose.disconnect();       
        mongodb.stop();       
        console.log('Database connection closed');
    })

    beforeEach(async () => {
        //dele
        let Author = injector.getService('author')
        //delete all authors from Author model
        await Author.deleteMany({})
        //insert test authors
        await Author.insertMany(authors)
    })
    let testServer;
    beforeEach(async () => {
        //testServer = supertest(app);
    })

    describe('Get /api/authors', () => {
        it('should return all authors', async () => {
            supertest(app)
                .get('/api/authors')
                .expect(200)
                // .then(response => {
                //     response.body.should.deep.equal(authors);
                // })


        })
    })

    describe('GET /api/authors/:id', () => {

        it('should return a valid author with valid id', async () => {
            let author = authors[0]
            supertest(app)
                .get(`/api/authors/${author.id}`)
                .expect(200)
                .then(response => {
                    response.body.should.deep.equal(author);
                })
        })

        it('should fail with NotFoundError for invalid id', async () => {
            supertest(app)
               .get('/api/authors/invalid_id')
               .expect(404)
            //    .then(response => {
            //         response.body.should.deep.equal({ error: 'Author not found' });
            //     })
        })
    })



})