/**
 * USER TEST
 */
const Chai = require('chai');
const Http = require('chai-http');
const Main = require('../../Main');

Chai.use(Http);

const should = Chai.should();
var user;

describe('Post /User', async () => {
    it('Create new user', done => {
        Chai.request(Main)
            .post('/User')
            .send({ 'Username': 'test123', Password: 'test123', DisplayName: 'this is test' })
            .then(res => {
                res.body.should.be.a('object');
                res.body.should.have.property('User');
                res.body.should.have.property('Token');
                res.should.have.status(200);
                user = res.body;
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('Get /User/:Skip', () => {
    it('Get all users skip 0', done => {
        Chai.request(Main)
            .get('/User/0')
            .set('Authorization', 'Bearer ' + user.Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('array');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Get /User/Search/:Name/:Skip', () => {
    it('Get all users for name skip 0', done => {
        Chai.request(Main)
            .get('/User/Search/Fernando/0')
            .set('Authorization', 'Bearer ' + user.Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('array');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Get /User', () => {
    it('Get user', done => {
        Chai.request(Main)
            .get('/User')
            .set('Authorization', 'Bearer ' + user.Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('Username');
                res.body.should.have.property('Password');
                res.body.should.have.property('DisplayName');
                res.body.should.have.property('CreateAt');
                res.body.should.have.property('UrlImage');
                res.body.should.have.property('Status');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Put one user /User', () => {
    it('Put user update', done => {
        Chai.request(Main)
            .put('/User')
            .send({ 'DisplayName': 'Probando' })
            .set('Authorization', 'Bearer ' + user.Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('Username');
                res.body.should.have.property('Password');
                res.body.should.have.property('DisplayName').to.equal('Probando');
                res.body.should.have.property('CreateAt');
                res.body.should.have.property('UrlImage');
                res.body.should.have.property('Status');
                res.should.have.status(200);
                done();
            });
    });
});

describe('Post /User', async () => {
    it('Login user', done => {
        Chai.request(Main)
            .post('/User/Login')
            .send({ 'Username': 'test123', Password: 'test123' })
            .then(res => {
                res.body.should.be.a('object');
                res.body.should.have.property('User');
                res.body.should.have.property('Token');
                res.should.have.status(200);
                user = res.body;
                done();
            }).catch(err => {
                done(err);
            });
    });
});

describe('Delete /User', async () => {
    it('delete user', done => {
        Chai.request(Main)
            .delete('/User')
            .set('Authorization', 'Bearer ' + user.Token)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.should.have.status(200);
                done();
            });
    });
});
