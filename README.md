# String Encrypt/Decrypt UI Demo

A simple demo react UI that allows the user to encrypt or decrypt a string. 

## Generate a demo key

```
openssl rand -hex 32
```

Set this key in server.js, ln 9
```
const SECRET_KEY = 'your-64-char-long-hexadecimal-key-here'
```

## Build the containers

```
docker compose build
```

## Run the Demo

```
docker compose up
```

## Demo UI

The UI runs on http://localhost:8080

