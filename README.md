# PostApp REST API

### How to use it

---

## Requirements

You will need install `Node.js`, `npm` and `MongoDB` in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following commands.

    $ node

    $ npm

### MongoDB

Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)

## Project installation and usage

    $ git clone github repo link
    $ cd post-app-server
    $ npm install

Remove `.sample` extension from configuration files located in `/config/env/`
`sh
    dev.env.sample -> dev.env
    prod.env.sample -> prod.env
    `

## Running the project

    $ npm start

## Making requests

### `By default, the API_HOST is http://localhost:3001`

#### Create a new user (register)

request url `API_HOST/user`

request method `POST`

request body
`{`
email: `{String}` (required)
password: `{String}` (required)
name: `{String}` (required)
surname: `{String}` (required)
`}`

#### Update user password

request url `API_HOST/user/password`

request method `PUT`

request body
`{`
oldPassword: `{String}`
newPassword: `{String}`
confirmNewPassword: `{String}`
`}`

#### Sign in

request url `API_HOST/user/sign-in`

request method `POST`

request body
`{`
email: `{String}` (required)
password: `{String}` (required)
`}`

#### Sign out

request url `API_HOST/user/sign-out`

request method `POST`

request body
`{`
jwt: `{JWT string}` (required)
`}`

#### Get user info

request url `API_HOST/user`

request method `GET`

#### Update user info

request url `API_HOST/user`

request method `PUT`

request body
`{`
name: `{String}`
surname: `{String}`
`}`

#### Refresh token

request url `API_HOST/user/:id/token`

request method `PUT`

request body
`{`
refreshToken: `{string}` (required)
`}`

#### Create a new post

request url `API_HOST/post`

request method `POST`

request body
`{`
authorName: `{String}`, (required)
authorSurname: `{String}`, (required)
content: `{String}`, (required)
privacy: `{String}`, (required)
category: `{String}` (required)
`}`

#### Get all posts or search

request url `API_HOST/post`,
in case of search add query
request url `API_HOST/post` + query

request method `GET`

##### The following filters and sortings are allowed

`{`

category: `OneOf['GENERAL', 'SPORTS', 'NEWS', 'MUSIC', 'POLITICS']`,

search: `{searchString}`,

date: `OneOf['TODAY', 'THIS_WEEK', 'THIS_MONTH']`,

sort: `OneOf['creation_date_oldest_first', 'creation_date_newest_first', 'rating_highest_first', 'rating_lowest_first']`,

`}`

#### Delete the post
request url `API_HOST/post/:postId`
request method `DELETE`

#### Update a post
request url `API_HOST/post/:postId`
request method `PUT`
request body 
`{`
content: `{String}`,
privacy: `{String}`,
category: `{String}`
`}`  

#### Rate a post
request url `API_HOST/post/ratePost/:postId`
request method `PUT`
request body 
`{`
rating: `{Number}`, (required)
`}` 

#### Rate a comment
request url `API_HOST/post/rateComment/:postId`
request method `PUT`
request body 
`{`
rating: `{Number}`, (required)
commentId: `{String}`, (required)
parentCommentId: `{String}`, (required)
`}`  

#### Add a comment
request url `API_HOST/post/addComment/:postId`
request method `PUT`
request body 
`{`
content: `{String}`, (required)
parentCommentId: `{String}`,
parentId: `{String}`,
authorName: `{String}`, (required)
authorSurname: `{String}`, (required)
`}`  

#### Remove a comment
request url `API_HOST/post/removeComment/:postId`
request method `PUT`
request body 
`{`
commentId: `{String}`, (required)
parentCommentId: `{String}`
`}`  

#### Edit a comment
request url `API_HOST/post/editComment/:postId`
request method `PUT`
request body 
`{`
content: `{String}`, (required)
commentId: `{String}`, (required)
parentCommentId: `{String}`, (required)
`}`