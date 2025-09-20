const express = require('express');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const authController = require('./controllers/authController');
const { validateRegistration } = require('./middleware/validation');
require('dotenv').config();

const app = express();
app.use(express.json());

// Create a test route with the exact same middleware as the real route
app.post('/api/auth/register', validateRegistration, authController.register);

const prisma = new PrismaClient();

async function testRegistrationEndpoint() {
  try {
    console.log('Testing registration endpoint with realistic data...');
    
    const testUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'TestPassword123!',
      location: 'New York, NY'
    };
    
    // Clean up any existing test user
    try {
      await prisma.user.delete({
        where: { email: testUser.email }
      });
      console.log('Cleaned up existing test user');
    } catch (error) {
      // User doesn't exist, which is fine
    }
    
    // Make the actual HTTP request to the endpoint
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);
    
    console.log('✅ Registration endpoint test successful!');
    console.log('Response:', {
      message: response.body.message,
      userId: response.body.user?.id,
      userName: response.body.user?.name,
      userEmail: response.body.user?.email
    });
    
    // Clean up
    if (response.body.user?.id) {
      await prisma.user.delete({
        where: { id: response.body.user.id }
      });
      console.log('✅ Test user cleaned up');
    }
    
  } catch (error) {
    console.error('❌ Registration endpoint test failed:');
    console.error('Status:', error.status);
    console.error('Response:', error.response?.body || error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegistrationEndpoint();