# Using @capgo/standard-version Package Tutorial

In this tutorial, we will learn how to use the `@capgo/standard-version` package for managing version numbers in your project. The `@capgo/standard-version` package is a tool that automates versioning your project based on the [conventional commit specification](https://www.conventionalcommits.org/).

Let's get started!

## Step 1: Installation

To install the `@capgo/standard-version` package, run the following command in your terminal:

```bash
npm install @capgo/standard-version --save-dev
```

This will add the package as a dev dependency in your project.

## Step 2: Configuration

To configure the `@capgo/standard-version` package, create a `release.config.js` file in the root directory of your project with the following content:

```javascript
module.exports = {
  preset: 'capgo',
};
```

This configuration specifies the preset to be used for versioning. In this case, we use the `capgo` preset which is a customized preset for the `@capgo/standard-version` package.

## Step 3: Versioning

To create a new version of your project, run the following command:

```bash
npx standard-version
```

This will analyze your commit history and automatically generate a new version number for your project based on the conventional commits. It will also update the `CHANGELOG.md` file with the latest changes.

## Step 4: Release

To create a release, run the following command:

```bash
npx standard-version --release-as 1.0.0
```

Replace `1.0.0` with the desired version number for your release. This command will update the version number in your package.json file, create a git tag for the release, and update the `CHANGELOG.md` file.

## Conclusion

Congratulations! You have successfully learned how to use the `@capgo/standard-version` package for managing version numbers in your project. This package automates the versioning process and makes it easier to keep track of changes in your project.

For more information, you can refer to the `@capgo/standard-version` package documentation.

Happy versioning!