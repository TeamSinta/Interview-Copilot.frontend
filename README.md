# Frontend App

## Requirements

- Node 18
- Docker

## Installation

1. Create the file `.env` in the `app` folder and add local environment variables for the "dev" environment. Request this from someone in the team.
2. Create the file `.env.staging` in the `app` folder and add environment variables for the "staging" environment. Request this from soneone in the team.

3. From the root folder, run:

```bash
# installs the project
make install

# builds the docker container
make build
```

## Usage

Run environment:

```bash
# run connected to local environment
make run-dev

# run connected to staging db/be
make run-staging
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
