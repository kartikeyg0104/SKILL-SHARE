const fetch = require('node-fetch');

async function testWeakPassword() {
  console.log('Testing registration with weak password...');
  
  const testUser = {
    name: 'Test User Weak',
    email: 'testweak@live.com',
    password: 'weakpass', // This should fail validation
    location: 'Test Location'
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    const responseText = await response.text();
    console.log('Response body (raw):', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('Response body (parsed):', responseJson);
    } catch (parseError) {
      console.log('Could not parse response as JSON');
    }
    
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

async function testValidPassword() {
  console.log('\nTesting registration with valid password...');
  
  const testUser = {
    name: 'Test User Valid',
    email: 'testvalid@live.com',
    password: 'StrongPass123!', // This should pass validation
    location: 'Test Location'
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Response body (raw):', responseText.substring(0, 200) + '...');
    
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

async function runTests() {
  await testWeakPassword();
  await testValidPassword();
}

runTests();