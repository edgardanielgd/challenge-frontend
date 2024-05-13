docker.build:
	docker build -t quickest-notes-frontend .

docker.run:
	docker run -p 3000:80 quickest-notes-frontend