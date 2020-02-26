# Hubitat Update Manager
Check and update Hubitat Custom Apps and Drivers

## Usage

### Using Docker

```
docker run -d --restart unless-stopped -e HUB_URL=http://myhubitat -p 3000:3000 richpeng/hubitat-update-manager:latest
```

### Using Node

```
npm install
HUB_URL=http://myhubitat npm start
```

## Development

This app is built in [Next.js](https://nextjs.org/). To start the development server:

```
HUB_URL=http://myhubitat npm run dev
```
