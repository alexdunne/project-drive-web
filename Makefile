.PHONY: schema

schema:
	npx get-graphql-schema http://localhost:4000/api > schema.graphql
