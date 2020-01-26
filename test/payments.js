let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET payment', () => {
      it('it should GET all the payments', (done) => {
            chai.request(server)
            .get('/payments')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST payment', () => {
      it('it should POST an payment ', (done) => {
          let payment = {
            travelTime: 123123123,
            amount: 1.23,
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/payments')
          .send(payment)
          .end((err, res) => {
            res.should.have.status(501);
            done();
          });
      }).timeout(10000);
  });
  describe('/GET/:id payment', () => {
      it('it should GET an payment by the given id', (done) => {
          chai.request(server)
          .get('/payments/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(501);
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id payment', () => {
      it('it should UPDATE an payment given the id', (done) => {
          let payment = { 
            travelTime: 123123123,
            amount: 1.23,
            userId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          chai.request(server)
          .put('/payments/' + resourceId)
          .send(payment)
          .end((err, res) => {
            res.should.have.status(501);
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id payment', () => {
      it('it should DELETE an payment given the id', (done) => {
          chai.request(server)
          .delete('/payments/' + resourceId)
          .end((err, res) => {
            res.should.have.status(501);
            done();
          });
      }).timeout(10000);
  });