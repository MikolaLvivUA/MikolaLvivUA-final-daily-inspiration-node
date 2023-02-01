<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Daily inspiration node api

This is daily inspiration api, user can subscribe and get email with interesting quote every day every day

## Usage

API has  endpoints which you can find in `AWS API Gateway` after deployment

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
✔ Service deployed to stack final-daily-inspiration-node-dev (78s)

endpoints:
  GET - https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev/quotes
  POST - https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev/subscribe
  POST - https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev/static-mailer
  POST - https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev/send-email
  GET - https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev/subscribers
functions:
  quotes: final-daily-inspiration-node-dev-quotes (16 MB)
  subscribe: final-daily-inspiration-node-dev-subscribe (16 MB)
  staticMailer: final-daily-inspiration-node-dev-staticMailer (16 MB)
  sendEmail: final-daily-inspiration-node-dev-sendEmail (16 MB)
  getSubscribers: final-daily-inspiration-node-dev-getSubscribers (16 MB)

```
### Invocation
