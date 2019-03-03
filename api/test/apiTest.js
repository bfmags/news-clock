const request = require('supertest');
const api = require('../api');

// animate in, update clock every minute
describe('GET /on', function () {
    it('respond with json message 200 OK', function (done) {
        request(api)
            .get('/on')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// animate out
describe('GET /off', function () {
    it('respond with json message 200 OK', function (done) {
        request(api)
            .get('/on')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// parameter not valid
describe('GET /random', function () {
    it('respond with json message 200 OK', function (done) {
        request(api)
            .get('/on')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// server alive
describe('GET /', function () {
    it('respond with json message 200 OK', function (done) {
        request(api)
            .get('/on')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

