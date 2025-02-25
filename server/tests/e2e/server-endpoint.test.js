const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const axios = require('axios')

chai.use(chaiAsPromised)
const { expect, should } = chai;
should();

const baseUrl = 'http://localhost:8000/api'

xdescribe('Book Api Server Tests', () => {

    let url = `${baseUrl}/books`

    describe('GET /books', () => {
        it('should fetch all books', async () => {
            let response = await axios.get(url);

            //should be successful with status 200
            response.status.should.equal(200);

            //response should be a non empty array of books
            let data = response.data;

            data.should.be.an('array').and.have.length.greaterThan(0);

            data.filter(b => b['title']).length.should.have.length.equal(data.length);

        });
    })

    describe('GET /books/:id', () => {
        it('should fetch a book by id', async () => {
            let response = await axios.get(`${url}/the-accursed-god`);
            response.status.should.equal(200);
            let data = response.data;
            data['title'].should.equal('The Accursed God');
        })
        it('should return 404 for invalid id', async () => {
            // let response = await axios.get(`${url}/invalid-id`);
            // response.status.should.equal(404);

            await expect(axios.get(`${url}/invalid-id`))
                    .to.be.rejected
                    .then(response=>{
                        response.status.should.equal(404);
                    })

        })
    })
})