# Blah Blah Blog...

## Overview

This is a simple MERN Stack blog web app. A user can post comments, post blogs, and view others blogs. This was done within four days as a coding assessment. Below were the requirements of the web app:

- As a writer, I'd like to be able to login into the system so I can have access to my blog posts.
- As a writer, I'd like to be able to logout of the system so other people won't have access to my blog posts using a public terminal.
- As a writer, I'd like to be able to publish blog entries.
- As a writer, I'd like to be able to edit my existing blog entries.
- As a writer, I'd like to be able to delete one of my existing blog entries.
- As a writer, I'd like to be able to log in and out of my blog so that I can edit and delete my own blog entries.
- As a reader, I'd like to be able to view all the entries of a blog, regardless of whether I am logged in, so that I may easily access a writer's content.
- As a reader, I'd like to be able to comment on all the entires of a blog, regardless of whether I am logged in, so that I can spam entries that I don't like with comments, and pick fights with other users.
- As a reader, I'd like for the app to have simple, visually appealing styling so that I have an enjoyable experience reading.

## Some of Technologies

- **MongoDB**
- **Express**
- **React.js**
- **Node.js**
- **Cloudinary**
- **Passport**
- **SendGrid**
- **Mongoose**

## Server API Requests

### Open

| HTTP Request                              | URL                            | Method |
| ----------------------------------------- | ------------------------------ | ------ |
| Create a user                             | /api/users/                    | `POST` |
| Login a user                              | /api/users/login               | `POST` |
| Password Reset Request                    | /api/password/:token           | `GET`  |
| Redirect to password reset page           | /api/users/                    | `Post` |
| Get all public entries                    | /api/public/entries            | `GET`  |
| Get all public entries of user by user id | /api/public/entries/:uid       | `GET`  |
| Create a comment by entry id              | /api/public/entry/:eid/comment | `POST` |

- **Sample body for `POST` to `/api/users`**

```javascript
{
    "name": "Nick Miller",
    "email": "NickMiller@test.com",
    "password": "HelloWorld"
}
```

- **Sample body for `POST` to `/api/users/login`**

```javascript
{
    "name": "Nick Miller",
    "email": "NickMiller@test.com",
    "password": "HelloWorld"
}
```

### Closed

| HTTP Request                 | URL              | Method   |
| ---------------------------- | ---------------- | -------- |
| Create an entry              | /api/entries     | `POST`   |
| Get all current user entries | /api/entries     | `GET`    |
| Fetch an entry by id         | /api/entries/:id | `Post`   |
| Delete an entry by id        | /api/entries/:id | `DELETE` |
| Update an entry by id        | /api/entries/:id | `PATCH`  |

- **Sample body for `POST` to `/api/goals`**

```javascript
    {
        "title": "This is an example",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla elit, fermentum eget accumsan vel, rhoncus non quam. ",
        "isPublic": "true"
    }
```

## Setup

- `git clone` this repo
- `cd` into it.
- `yarn install`
- `cd client && yarn install`
- `cp .env.sample .env`
- edit values in .env

## Available build commands

- `yarn dev`: Runs BOTH your Express.JS and React developer environment locally at the same time. Any logs coming from Express will be prefaced with `[0]`, any logs from `create-react-app` will be prefaced with `[1]`.
- `yarn server`: Runs JUST your Express.JS server.
- `yarn client`: Runs JUST your front-end React app.
  Open [http://localhost:3000](http://localhost:3000) to view your local React app in the browser. The page will reload if you make edits.
