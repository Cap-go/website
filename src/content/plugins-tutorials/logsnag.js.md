# Using @capgo/logsnag Package

The `@capgo/logsnag` package is a powerful tool for getting notifications and tracking project events. This tutorial will guide you through the installation and usage of the package.

## Installation

To install the `@capgo/logsnag` package, open your terminal and run the following command:

```sh
npm install --save @capgo/logsnag
```

## Usage

### Import Library

To use the `@capgo/logsnag` package in your project, you need to import it. Add the following import statement at the beginning of your JavaScript file:

```js
import { LogSnag } from '@capgo/logsnag';
```

### Initialize Client

Before you can start using the features of `@capgo/logsnag`, you need to initialize a client. Use the following code to initialize a client:

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
Replace `YOUR_API_TOKEN` with your actual API token and `YOUR_PROJECT_NAME` with the name of your project.

### Publish Event

To publish an event using `@capgo/logsnag`, use the `publish` method of the `logsnag` object. Here's an example code snippet that publishes an event:

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
Customize the values of the properties according to your specific event. You can specify the channel, event name, icon, tags, and whether to notify or not.

### Publish Insight

In addition to events, you can also publish insights using `@capgo/logsnag`. Insights provide valuable information and statistics about your project. Here's an example code snippet that publishes an insight:

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
Modify the values of the properties to match your insight. You can specify the title, value, and icon.

That's it! You have now learned how to install and use the `@capgo/logsnag` package in your project. Enjoy tracking your project events and receiving notifications with ease!