const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {

  describe('index route', () => {
    it('should return an OK status code', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });

    it('should return the right JSON object', async () => {
      const expectedBody = { api: 'running' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe('DELETE /socks', () => {
    it('should return an OK status code', async () => {
      const expectedStatusCode = 200;
      const sock = {
        color: 'white',
        number: 2,
        clean: true
      };
      const createResponse = await request(server).post('/socks').send(sock);
      const sockId = createResponse.body.id;
      const deleteResponse = await request(server).delete('/socks/' + sockId);
      expect(deleteResponse.status).toEqual(expectedStatusCode);
    });
  });

  describe('POST /socks', () => {
    it('should return an OK status code', async () => {
      const expectedStatusCode = 201;
      const response = await request(server).post('/socks').send({
        color: 'white',
        number: 2,
        clean: true
      });
      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).post('/socks').send({
        color: 'white',
        number: 2,
        clean: true
      });
      expect(response.type).toEqual('application/json');
    });

    it('should return the right JSON object', async () => {
      const sock = {
        color: 'white',
        number: 2,
        clean: true
      };
      const response = await request(server).post('/socks').send(sock);
      const responseBody = response.body;
      expect(responseBody).toEqual({...responseBody, ...sock});
    });

    it('should return an object with a property #id', async () => {
      const sock = {
        color: 'white',
        number: 2,
        clean: true
      };
      const response = await request(server).post('/socks').send(sock);
      expect(response.body).toHaveProperty('id');
    });

    it('should return an error when data is not provided', async () => {
      const sock = {
        color: 'white',
        clean: true
      };
      const response = await request(server).post('/socks').send(sock);
      expect(response.status).toEqual(500);
    });

    it('should default to clean when not provided', async () => {
      const sock = {
        color: 'white',
        number: 1
      };
      const response = await request(server).post('/socks').send(sock);
      expect(response.body.clean).toBe(true);
    });
  });
});
