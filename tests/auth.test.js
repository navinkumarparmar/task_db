const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/config/database"); 
afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  await sequelize.close();
});
describe("Auth API Tests", () => {
    let token; 

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "testuser@example.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User registered successfully");
    });

    it("should login and return a JWT token", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "testuser@example.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");

        token = res.body.token; // Store token for later use
    });

    it("should fail login with incorrect password", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "testuser@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
});