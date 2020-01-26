let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET location', () => {
      it('it should GET all the locations', (done) => {
            chai.request(server)
            .get('/locations')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST location', () => {
      it('it should POST a location ', (done) => {
          let location = {
            lat: 4.8,
            lon: 7.1,
            address: 'address1',
            geomapId:1,
            shopId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/locations')
          .send(location)
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
  describe('/GET/:id location', () => {
      it('it should GET a location by the given id', (done) => {
          chai.request(server)
          .get('/locations/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id location', () => {
      it('it should UPDATE a location given the id', (done) => {
          let location = { 
            lat: 4.8,
            lon: 7.1,
            address: 'address2',
            geomapId:2,
            shopId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          chai.request(server)
          .put('/locations/' + resourceId)
          .send(location)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');  
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id location', () => {
      it('it should DELETE a location given the id', (done) => {
          chai.request(server)
          .delete('/locations/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });