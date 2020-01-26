let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET ad', () => {
      it('it should GET all the ads', (done) => {
            chai.request(server)
            .get('/ads')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST ad', () => {
      it('it should POST an ad ', (done) => {
          let ad = {
            bikewayContent: 'bikewayContent1',
            name: 'name1',
            link: 'link1',
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/ads')
          .send(ad)
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
  describe('/GET/:id ad', () => {
      it('it should GET an ad by the given id', (done) => {
          chai.request(server)
          .get('/ads/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id ad', () => {
      it('it should UPDATE an ad given the id', (done) => {
          let ad = { 
            bikewayContent: 'bikewayContent2',
            name: 'name2',
            link: 'link2',
            userId:2,
            createdAt: new Date(),
            updatedAt: new Date() 
          };
          chai.request(server)
          .put('/ads/' + resourceId)
          .send(ad)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id ad', () => {
      it('it should DELETE an ad given the id', (done) => {
          chai.request(server)
          .delete('/ads/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });