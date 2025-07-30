# Portfolio

This project powers the personal portfolio for **Victoria Kirichenko**. It consists of a small Express server and a React client built with Vite. The repository includes both development and production builds.

## Project structure

- **server/** – Express application that exposes a minimal API (`/api/contact`) and serves the client assets. During development it integrates with Vite for hot reloading.
- **client/** – React 18 + TypeScript source powered by Vite.
- **dist/** – Generated output after building the client and bundling the server.

## Requirements

- Node.js 18 or later
- npm (comes with Node)

Optionally set the `PORT` environment variable to change the listening port (defaults to `5000`).

## Getting started

Install dependencies:

```bash
npm install
```

### Development

Run the server in development mode with Vite:

```bash
npm run dev
```

This starts the Express server with Vite middleware. The React client is served with hot module reloading at the same port.

### Production build

Create a production build of the client and bundle the server:

```bash
npm run build
```

The compiled files are written to `dist/`.

### Start in production

After building, start the bundled Express server:

```bash
npm start
```

The server serves the static assets from `dist/public` and exposes the `/api/contact` endpoint.

## License

MIT

