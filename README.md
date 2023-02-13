# DoTODOs

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is created to control your TODO list.

Here you can:

- Create TODO
- Edit TODO
- Delete TODO
- Set deadlines for your TODO and see if it is overdue
- Mark TODO as completed
- Manage your TODO by calendar

## Technologies

Project is created with:

Client:

- react, react-dom (v.18.2.0)
- react-redux (v.8.0.5)
- @mui/material (v.5.10.13)
- @apollo/client (v.3.7.1)

Server:

- node.js (v.16.15.1)
- graphql (v.15.8.0)
- express (v.4.18.2)
- express-graphql (v.0.12.0)
- cors (v.2.8.5)
- mongoose (v.6.7.5)

Build:

- webpack (v.5.75.0)
- babel
- eslint, prettier

## Setup

To run this project, install it locally using npm:

Install dependencies:

```
$ npm install
```

Start server:

```
$ npm run server
```

Start client (development version):

```
$ npm run start
```

Start client (production version):

```
$ npm run start:prod
```

Build production version:

```
$ npm run build:prod
```
