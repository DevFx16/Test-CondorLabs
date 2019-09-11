const Chai = require('chai');
const Http = require('chai-http');
const Main = require('../../Main');

Chai.use(Http);

const should = Chai.should();
var group;
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDZkZDhjMjY2YjUyMTcwN2RmOGNiZTMiLCJpYXQiOjE1Njc1MjEzNDgsImV4cCI6MTU2ODgxNzM0OH0.LrQ35PYhsWtSM3YPZ-36tyOZsnwgb8W5UjhiaayYvXo';

describe('Get /Group', () => {
    it('Get all group for user', done => {
        Chai.request(Main)
            .get('/Group')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Post /Group', async () => {
    it('Create new group', done => {
        Chai.request(Main)
            .post('/Group')
            .set('Authorization', 'Bearer ' + Token)
            .send({ 'Members': ['5d73e07bd6aa5b00174d6142', '5d6dd8c266b521707df8cbe3'], DisplayName: 'this is test' })
            .then(res => {
                res.body.should.be.an('object').that.not.empty;
                res.body.should.have.property('Group');
                res.should.have.status(200);
                group = res.body.Group;
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('Put /Group/:Id', async () => {
    it('Add member in group', done => {
        Chai.request(Main)
            .put('/Group/' + group._id)
            .set('Authorization', 'Bearer ' + Token)
            .send({ 'Members': ['5d73e03cd6aa5b00174d6141'] })
            .then(res => {
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('delete /Group/Member/:Id', async () => {
    it('delete member in group', done => {
        Chai.request(Main)
            .delete('/Group/Member/' + group._id)
            .set('Authorization', 'Bearer ' + Token)
            .send({ 'Member': '5d73e03cd6aa5b00174d6141' })
            .then(res => {
                res.body.should.be.a('object').that.not.empty;
                res.should.have.status(200);
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('delete /Group/:Id', async () => {
    it('delete group', done => {
        Chai.request(Main)
            .delete('/Group/' + group._id)
            .set('Authorization', 'Bearer ' + Token)
            .then(res => {
                res.body.should.be.a('object').that.is.not.empty;
                res.should.have.status(200);
                group = res.body;
                done();
            }).catch(err => {
                done(err);
            });
    });
});