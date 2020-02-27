# Hubitat Update Manager
Check and update Hubitat Custom Apps and Drivers

## Usage

This app can be run as a desktop application or as a server.

### Desktop application

Download a release for your platform from the [Releases page](https://github.com/richardpeng/hubitat-update-manager/releases).

### Server
- [Using Docker](#using-docker)
- [Using Node](#using-node)

### Using Docker

```
docker run -d --restart unless-stopped -p 3000:3000 richpeng/hubitat-update-manager:latest
```

### Using Node

#### Installation
```
git clone https://github.com/richardpeng/hubitat-update-manager.git
cd hubitat-update-manager
npm install
```

#### Running
```
npm run start:server
```

## Development

This app is built in [Next.js](https://nextjs.org/). To start the development server:

```
npm run dev
```
