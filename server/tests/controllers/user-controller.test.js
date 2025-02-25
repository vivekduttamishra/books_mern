const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const { NotFoundError, ValidationError } = require('../../src/utils/errors')
const injector = require('../../src/utils/injector')
//const userController = require('../../src/controllers/user.controller')
const createUserController = require('../../src/controllers/user.controller');


chai.use(chaiAsPromised)
const { expect, should } = chai;
should();


describe('UserController', () => {

    let userService;
    let injectorStub;
    let userController;
    
    beforeEach(() => {
        userService = {
            login: sinon.stub()
        }

        injectorStub = sinon.stub(injector, 'getService').returns(userService);
        userController = createUserController();
    
    })

    afterEach(() => {
        injectorStub.restore();
        userService.login.reset();
    })



    describe('login',()=>{

        it('controller should pass email and password to service.login', async ()=>{
            await userController.login({body: {email: 'test@email.com', password: 'password'}})

            sinon.assert.calledWith(userService.login, {email: 'test@email.com', password: 'password'})            
        })

        it('controller should return object returned by service.login', async ()=>{
            
            let user= {name: 'John Doe',email:'john@example.com'}
            userService.login.resolves(user)

            await expect(userController.login({body: {email: 'test@email.com', password: 'password'}})).to.eventually.equal(user)


        })

        it('controller should reject errors rejected by service.login', async ()=>{

            userService.login.rejects(new ValidationError('Invalid User Credentials'))

            await expect(userController.login({body: {email: 'test@email.com', password: 'password'}})).to.be.rejectedWith(ValidationError, 'Invalid User Credentials')

        })


    })


})