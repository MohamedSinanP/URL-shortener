# Deterministic Prime-Length URL Shortener (MERN Task)

This project is a backend + frontend implementation of a deterministic URL shortener built using the **MERN stack**, with a unique algorithm that:

- Generates short codes based on the **shortest prime number greater than the number of existing records**
- Resolves **collisions** by increasing the length using the **next prime**
- Uses **SHA256 + Base62** for hash generation
- Handles **edge cases** like collisions and limitted probe attempts

---

## Features

- Deterministic short code generation from long URLs
- Prime-length code selection based on active documents
- Smart collision handling by probing next primes
- URL redirection using short code
- Simple HTML frontend using Axios
- MVC architecture
- MongoDB for persistence

---

## Tech Stack

- **MongoDB**
- **Express**
- **Node.js**
- **Axios**
- **Crypto**
- **Base62 encoder**
- **HTML/CSS + JS (Frontend)**

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/MohamedSinanP/URL-shortener.git
cd url-shortener
```

2. **Install Dependencies**

````bash
npm install
```

3. **Create a .env file in the root directory and add your environment variables:**

```ini
PORT=5001
MONGO_URL="your datase url cloud (atlas) or local"
```
4. **Start the server**

```bash
npm run start
```
- Then visit http://localhost:5001

## License

MIT License

---
## Author

Created by Mohamed Sinan P

````
