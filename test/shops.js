let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET shop', () => {
      it('it should GET all the shops', (done) => {
            chai.request(server)
            .get('/shops')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST shop', () => {
      it('it should POST a shop ', (done) => {
          let shop = {
            name: 'name1',
            type: 'type',
            phoneNumber: 123,
            geomapId:1,
            locationId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/shops')
          .send(shop)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            resourceId = res.body.data.id;
            done();
          });
      }).timeout(10000);
  });
  describe('/GET/:id shop', () => {
      it('it should GET a shop by the given id', (done) => {
          chai.request(server)
          .get('/shops/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id shop', () => {
      it('it should UPDATE a shop given the id', (done) => {
          let shop = { 
            name: 'name2',
            type: 'type',
            phoneNumber: 123,
            geomapId:2,
            locationId:2,
            createdAt: new Date(),
            updatedAt: new Date() 
          };
          chai.request(server)
          .put('/shops/' + resourceId)
          .send(shop)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id shop', () => {
      it('it should DELETE a shop given the id', (done) => {
          chai.request(server)
          .delete('/shops/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });