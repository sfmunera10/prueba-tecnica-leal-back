let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET review', () => {
      it('it should GET all the reviews', (done) => {
            chai.request(server)
            .get('/reviews')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('data');
              done();
            });
      }).timeout(10000);
  });
  describe('/POST review', () => {
      it('it should POST a review ', (done) => {
          let review = {
            comment: 'comment1',
            score: 123,
            shopId:1,
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          chai.request(server)
          .post('/reviews')
          .send(review)
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
  describe('/GET/:id review', () => {
      it('it should GET a review by the given id', (done) => {
          chai.request(server)
          .get('/reviews/find-id/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('data');
            done();
          });
      }).timeout(10000);
  });
  describe('/PUT/:id review', () => {
      it('it should UPDATE a review given the id', (done) => {
          let review = { 
            comment: 'comment2',
            score: 123,
            shopId:2,
            userId:2,
            createdAt: new Date(),
            updatedAt: new Date() 
          };
          chai.request(server)
          .put('/reviews/' + resourceId)
          .send(review)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });
  describe('/DELETE/:id review', () => {
      it('it should DELETE a review given the id', (done) => {
          chai.request(server)
          .delete('/reviews/' + resourceId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            
            res.body.should.have.property('error');
            done();
          });
      }).timeout(10000);
  });