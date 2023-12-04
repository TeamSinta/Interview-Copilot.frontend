
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

.PHONY: run-staging
run-staging:
	docker compose -f docker-compose-staging.yaml up

.PHONY: dev-down
dev-down:
	docker compose -f docker-compose-dev.yaml down

.PHONY:
staging-down:
	docker compose -f docker-compose-staging.yaml down

.PHONY:
docker-down:
	dev-down staging down
# TODO
# storybook
# lint
# test
# format
