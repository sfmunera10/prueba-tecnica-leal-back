let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let resourceId = 0;
chai.use(chaiHttp);

  describe('/GET application', () => {
      it('it should GET the current app', (done) => {
            chai.request(server)
            .get('/application/getAppName')
            .end((err, res) => {
              done();
            });
      }).timeout(10000);
  });
  