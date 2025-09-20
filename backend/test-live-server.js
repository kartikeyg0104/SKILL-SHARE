const fetch = require('node-fetch');

async function testLiveServer() {
  console.log('Testing live server registration endpoint...');
  
  const testUser = {
    name: 'Test User Live',
    email: 'testuser@live.com',
    password: 'TestPassword123!',
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

testLiveServer();