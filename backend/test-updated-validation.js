const fetch = require('node-fetch');

async function testUpdatedValidation() {
  console.log('Testing registration with updated validation...');
  
  const testCases = [
    {
      name: 'Too short password',
      data: {
        name: 'Test Short',
        email: 'testshort@live.com',
        password: '123',
        location: 'Test'
      }
    },
    {
      name: 'No uppercase',
      data: {
        name: 'Test Lower',
        email: 'testlower@live.com',
        password: 'password123',
        location: 'Test'
      }
    },
    {
      name: 'No lowercase',
      data: {
        name: 'Test Upper',
        email: 'testupper@live.com',
        password: 'PASSWORD123',
        location: 'Test'
      }
    },
    {
      name: 'No number',
      data: {
        name: 'Test NoNum',
        email: 'testnonum@live.com',
        password: 'PasswordABC',
        location: 'Test'
      }
    },
    {
      name: 'Valid password (no special char needed)',
      data: {
        name: 'Test Valid',
        email: 'testvalid2@live.com',
        password: 'Password123',
        location: 'Test'
      }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n--- Testing: ${testCase.name} ---`);
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });
      
      console.log('Status:', response.status);
      
      const responseText = await response.text();
      const responseData = JSON.parse(responseText);
      
      if (response.status === 400) {
        console.log('Validation error:', responseData.details[0].msg);
      } else if (response.status === 201) {
        console.log('✅ Registration successful:', responseData.user.name);
        // Clean up
        await cleanUpUser(responseData.user.id);
      }
      
    } catch (error) {
      console.error('Request failed:', error.message);
    }
  }
}

async function cleanUpUser(userId) {
  // This would need a delete endpoint, but for now we'll skip cleanup
  console.log(`Would clean up user ID: ${userId}`);
}

testUpdatedValidation();