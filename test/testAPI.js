"use strict";
/**
 * Suite of API tests. 
 *
 * Create by sdiemert on 2016-05-01
 */

var assert = require('assert');
var st  = require("supertest");

describe("API Tests", function () {

    var api = null;
    var obj = null;
    var server = null;

    beforeEach(function(done){

        obj = {
            last : {x: 1, y: 1, c: 1, pass: false},
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            size : 3
        };

        server = require('../app.js')(true);
        api = st('http://localhost:3000');
        done(); 

    });
    
    afterEach(function(done){
        api = null;
        obj = null; 
        server.close(done); 
    });

    describe("/", function () {

        it("should echo the input", function (done) {
            api.post("/")
                .send(obj)
                .expect(200)
                .end(function(err, res){
                    assert.equal(err, null);
                    assert.deepEqual(res.body, {x : 1, y : 1, c : 1, pass : false});
                    done(err);
                });
        });

        it("should fail on incorrect input", function (done) {

            delete obj.last.x;

            api.post("/")
                .send(obj)
                .expect(400)
                .end(function(e, r){
                    done(); 
                });
        });
        
    });

});