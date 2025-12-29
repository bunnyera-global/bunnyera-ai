const axios = require('axios');

const API_URL = 'http://localhost:3001';
const TEST_EMAIL = `test_${Date.now()}@bunnyera.org`;
const TEST_PASSWORD = 'password123';

async function runTest() {
    console.log('🐰 Starting BunnyEra Full Flow Verification...');

    try {
        // 1. Register
        console.log(`\n1. Registering user: ${TEST_EMAIL}...`);
        const registerRes = await axios.post(`${API_URL}/auth/register-email`, {
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });
        console.log('✅ Registration Successful!');
        const token = registerRes.data.token;

        // 2. Login (Optional, since register returns token, but good to verify)
        console.log('\n2. Verifying Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login-email`, {
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });
        console.log('✅ Login Successful!');
        
        // 3. Generate Content
        console.log('\n3. Testing AI Generation (via Gateway)...');
        // Note: This might take time if using local model
        const generateRes = await axios.post(`${API_URL}/generate`, {
            topic: 'Summer Sale',
            platform: 'Instagram',
            language: 'English'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('✅ AI Generation Successful!');
        console.log('📄 Result Preview:', generateRes.data.result.substring(0, 100) + '...');

        console.log('\n🎉 ALL SYSTEMS GO! The architecture is working perfectly.');

    } catch (error) {
        console.error('\n❌ Test Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

runTest();
