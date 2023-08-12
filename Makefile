dev:
	npm run start:dev

db-up:
	docker-compose -f ./docker-compose.dev.yml up

generate-migration:
	ts-node ./node_modules/typeorm/cli migration:generate -d ./src/data-source.ts ./src/migrations/$(name)

migrate:
	npm run build && npx typeorm migration:run -d ./dist/data-source.js

e2e-test:
	docker-compose -f ./docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from app
