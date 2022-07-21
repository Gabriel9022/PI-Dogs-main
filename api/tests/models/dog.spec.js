const { Raza, Temperamento, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Raza.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Raza.create({
          id: 888, name: "Pug", bred_for: "Hunting", origin: "Suezia", height: 50, weight: 30, lifeSpan: 14, temp: "Good Boy", image: "dog.com"
        });
      });
    }),
      describe("Raza Temperamento", () => {
        it("should throw error if strength is not a string", () => {
          Raza.create({
            id: 888, name: "Pug", bred_for: "Hunting", origin: "Suezia", height: 50, weight: 30, lifeSpan: 14, temp: 50, image: "dog.com"
          })
            .then(() => done(new Error("Temperamento must be a string")))
            .catch(() => done());
        });
        it('should work when its a valid Temperamento', () => {
          Raza.create({
            id: 888, name: "Pug", bred_for: "Hunting", origin: "Suezia", height: 50, weight: 30, lifeSpan: 14, temp: "Good Boy", image: "dog.com"
          });
        });
      })
  });
});
describe('Temperamento model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Temperamento.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Temperamento.create({
          name:"Temperamento1"
        });
      });
    });
  });
});
