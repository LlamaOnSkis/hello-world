/**
 * Advanced Joke Generator Implementations
 * Three different approaches to fetch jokes from JokeAPI:
 * 1. Fetch API (Node.js 18+)
 * 2. Axios (popular HTTP client)
 * 3. Got (advanced HTTP library)
 */

const API_URL = 'https://jokeapi.dev/api/joke/Any?format=json';

// ============================================================================
// METHOD 1: Fetch API (Node.js 18+)
// ============================================================================

async function getJokeUsingFetch() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const joke = await response.json();
        
        if (joke.error) {
            throw new Error(`API Error: ${joke.errorMessage || 'Unknown error'}`);
        }
        
        return joke;
    } catch (error) {
        throw new Error(`Fetch failed: ${error.message}`);
    }
}

// ============================================================================
// METHOD 2: Axios (requires: npm install axios)
// ============================================================================

async function getJokeUsingAxios() {
    try {
        // Lazy require axios (so it's only needed if this function is called)
        const axios = require('axios');
        
        const response = await axios.get(API_URL, {
            timeout: 10000, // 10 second timeout
            headers: {
                'User-Agent': 'JokeGenerator/1.0'
            }
        });
        
        const joke = response.data;
        
        if (joke.error) {
            throw new Error(`API Error: ${joke.errorMessage || 'Unknown error'}`);
        }
        
        return joke;
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error('Axios not installed. Run: npm install axios');
        }
        throw new Error(`Axios failed: ${error.message}`);
    }
}

// ============================================================================
// METHOD 3: Got (requires: npm install got)
// ============================================================================

async function getJokeUsingGot() {
    try {
        // Lazy require got (so it's only needed if this function is called)
        const got = require('got');
        
        const response = await got(API_URL, {
            timeout: { request: 10000 }, // 10 second timeout
            headers: {
                'User-Agent': 'JokeGenerator/1.0'
            },
            responseType: 'json'
        });
        
        const joke = response.body;
        
        if (joke.error) {
            throw new Error(`API Error: ${joke.errorMessage || 'Unknown error'}`);
        }
        
        return joke;
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error('Got not installed. Run: npm install got');
        }
        throw new Error(`Got failed: ${error.message}`);
    }
}

// ============================================================================
// Utility: Format and display jokes
// ============================================================================

function displayJoke(joke) {
    console.log('\n' + '='.repeat(60));
    
    if (joke.type === 'twopart') {
        console.log('🎭 Setup:\n', joke.setup);
        console.log('\n😂 Delivery:\n', joke.delivery);
    } else if (joke.type === 'single') {
        console.log('😂 Joke:\n', joke.joke);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
}

// ============================================================================
// Demo: Try each method (comment out as needed)
// ============================================================================

async function runDemo() {
    // Method 1: Fetch API (requires Node 18+)
    try {
        console.log('📡 Trying Fetch API (Node 18+)...');
        const joke = await getJokeUsingFetch();
        displayJoke(joke);
        return;
    } catch (error) {
        console.log(`⚠️  Fetch API failed: ${error.message}\n`);
    }

    // Method 2: Axios
    try {
        console.log('📡 Trying Axios...');
        const joke = await getJokeUsingAxios();
        displayJoke(joke);
        return;
    } catch (error) {
        console.log(`⚠️  Axios failed: ${error.message}\n`);
    }

    // Method 3: Got
    try {
        console.log('📡 Trying Got...');
        const joke = await getJokeUsingGot();
        displayJoke(joke);
        return;
    } catch (error) {
        console.log(`⚠️  Got failed: ${error.message}\n`);
    }

    console.error('❌ All methods failed. Please install a HTTP client or use Node 18+');
    process.exit(1);
}

// Run demo if executed directly
if (require.main === module) {
    runDemo();
}

// Export functions for use in other modules
module.exports = {
    getJokeUsingFetch,
    getJokeUsingAxios,
    getJokeUsingGot,
    displayJoke
};
