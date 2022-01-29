# Scan&Go Backend.

# Dev Getting Started
1. Make sure values are correct in .env file
- If using docker-compose for the postgres db replace the "TYPEORM_URL=" line with
`TYPEORM_URL="postgres://dev-user:password@127.0.0.1:5454/dev-db"`

2. Install deps with YARN. Please use yarn.
`$ yarn`
  - tip: when installing new deps use
  `$ yarn add <Dep_Name> -E`

3. Start The DB docker containers
`$ yarn up`
  - Sometimes you may need to use sudo
  `sudo docker-compose up`

4. Start the backend dev server in another terminal window
`$ yarn dev` or `$ yarn dev:ram`

# Release 
1. Run "standard-version" to
  - generate ChangeLog
  - change package version
  - new git tag
  - create new release commit
`$ yarn release`

## Node Version Manager
This project uses a specific version of node
Please see `.nvmrc` to make sure that you are using the correct node version.
1. Install `nvm`
[For Mac and Linux](https://github.com/nvm-sh/nvm)
[For Windows](https://github.com/coreybutler/nvm-windows)

2. Install this projects node version
`nvm install`

3. (optional) Use the project node version. when switching from a different version
`nvm use`

## DataBase
start database container
`docker-compose up`

stop database container
`docker-compose down`

## Backend Server
- starting the backend server
`npm run dev`

## Recommended Reading
[TypeOrm](https://typeorm.io/#/)

[TypeOrm Migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
