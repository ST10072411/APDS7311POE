const request = require('supertest');
const app = require('./app'); // Adjust this to your actual Express app file
const { exec } = require('child_process');

// Start the server
let server;

// Use a function to start the server before running tests
beforeAll((done) => {
    server = exec('node server', { cwd: './backend' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting server: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Server stderr: ${stderr}`);
            return;
        }
        console.log(`Server output: ${stdout}`);
    });
    setTimeout(done, 1000); // Wait for server to start
});

// Test cases
describe('POST /api/users/login', () => {
    it('should log in the user with correct credentials', async () => {
        const response = await request('https://localhost:3000')
            .post('/api/users/login')
            .send({
                username: 'Bingus',
                password: 'Bingus'
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Check for token in response
    });

    it('should not log in with incorrect password', async () => {
        const response = await request('https://localhost:3000')
            .post('/api/users/login')
            .send({
                username: 'Bingus',
                password: 'wrongPassword'
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Authentication Failed!");
    });

    it('should not log in a non-existent user', async () => {
        const response = await request('https://localhost:3000')
            .post('/api/users/login')
            .send({
                username: 'NonExistent',
                password: 'Bingus'
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Authentication Failed!");
    });
});

// Stop the server after tests
afterAll((done) => {
    // Close the server process
    server.kill();
    done();
});
