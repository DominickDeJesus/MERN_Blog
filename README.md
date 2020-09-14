# StoryLine

## Overview

StoryLine is a web app built on the MERN stack to keep track of your goals and mark progress. You use it by creating an account and making a goal with set milestones. With each day you can check off your daily tasks and reflect on that days progress. When th due date is passed the goal will be marked completed.

Using the MERN stack, create a blog application with the following features:

- As a writer, I'd like to be able to login into the system so I can have access to my blog posts.
- As a writer, I'd like to be able to logout of the system so other people won't have access to my blog posts using a public terminal.
- As a writer, I'd like to be able to publish blog entries.
- As a writer, I'd like to be able to edit my existing blog entries.
- As a writer, I'd like to be able to delete one of my existing blog entries.
- As a writer, I'd like to be able to log in and out of my blog so that I can edit and delete my own blog entries.
- As a reader, I'd like to be able to view all the entries of a blog, regardless of whether I am logged in, so that I may easily access a writer's content.
- As a reader, I'd like to be able to comment on all the entires of a blog, regardless of whether I am logged in, so that I can spam entries that I don't like with comments, and pick fights with other users.
- As a reader, I'd like for the app to have simple, visually appealing styling so that I have an enjoyable experience reading.
  Please submit the link to your GitHub repo for this assessment to us here by 5PM on Thursday.

This is a final project for Wyntank and was built for the purpose of education. Below is a list of techonologies used to build the application:

- **MongoDB**
- **Express**
- **React.js**
- **Node.js**
- **Cloudinary**
- **Passport**
- **SendGrid**
- **Mongoose**

## Server API Requests

### Secure

| HTTP Request                    | URL                  | Method |
| ------------------------------- | -------------------- | ------ |
| Create a user                   | /api/users/          | `POST` |
| Login a user                    | /api/users/login     | `POST` |
| Password Reset Request          | /api/password/:token | `GET`  |
| Redirect to password reset page | /api/users/          | `Post` |

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

### Open

| HTTP Request                                  | URL                            | Method   |
| --------------------------------------------- | ------------------------------ | -------- |
| Create a goal                                 | /api/goals                     | `POST`   |
| Get all goals                                 | /api/goals                     | `GET`    |
| Fetch a goal by id                            | /api/goals/:id                 | `Post`   |
| Delete a goal by id                           | /api/goals/:id                 | `DELETE` |
| Update a goal by id                           | /api/goals/:id                 | `PATCH`  |
| Delete a milestone by milestone and goal id   | /api/goal/:gid/milestone/:mid  | `DELETE` |
| Update a milestone by milestone and goal id   | /api/goal/:gid/milestone/:mid  | `PATCH`  |
| Create a milestone by goal id                 | /api/goal/:gid/milestone/      | `POST`   |
| Add a reflection by goal id                   | /api/goal/:gid/reflection/     | `POST`   |
| Delete a reflection by reflection and goal id | /api/goal/:gid/reflection/:rid | `DELETE` |
| Patch a reflection by reflection and goal id  | /api/goal/:gid/reflection/:rid | `PATCH`  |

- **Sample body for `POST` to `/api/goals`**

```javascript
    {
        "description": "Save for a trip",
        "dueDate": "2019-03-01",
        "milestones": [
            {
                "dueDate": "2019-01-01",
                "description": "save a $10 a day"
            },
            {
                "dueDate": "2019-02-01",
                "description": "save a $20 a day"
            },
            {
                "dueDate": "2019-03-01",
                "description": "save a $30 a day"
            }
        ],
        "category": "Finance"
    }
```

- \*notes: `category` can only have a value of:
  `[ 'Fitness', 'Education', 'Finance', 'Professional', 'Social', 'Health' ]`

## Example Goal Collection

![Goal Example](https://i.imgur.com/xpVlHYw.jpg)

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

## To deploy

NOTE: Heroku specifically runs `npm start`, so don't remove that from your package.json file.

- `heroku create your-app-name`
- `heroku config:set MONGODB_URL=<insertYourAtlasDbUri>`
- `git push heroku master`

## Authors

- Dominick DeJesus
- Frances Dalla Torre
- Tyler Gribble
