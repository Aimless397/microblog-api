<div id="top"></div>


# Microblog-api

## About The Project

Microblog-api consists in a REST service which allows to a user read, create, update or delete a post depending on whether it is authenticated. Also it allow to create comments for any post, and create a reaction and a draft for posts and comments.

<p align="right">(<a href="#top">back to top</a>)</p>

The main entities used in the API Postman Documentation will be:

* Auth
* Users
* Posts
* Comments

##

### Auth
Manage user authentication endpoints:

* Login
* Logout

### Users
Manage user endpoints:

* GetAll
* Profile
* Create
* Update
* Verify


### Posts
Manage post endpoints:

* GetAll
* FindOne
* Create
* Draft
* Update
* Reaction
* Delete

### Comments
Manage comment endpoints:

* GetAll
* Create
* Draft
* Update
* Reaction
* Delete

##

## Built With

This repository was built using these main technologies.

* [Express.js](https://expressjs.com//)
* [Jest.js](https://jestjs.io/)
* [TypeScript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.
### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation
_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
1. Get a free API Key at [https://signup.sendgird.com](https://signup.sendgrid.com)
2. Clone the repo
   ```sh
   
   git clone https://github.com/Aimless397/microblog-api.git
   ```
3. Install NPM packages
   ```sh
   
   npm install
   ```
4. Enter your API in `.env`
   ```js
   
   const SENDGRID_API_KEY = 'ENTER YOUR API';
   ```
5. Create a Postgre DB and setup connection
   ```sh
   
   DATABASE_URL = postgresql://username:password@localhost:port/DB_NAME?schema-public
   PORT= default(5432)
   ```
6. Install PrismaCLI and execute Prisma Migration tool.
   ```
   npm install @prisma/cli --save-dev
   npx prisma migrate dev
   ```
7. To run tests, use the following
  
  ```
  npm run test
  ```
  Run tests collecting coverage:
  ```
  npm run test:coverage
  ```
 <p align="right">(<a href="#top">back to top</a>)</p>
 
<!-- USAGE EXAMPLES -->
## Usage

_For examples of the endpoints, please check the [Documentation](https://documenter.getpostman.com/view/13158230/UVkqtFT1)_
<p align="right">(<a href="#top">back to top</a>)</p>
