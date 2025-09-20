const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testRegistration() {
  try {
    console.log('Testing registration process...');
    
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'TestPassword123!',
      location: 'Test Location'
    };
    
    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });
    
    if (existingUser) {
      console.log('User already exists, deleting for clean test...');
      await prisma.user.delete({
        where: { email: testUser.email }
      });
    }
    
    // Hash password
    console.log('Hashing password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(testUser.password, saltRounds);
    console.log('✅ Password hashed successfully');
    
    // Create user with transaction
    console.log('Creating user with transaction...');
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: testUser.name,
          email: testUser.email,
          passwordHash: hashedPassword,
          location: testUser.location
        }
      });
      
      console.log('✅ User created, creating related records...');
      
      await tx.reputation.create({
        data: { userId: newUser.id }
      });
      console.log('✅ Reputation record created');
      
      await tx.creditBalance.create({
        data: { userId: newUser.id }
      });
      console.log('✅ Credit balance record created');
      
      await tx.socialStats.create({
        data: { userId: newUser.id }
      });
      console.log('✅ Social stats record created');
      
      return newUser;
    });
    
    console.log('✅ Registration successful:', {
      id: user.id,
      name: user.name,
      email: user.email
    });
    
    // Clean up
    await prisma.user.delete({
      where: { id: user.id }
    });
    console.log('✅ Test user cleaned up');
    
  } catch (error) {
    console.error('❌ Registration test failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      meta: error.meta
    });
  } finally {
    await prisma.$disconnect();
  }
}

testRegistration();