# Frontend App

## Requirements

- Node 18
- Docker

## Setup

### Environment Variables

1. Create a `.env` in the app folder and add local environment variables for the "dev" environment.
2. Create a `.env.staging` in the app folder and add environment variables for the "staging" environment.

### Installation

1. `make install`
2. a) `make run-dev` starts the local environment. \
    b) `make run-staging` starts environment connected to staging backend & database.

## Extras

- For extra commands, see "Makefile"
