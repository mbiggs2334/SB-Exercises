const request = require('supertest');

const app = require('../app');
const items = require('../fakeDb');

beforeEach(() => {
    items.push({ name: 'banana', price: 2.99 });
});

afterEach(() => {
    items.length = 0;
});

describe('test /items routes', () => {
    
    test('test GET request', async () => {
        let res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body[0].name).toBe('banana')
    });

    test('test POST request', async () => {
        let res = await request(app).post('/items').send({ "name": "oranges", "price": 4.99 });
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.added.name).toBe('oranges');
        expect(items.length).toBe(2);
        expect(items[1].name).toBe('oranges');
    });

});

describe('test /items/:name routes', () => {

    test('test GET request', async () => {
        let res = await request(app).get('/items/banana');
        console.log(res.body);
    });

    test('test PATCH request', async () => {
        let res = await request(app).patch('/items/banana').send({ "name": "banana", "price": 1.99 });
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.updated.old.price).toBe(2.99);
        expect(res.body.updated.new.price).toBe(1.99);
        expect(items[0].price).toBe(1.99);
    });

    test('test DELETE request', async () => {
        let res = await request(app).delete('/items/banana');
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe('banana deleted');
        expect(items.length).toBe(0);
    });

});