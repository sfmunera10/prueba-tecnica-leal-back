let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET bikeway', () => {
      it('it should GET all the bikeways', (done) => {
            chai.request(server)
            .get('/bikeways')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST bikeway', () => {
      it('it should POST a bikeway ', (done) => {
          let bikeway = {
            name: 'name1',
            estimatedTime: 123123,
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/bikeways')
          .send(bikeway)
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
  describe('/GET/:id bikeway', () => {
      it('it should GET a bikeway by the given id', (done) => {
          chai.request(server)
          .get('/bikeways/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id bikeway', () => {
      it('it should UPDATE a bikeway given the id', (done) => {
          let bikeway = { 
            name: 'name2',
            estimatedTime: 123123,
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          chai.request(server)
          .put('/bikeways/' + resourceId)
          .send(bikeway)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id bikeway', () => {
      it('it should DELETE a bikeway given the id', (done) => {
          chai.request(server)
          .delete('/bikeways/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });