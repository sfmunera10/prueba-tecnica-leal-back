let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET travel', () => {
      it('it should GET all the travels', (done) => {
            chai.request(server)
            .get('/travels')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST travel', () => {
      it('it should POST a travel ', (done) => {
          let travel = {
            startDate: new Date(),
            finishDate: new Date(),
            duration: 123123,
            bikewayId:1,
            geomapId:1,
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/travels')
          .send(travel)
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
  describe('/GET/:id travel', () => {
      it('it should GET a travel by the given id', (done) => {
          chai.request(server)
          .get('/travels/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id travel', () => {
      it('it should UPDATE a travel given the id', (done) => {
          let travel = { 
            startDate: new Date(),
            finishDate: new Date(),
            duration: 123123,
            bikewayId:2,
            geomapId:2,
            userId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          chai.request(server)
          .put('/travels/' + resourceId)
          .send(travel)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id travel', () => {
      it('it should DELETE a travel given the id', (done) => {
          chai.request(server)
          .delete('/travels/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });