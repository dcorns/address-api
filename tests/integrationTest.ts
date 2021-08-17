/**
 * integrationTest
 * Created by dcorns on 8/17/21
 * Copyright © 2021 Dale Corns
 */
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
const agent = supertest(app);
chai.should();
describe('CRUD tests', () => {
    it('should return array of all addresses on GET /V1/address', (done) => {
        agent.get('/V1/address')
            .send()
            .end((err, results) => {
                results.body.length.should.not.equal(0);
                done();
            });
    });
    it('should return filtered array of addresses when fragment text is added to GET /V1/address', (done) => {
        agent.get('/V1/address/1600')
            .send()
            .end((err, results) => {
                results.body.length.should.equal(3);
            });
        agent.get('/V1/address/md')
            .send()
            .end((err, results) => {
                results.body.length.should.equal(1);
                done();
            });
    });
});
