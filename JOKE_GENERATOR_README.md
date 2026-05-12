# Joke Generator

A simple random joke generator that fetches jokes from the **[JokeAPI](https://jokeapi.dev)** external API. Includes three implementations: Node.js (HTTPS), modern async/await versions, and an interactive web interface.

## 📋 Files

1. **joke-generator.js** - Node.js implementation using the built-in `https` module
2. **joke-generator-advanced.js** - Multiple implementations:
   - Fetch API (Node.js 18+)
   - Axios
   - Got
3. **joke-generator.html** - Interactive web interface (browser-based)

## 🚀 Usage

### Node.js (Built-in HTTPS)
```bash
node joke-generator.js
```

### Node.js (Fetch API - Node 18+)
```bash
node joke-generator-advanced.js
```

### Node.js (Using Axios)
```bash
npm install axios
node -e "require('./joke-generator-advanced.js').getJokeUsingAxios().then(console.log).catch(console.error)"
```

### Browser
Simply open `joke-generator.html` in your browser and click the button to generate jokes.

## 🎭 Features

- ✅ Fetches random jokes from JokeAPI
- ✅ Handles both one-part and two-part jokes (setup + delivery)
- ✅ Error handling and API error detection
- ✅ Multiple implementation options
- ✅ Beautiful responsive UI (HTML version)
- ✅ No authentication required

## 📡 API Details

**Endpoint:** `https://jokeapi.dev/api/joke/Any?format=json`

**Response Example (Two-part):**
```json
{
  "type": "twopart",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "error": false
}
```

**Response Example (Single-part):**
```json
{
  "type": "single",
  "joke": "Why did the scarecrow win an award? He was outstanding in his field!",
  "error": false
}
```

## 🔧 Requirements

- **Node.js versions:**
  - v16+: Use `https` module from `joke-generator.js`
  - v18+: Use Fetch API from `joke-generator-advanced.js`
  - Any: Install and use `axios` or `got` from `joke-generator-advanced.js`

- **Browser:** Modern browser with Fetch API support (all modern browsers)

## 💡 Customization

### Filter by Category
Modify the API endpoint in any implementation:
- `Any` - All categories (default)
- `Misc`, `Programming`, `Knock-knock`, `General`

Example:
```javascript
// Programming jokes only
const path = '/api/joke/Programming?format=json';
```

### Add Rate Limiting
```javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000); // Wait 1 second between requests
```

## 📚 Learn More

- [JokeAPI Documentation](https://jokeapi.dev)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Node.js HTTPS Module](https://nodejs.org/api/https.html)

---

Made with 🎭 by LlamaOnSkis
