const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;

const DB_FILE = path.join(__dirname, '../vehicles.json');

describe('Veiculos API', () => {
    // Limpa o arquivo JSON antes dos testes
    beforeEach(() => {
        fs.writeFileSync(DB_FILE, '[]');
    });

    it('Deve criar um novo veículo (CREATE)', (done) => {
        request(app)
            .post('/veiculos')
            .send({
                placa: "TEST-123",
                chassi: "99999",
                renavam: "11111",
                modelo: "Gol",
                marca: "VW",
                ano: 2022
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('id');
                expect(res.body.modelo).to.equal('Gol');
                done();
            });
    });

    it('Deve listar veículos (READ)', (done) => {
        request(app).get('/veiculos').expect(200, done);
    });
});