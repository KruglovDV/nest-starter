dev:
	npm run start:dev

db-up:
	docker-compose up

generate-migration:
	ts-node ./node_modules/typeorm/cli migration:generate -d ./src/data-source.ts ./src/migrations/$(name)

migrate:
	npm run build && npx typeorm migration:run -d ./dist/data-source.js