# Molecule Playground

Molecule Playground is an interactive demo for learning basic chemistry. Drag elements from the periodic table into the workspace and watch atoms snap together in 3D using Three.js.

## Requirements

- Node.js 18 or later
- npm

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to play with the app.

Create a production build with:

```bash
npm run build
```

## Directory Structure

```
app/                React components and routes
app/lib/            Shared utilities and constants
public/             Static assets and `compounds.json`
 docs/              Project documents
```

## About

This project demonstrates an island architecture React app with Tailwind CSS and react-three-fiber. The code is meant to be easily extended by editing JSON data files.
