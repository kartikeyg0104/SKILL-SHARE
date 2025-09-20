require('dotenv').config();

console.log('Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not Set');
console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'Set' : 'Not Set');
console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
console.log('JWT_REFRESH_EXPIRE:', process.env.JWT_REFRESH_EXPIRE);

// Test JWT generation
const jwt = require('jsonwebtoken');

try {
  const testToken = jwt.sign(
    { userId: 1 },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  console.log('✅ JWT generation works');
  
  const testRefreshToken = jwt.sign(
    { userId: 1 },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
  console.log('✅ JWT refresh token generation works');
  
} catch (error) {
  console.error('❌ JWT generation failed:', error.message);
}