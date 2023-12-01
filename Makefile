
# Initialization Commands

.PHONY: build
build:
		docker compose build

.PHONY: install
install:
		cd app && npm install

# Linting # not working yet

.PHONY: lint
lint:
		cd app && npm run lint

# FE

# Run Commands #
.PHONY: run-dev
run-dev:
	docker compose -f docker-compose-dev.yaml up

# TODO
.PHONY: run-staging
run:
