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
npm start
```

## Development

This app is built in [Next.js](https://nextjs.org/). To start the development server:

```
npm run dev
```           

This app also has an [Electron](https://www.electronjs.org/) wrapper around the Node server.

To start the Electron development server:

```
npm run start:gui
```         

### Building releases

```
npm run make:all
```

or one of these:

```
npm run build && npm run make:linux
npm run build && npm run make:darwin
npm run build && npm run make:win32
```
