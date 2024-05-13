# Frontend Component

This component uses React to create a web interface that communicates with the backend service and allows users to interact with their data.

## Installation (NPM)

To install the dependencies, run the following command:

```bash
npm install

To start the frontend service, run the following command:

```bash
npm start
```

# Installation (Docker)

I've provided a Makefile to simplify the process of building and running the frontend service using Docker. To build the Docker image, run the following commands:

```bash
make docker.build
make docker.run
```

## Usage

The frontend service will be running on `http://localhost:3000`. You can access this URL from your web browser to interact with the web interface.

Notes: 
- The frontend service requires the backend service to be running in order to work properly.