var assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp)

describe('GET /api/v1/projects', () => {
  it('should return all projects', done => {
    chai.request(server)
      .get('/api/v1/projects')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.should.have.lengthOf(11)
        done();
      }
      )});
});

describe('POST /api/v1/projects', () => {
  it('should create a new project', done => {
    chai.request(server)
      .post('/api/v1/projects')
      .send({
        'name': 'Seminoles colors'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        done();
      });
  });
});
