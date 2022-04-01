<h1 align="center">
  <br>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_eimUX98YCqnw0tFLXbbCVkrGfZevLgMmhQ&usqp=CAU" alt="API" width="200">
  <br>
  <br>
  <br>
</h1>

## Florida Health Facility API

Simple Node.js API based on Koa.js to get all the facilities, search and fetch details for the facilities. In this project primary data source for searching is mysql and secondarily this project uses scrapping using Puppeteer. For file upload this project uses AWS S3.

## Installation

- Clone the repository: `https://github.com/akibtanjim/florida-health-api.git`
- Copy `.env.example`to `.env`. Fill this with appropriate value
- In order to be able to use S3 locally use localstack. To run S3 locally make sure docker is up and running. Then create a `docker-compose.yml` in any directory of your choice. Below is a sample `docker-compose.yml`
  ```
      version: '3'
      services:
        localstack:
          image: localstack/localstack:0.12.2
          ports:
            - "4566-4599:4566-4599"
            - "${PORT_WEB_UI-8080}:${PORT_WEB_UI-8080}"
          environment:
            - SERVICES=${SERVICES- }
            - DEBUG=${DEBUG- }
            - DATA_DIR=${DATA_DIR- }
            - PORT_WEB_UI=${PORT_WEB_UI- }
            - LAMBDA_EXECUTOR=${LAMBDA_EXECUTOR- }
            - KINESIS_ERROR_PROBABILITY=${KINESIS_ERROR_PROBABILITY- }
            - DOCKER_HOST=unix:///var/run/docker.sock
            - HOST_TMP_FOLDER=${TMPDIR}
          volumes:
            - "${TMPDIR:-/tmp/localstack}:/tmp/localstack"
            - "/var/run/docker.sock:/var/run/docker.sock"
  ```
- Run : `docker-compose up -d`
- Installl awslocal cli in your machine
- Next step is to create s3 bucket. Use the following command in order to do so `awslocal --endpoint-url=http://localhost:4566 s3 mb s3://your-bucket-name`
- Set `LOCAL_S3_UPLOAD_URL=http://localhost:4566` in your local `.env`
- Run `npm i`
- Run `npm start`
- Project url: `http://localhost:YOUR_PORT_IN_ENV`
- Postman Collection: `Folrida Health APP.postman_collection.json`
