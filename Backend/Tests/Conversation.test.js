/**
 * Test Conversation 
 */
const Chai = require('chai');
const Http = require('chai-http');
const Main = require('../../Main');

Chai.use(Http);

const should = Chai.should();
var conversation;
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDZkZDhjMjY2YjUyMTcwN2RmOGNiZTMiLCJpYXQiOjE1NjgyMzYyNjksImV4cCI6MTU2OTUzMjI2OX0.8vcBv1iL3mtgMLXr0z8_RtEIWNRLOxTZ0cqkwTtCYzA';

describe('Get /Conversation', () => {
    it('Get all conversations for user', done => {
        Chai.request(Main)
            .get('/Conversation')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Post /Conversation', async () => {
    it('Create new conversation', done => {
        Chai.request(Main)
            .post('/Conversation')
            .set('Authorization', 'Bearer ' + Token)
            .send({ 'Members': ['5d73e07bd6aa5b00174d6142', '5d6dd8c266b521707df8cbe3'] })
            .then(res => {
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                conversation = res.body;
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('Get /Conversation/:Id', () => {
    it('Get one conversation by user and id', done => {
        Chai.request(Main)
            .get('/Conversation/5d73e07bd6aa5b00174d6142')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            });
    });
});

describe('Get /Conversation/Groups/All', () => {
    it('Get in conversation groups all by user', done => {
        Chai.request(Main)
            .get('/Conversation/Groups/All')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('array')
                res.should.have.status(200);
                done();
            });
    });
});

describe('Get /Conversation/Groups/One/:Id', () => {
    it('Get one conversation group by user and id', done => {
        Chai.request(Main)
            .get('/Conversation/Groups/One/5d7962c44271190017414792')
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            });
    });
});

describe('Put /Conversation/:Id', () => {
    it('Put push message conversation', done => {
        Chai.request(Main)
            .put('/Conversation/' + conversation._id)
            .set('Authorization', 'Bearer ' + Token)
            .send({ Message: 'this is test', IndexUser: 0 })
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            });
    });
});

describe('Put /Conversation/Groups/:Id', () => {
    it('Put push message conversation group', done => {
        Chai.request(Main)
            .put('/Conversation/Groups/5d7962c44271190017414792')
            .set('Authorization', 'Bearer ' + Token)
            .send({ Message: 'this is test', IndexUser: 0 })
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            });
    });
});

describe('delete /Conversation/:Id', () => {
    it('delete one conversation by id', done => {
        Chai.request(Main)
            .delete('/Conversation/' + conversation._id)
            .set('Authorization', 'Bearer ' + Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.an('object').that.not.empty;
                res.should.have.status(200);
                done();
            });
    });
});
