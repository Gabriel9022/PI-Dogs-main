/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name:"Cheems", height_min:30, height_max:40, weight_min:30, weight_max:52, life_span_min:14, life_span_max:16, image:"dog.com"
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => conn.sync({ force: true })
    .then(() => Raza.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('should return 200 if I pass a dog as a parameter', ()=>{
      agent.get('/dogs?name=Husky').expect(200)
    });
  }),
  describe('GET /dogs/:id', () => {
    it('should get 200', () =>
      agent.get('/dogs/20').expect(200)
    ),
    it('should get 400', () =>
      agent.get('/dogs/anotherdog').expect(400)
    );
  }),
  describe('POST /dogs', () => {
    it("responds with 400", ()=>  agent.post("/dogs").send({name:"BadDog"}).expect(404));
    it("responds with the dog created", ()=>
     agent
        .post("/dogs")
        .send({
          name:"Cheems", height_min:30, height_max:40, weight_min:30, weight_max:52, life_span_min:14, life_span_max:16, image:"dog.com"
          })
        .then((res)=>{
          expect(res.body.name).equal("Cheems");
        }));
  });
  describe('GET /temperaments', () => {
    it("responds with 200", ()=>
    agent.get('/temperament').expect(200)
        );
  });

});
