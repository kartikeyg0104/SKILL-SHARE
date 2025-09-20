const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if we can query users table
    const userCount = await prisma.user.count();
    console.log(`✅ User table accessible, current count: ${userCount}`);
    
    // Test if we can query related tables
    const reputationCount = await prisma.reputation.count();
    console.log(`✅ Reputation table accessible, current count: ${reputationCount}`);
    
    const creditCount = await prisma.creditBalance.count();
    console.log(`✅ CreditBalance table accessible, current count: ${creditCount}`);
    
    const socialStatsCount = await prisma.socialStats.count();
    console.log(`✅ SocialStats table accessible, current count: ${socialStatsCount}`);
    
    console.log('✅ All database tables are accessible');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      meta: error.meta
    });
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();