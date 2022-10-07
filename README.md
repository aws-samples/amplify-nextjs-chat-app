## Modern Chat app Frontend

🚨 Note that this project does not create our backend services via the Amplify CLI, but relies on exported values from the AWS CDK.

🚨 This application is part of a blog post that explains both the frontend and the backend as a whole. The backend repo can be found [here](https://github.com/Focus-Otter/fullstack-cdk-helpers/blob/main/README.md)

![ezgif-5-31ccf9d033](https://user-images.githubusercontent.com/5106417/184162547-1a3ab9b4-8f91-4a81-be58-f6af35469e02.gif)

## Overview

This repo is the frontend to building a fullstack chat app. The backend can be found [here](https://github.com/Focus-Otter/chat-cdk-backend).

![image](https://user-images.githubusercontent.com/5106417/184164922-9cbe806e-bb41-4341-89f5-eb419df915b3.png)

## Tech Stack

- React Framework: NextJS
- UI Library: AWS Amplify UI primitives
- API: GraphQL via AWS AppSync
- File uploads: Sent to Amazon S3
- Signup/SignIn: Managed with Cognito
- Backend Binding: amplify-js

## Steps to get started

Once [the backend ](https://github.com/Focus-Otter/fullstack-cdk-helpers/blob/main/README.md) is deployed, it will output a set of values. The outputted values are what you'll need to get this project working.

1. Run `amplify init`
2. Run `amplify add codegen --apiId YOUR_APPID` (value generated from the backend)
3. `amplify codegen` (accept the defaults, but set the max-depth to 4)
4. Create a `src/aws-exports.js` file and bring over the values from your CDK backend and ensure your project looks like the `sample.aws-exports.js` file.
5. Run the app and create 2 users
6. Once signed in, create a room.
7. You should now be able to view the rooms on the homepage. Click one and begin creating messages.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
