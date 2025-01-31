
# Initialization Commands

.PHONY: build-dev
build-dev:
		docker compose -f docker-compose-dev.yaml build

.PHONY: build-staging
build-staging:
		docker compose -f docker-compose-staging.yaml build

.PHONY: install
install:
		cd app && npm install

# Linting
.PHONY: install-pre-commit
install-pre-commit:
	cd app && pre-commit uninstall && pre-commit install -c ../.pre-commit-config.yaml

.PHONY: prettier
prettier:
		cd app && npm run format

.PHONY: lint
lint:
		cd app && npm run check-lint

.PHONY: check-types
check-types:
		cd app && npm run check-types

.PHONY: format-lint-all
format-lint-all:
		make prettier linting check-types

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
	dev-down staging-down

# Setup Command
.PHONY: setup
setup:
	$(MAKE) install && \
	$(MAKE) install-pre-commit \
	$(MAKE) build-dev
