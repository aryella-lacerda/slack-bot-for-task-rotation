<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v2
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Slack Bot for Task Rotation (v1.0.0)

## Using AWS and the Serverless Framework

This bot was created to solve the minor but ever-present problem of remembering whose turn it is do do X task today. This is a simple but reasonable implementation using AWS services such as Lambda, DynamoDB, and API Gateway.

Feed two (four) birds with one scone:

- solve the annoying whose-turn-is-it problem
- learn how Slack apps/commands work
- practice using the Serverless framework
- practice making use of AWS services

## What's the plan?

The plan is to be able to execute this slash command on a given channel:

`/rotate @user.a, @user.b, @user.c, @user.d for daily meeting host`

And every week day at 12 PM UTC, the channel should receive a notification like:

`@user.a, you're up for daily meeting host!`
