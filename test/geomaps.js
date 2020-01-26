let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET geomap', () => {
      it('it should GET all the geomaps', (done) => {
            chai.request(server)
            .get('/geomaps')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST geomap', () => {
      it('it should POST an geomap ', (done) => {
          let geomap = {
            cityName: 'cityName1',
            type: 'type',
            travelId:1,
            locationId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/geomaps')
          .send(geomap)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            resourceId = res.body.data.id;
            done();
          });
      }).timeout(10000);
  });
  describe('/GET/:id geomap', () => {
      it('it should GET an geomap by the given id', (done) => {
          chai.request(server)
          .get('/geomaps/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            //res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id geomap', () => {
      it('it should UPDATE an geomap given the id', (done) => {
          let geomap = { 
            cityName: 'cityName2',
            type: 'type',
            travelId:2,
            locationId:2,
            createdAt: new Date(),
            updatedAt: new Date() 
          };
          chai.request(server)
          .put('/geomaps/' + resourceId)
          .send(geomap)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id geomap', () => {
      it('it should DELETE an geomap given the id', (done) => {
          chai.request(server)
          .delete('/geomaps/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });