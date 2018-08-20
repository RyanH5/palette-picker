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
        done();
      }
      )});
});

describe('GET /api/v1/palettes', () => {
  it('should return all palettes', done => {
    chai.request(server)
      .get('/api/v1/palettes')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        done();
      }
      )});
});

describe('POST /api/v1/projects', () => {
  it('should create a new project', done => {
    chai.request(server)
      .post('/api/v1/projects')
      .send({
        'name': 'Seminoles Colors'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id')
        done();
      });
  });
});

describe('POST /api/v1/palettes', () => {
  it('should post to palettes', done => {
    chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'Seminole Colors',
        project_id: 1,
        color1: "#FF220C",
        color2: "#D33E43",
        color3: "#9B7874",
        color4: "#666370",
        color5: "#1C1F33"
      })
      .end( (error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object');
        responser.body.name.should.equal('Seminol Colors');
        response.body.color1.should.equal('#FF220C');
        response.body.color2.should.equal('#D33E43');
        response.body.color3.should.equal('#9B7874');
        response.body.color4.should.equal('#666370');
        response.body.color5.should.equal('#1C1F33');
        responser.body.project_id.should.equal(1)      
      })
      done()
  })
});

