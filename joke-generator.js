/**
 * Simple Joke Generator - Node.js (Built-in HTTPS)
 * 
 * Uses Node.js built-in 'https' module (no external dependencies)
 * Fetches random jokes from JokeAPI
 * 
 * Run: node joke-generator.js
 */

const https = require('https');

const API_URL = 'https://jokeapi.dev/api/joke/Any?format=json';

/**
 * Fetch a joke from JokeAPI using Node's built-in https module
 * @returns {Promise<Object>} Joke object
 */
function getJoke() {
    return new Promise((resolve, reject) => {
        https.get(API_URL, (response) => {
            let data = '';

            // Collect data chunks
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Parse and resolve when all data received
            response.on('end', () => {
                try {
                    const joke = JSON.parse(data);

                    // Check for API errors
                    if (joke.error) {
                        reject(new Error(`API Error: ${joke.errorMessage || 'Unknown error'}`));
                    } else {
                        resolve(joke);
                    }
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(new Error(`HTTP request failed: ${error.message}`));
        });
    });
}

/**
 * Display joke with proper formatting
 * @param {Object} joke - Joke object from API
 */
function displayJoke(joke) {
    console.log('\n' + '='.repeat(70));

    if (joke.type === 'twopart') {
        // Two-part joke (setup + delivery)
        console.log('🎭 SETUP:\n');
        console.log(`   ${joke.setup}\n`);
        console.log('😂 DELIVERY:\n');
        console.log(`   ${joke.delivery}`);
    } else if (joke.type === 'single') {
        // Single-part joke
        console.log('😂 JOKE:\n');
        console.log(`   ${joke.joke}`);
    }

    console.log('\n' + '='.repeat(70) + '\n');
}

/**
 * Main function - fetch and display a joke
 */
async function main() {
    try {
        console.log('🔄 Loading a joke for you...\n');
        const joke = await getJoke();
        displayJoke(joke);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Run the program
main();
