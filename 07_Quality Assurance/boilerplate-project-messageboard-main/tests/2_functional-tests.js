const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    let createdThread;
    let createdReply;

    test('Creating a new thread: POST request to /api/threads/{board}', () => {
        const threadToInsert = {
            text: "Test text",
            delete_password: "deleteTest"
        };
        chai.request(server).post('api/threads/internalTest')
        .send(threadToInsert).end((err, res) => {
            assert.equal(res.status, 302);
        });
    });

    test('Viewing 10 recent threads, 3 replies each: GET to /api/threads/{board}', () =>{
        chai.request(server).get('/api/threads').end((err, res) => {
            assert.equal(res.status, 200);
            assert.exists(res.body[0], "Cool");
            assert.equal(res.body[0].text, "Test text");
            assert.isAtMost(res.body[0].replies.length, 3);
            createdThread = res.body[0]._id;
        });
    });

    test('Deleting a thread with the incorrect password', () => {
        chai.request(server).delete('api/threads')
        .send({"thread_id" : createdThread, "delete_password": "incorrect"})
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "incorrect password");
        });
    });

    test("Reporting a thread: PUT request to /api/threads/{board}", () => {
        chai.request(server).put('/api/threads')
        .send({"thread_id": createdThread}).end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "reported");
        });
    });

    test("Creating a new reply: POST request to /api/replies/{board}", () => {
        const replyToInsert = {
            text: "Test reply",
            delete_password: "deleteReply",
            thread_id: createdThread
        };
        chai.request(server).post('api/replies')
        .send(replyToInsert).end((err, res) => {
            assert.equal(res.status, 302);
        });
    });

    test("Viewing a single thread with all replies", () => {
        chai.request(server).get('api/threads')
        .send({thread_id: createdThread}).end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, createdThread);
            assert.equal(res.body.text, "Test text");
            assert.equal(res.body.replies[0].text, "Test reply");
            createdReply = res.body.replies[0]._id;
        });
    });

    test("Reporting a reply: PUT request to /api/replies/{board}", () => {
        chai.request(server).put('api/replies')
        .send({"thread_id": createdThread, "reply_id": createdReply})
        .end((err, res) =>{
            assert.equal(res.status, 200);
            assert.equal(res.text, "reported");
        });
    });

    test("Deleting a reply with the incorrect password", () => {
        chai.request(server).delete('api/replies/internalTest')
        .send({"thread_id" : createdThread, "reply_id": createdReply,
         "delete_password": "deleteTest", "delete_password": "Iforgot"})
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'incorrect password');
        });
    });

    test("Deleting a reply with the correct password", () => {
        chai.request(server).delete('api/replies/internalTest')
        .send({"thread_id" : createdThread, "reply_id": createdReply,
         "delete_password": "deleteTest", "delete_password": "deleteReply"})
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'success');
        });
    });

    test("Deleting a thread with the correct password", () => {
        chai.request(server).delete('api/threads/internalTest')
        .send({"thread_id" : createdThread, "delete_password": "deleteTest"})
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
        });
    });
});