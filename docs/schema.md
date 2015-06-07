# Schema information

## List of relations for MVP
|       Table Names
|-------------------
| conversations
| groups
| memberships
| messages
| subscriptions
| users


## Conversations
Column        |   Type    | details |
--------------|-----------|----------
id            | integer   |not null, primary key
title         | string    |not null, indexed
user_id       | integer   |not null, foreign key (references creator)
group_id      | integer   |not null, foreign key (references group context)
privacy_state | integer   |not null, display state attribute

## Groups
Column      |    Type       |details
------------|---------------|-------------
id          | integer       |not null, primary key
user_id     | integer       |not null, indexed
name        | string        |not null
description | text          |not null, default ""

## Memberships

Column     |   Type     |details
-----------|------------|----------------
id         | integer    |not null primary key
user_id    | integer    |not null, foreign key (references creator)
group_id   | integer    |not null, foreign key (references group context)

## Messages

Column          |   Type    |details
----------------|-----------|------------------
id              | integer   |not null, primary key
content         | text      |not null
user_id         | integer   |not null, foreign key (references creator)
conversation_id | integer   |not null, foreign key (references conversation)

## Subcriptions


Column          |  Type   | details
----------------|-------------------------
id              | integer | not null, primary key
user_id         | integer | not null, foreign key (references subscribee)
conversation_id | integer | not null, foreign key (references conversation)


## Users

Column          |   Type  |details
----------------|----------------------------
id              | integer | not null, primary key
username        | string  |not null, indexed, unique
password_digest | string  |not null
session_token   | string  |not null, indexed, unique
