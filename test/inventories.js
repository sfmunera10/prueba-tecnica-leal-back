let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET inventory', () => {
      it('it should GET all the inventorys', (done) => {
            chai.request(server)
            .get('/inventories')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST inventory', () => {
      it('it should POST an inventory ', (done) => {
          let inventory = {
            model: 'model1',
            description: 'description1',
            QR: 'QR1',
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/inventories')
          .send(inventory)
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
  describe('/GET/:id inventory', () => {
      it('it should GET an inventory by the given id', (done) => {
          chai.request(server)
          .get('/inventories/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id inventory', () => {
      it('it should UPDATE an inventory given the id', (done) => {
          let inventory = { 
            model: 'model2',
            description: 'description2',
            QR: 'QR2',
            userId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          chai.request(server)
          .put('/inventories/' + resourceId)
          .send(inventory)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id inventory', () => {
      it('it should DELETE an inventory given the id', (done) => {
          chai.request(server)
          .delete('/inventories/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });