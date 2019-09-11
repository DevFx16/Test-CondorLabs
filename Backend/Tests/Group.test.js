const Chai = require('chai');
const Http = require('chai-http');
const Main = require('../../Main');

Chai.use(Http);

const should = Chai.should();
var group;
const Token = '';

describe('Get /Group', () => {
    it('Get all group for user', done => {
        Chai.request(Main)
            .get('/Group')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('array');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Post /Group', async () => {
    it('Create new group', done => {
        Chai.request(Main)
            .post('/Group')
            .send({ 'Members': ['5d73e07bd6aa5b00174d6142'], DisplayName: 'this is test' })
            .then(res => {
                res.body.should.be.a('object');
                res.should.have.status(200);
                user = res.body;
                done();
            }).catch(err => {
                done(err);
            });
    });
});