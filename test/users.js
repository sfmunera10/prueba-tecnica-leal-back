let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST user', () => {
      it('it should POST a user ', (done) => {
          let user = {
            name: 'name1',
            lastName: 'lastName1',
            citizenId: 123,
            citizenIdType: '',
            age: 33,
            cellphoneNumber: 123,
            role: 'role',
            company: 'company',
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/users')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201) || res.should.have.status(200);
            res.body.should.be.a('object');
            
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            resourceId = res.body.data.id;
            done();
          });
      }).timeout(10000);
  });
describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
          chai.request(server)
          .get('/users/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id user', () => {
      it('it should UPDATE a user given the id', (done) => {
          let user = { 
            name: 'name2',
            lastName: 'lastName2',
            citizenId: 123,
            citizenIdType: '',
            age: 33,
            cellphoneNumber: 123,
            role: 'role',
            company: 'company',
            createdAt: new Date(),
            updatedAt: new Date() 
          };
          chai.request(server)
          .put('/users/' + resourceId)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id user', () => {
      it('it should DELETE a user given the id', (done) => {
          chai.request(server)
          .delete('/users/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });