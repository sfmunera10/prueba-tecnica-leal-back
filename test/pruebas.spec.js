const chai = require('chai');
const chaiHttp = require('chai-http');
const md5 = require('md5');
const createTransactionMicroService = require('../microservices/createTransaction');
const deactivateTransactionMicroService = require('../microservices/deactivateTransaction');
const excelExportMicroService = require('../microservices/excelExport');
const totalPointsSearchMicroService = require('../microservices/totalPointsSearch');
const transactionHistoryMicroService = require('../microservices/transactionHistory');
const userLoginMicroService = require('../microservices/userLogin');
const userRegisterMicroService = require('../microservices/userRegister');
const should = chai.should();
chai.use(chaiHttp);
let sampleToken = '';
  describe('/Register existing user', () => {
    it('it should try to register an existing user and return 400 (wrong) status', (done) => {
      let user = {
        user_id: md5('234@234.com'),
        created_date: new Date(),
        name: 'Already',
        lastname: 'Exists',
        birth_date: new Date(),
        email: '234@234.com',
        password: 'jajaja'
      }
      chai.request(userRegisterMicroService)
      .post('/users/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      done();
      });
    }).timeout(10000);
  });
  describe('/Sign in existing user', () => {
      it('it should sign in a user successfully', (done) => {
          let user = {
            email: '234@234.com',
            password: 'jajaja'
          }
          chai.request(userLoginMicroService)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            sampleToken = res.body.token;
            done();
          });
      }).timeout(10000);
  });
  describe('/POST Transaction', () => {
      it('it should POST a new Transaction successfully', (done) => {
          let transaction = {
            value: 124.7,
            points: 120,
          }
          chai.request(createTransactionMicroService)
          .post('/transactions/create')
          .set('Authorization', 'Bearer '+ sampleToken)
          .send(transaction)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('value');
            res.body.should.have.property('points');
            done();
          });
      }).timeout(10000);
  });
  describe('/GET total points', () => {
      it('it should GET the total sum of points from all active transactions that belong to a user', (done) => {
            chai.request(totalPointsSearchMicroService)
            .get('/transactions/points')
            .set('Authorization', 'Bearer '+ sampleToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
      }).timeout(10000);
  });
  describe('/GET transaction history', () => {
      it('it should GET all transactions from a user', (done) => {
            chai.request(transactionHistoryMicroService)
            .get('/transactions/history')
            .set('Authorization', 'Bearer '+ sampleToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              done();
            });
      }).timeout(10000);
  });
  describe('/PUT/:transaction_id deactivate transaction', () => {
      it('it should try to UPDATE a transaction by changing its status to 0 but receive a 400 (wrong) status', (done) => {
          chai.request(deactivateTransactionMicroService)
          .put('/transactions/deactivate/' + 1)
          .set('Authorization', 'Bearer '+ sampleToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      }).timeout(10000);
  });
