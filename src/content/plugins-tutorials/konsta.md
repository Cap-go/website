# Using `@capgo/konsta` Package

In this tutorial, we will guide you on how to use the `@capgo/konsta` package to create pixel-perfect mobile UI components with iOS and Material Design components for React, Vue, and Svelte. The `@capgo/konsta` package is built with Tailwind CSS and offers a wide range of UI components that can be easily integrated into your projects.

Follow the steps below to get started:

## Step 1: Install Dependencies

To start using the `@capgo/konsta` package, you need to install all the required dependencies. Open your terminal and navigate to your project directory. Then, run the following command:

```shell
$ npm install @capgo/konsta
```

This command will install the `@capgo/konsta` package and its dependencies in your project.

## Step 2: Import and Use the Components

Once the dependencies are installed, you can import and use the components from the `@capgo/konsta` package in your project. Depending on your framework of choice (React, Vue, or Svelte), follow the relevant steps below:

### React

To use the `@capgo/konsta` components in a React project, import the desired component as shown below:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your React component
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

### Vue

To use the `@capgo/konsta` components in a Vue project, import the desired component as shown below:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Vue component
export default {
  components: {
    Button,
  },
  template: `
    <div>
      <Button>Click me</Button>
    </div>
  `,
};
```

### Svelte

To use the `@capgo/konsta` components in a Svelte project, import the desired component as shown below:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Svelte component
let name = 'world';
```

```html
<script>
  import { Button } from '@capgo/konsta';

  // Use the Button component in your Svelte component
  let name = 'world';
</script>

<main>
  <Button>Hello {name}!</Button>
</main>
```

## Step 3: Customize and Style the Components

The `@capgo/konsta` package provides a wide range of UI components that can be easily customized and styled to match your project's design. You can modify component properties, add custom CSS classes, or apply inline styles to achieve the desired look and feel. Refer to the documentation available at [https://konstaui.com](https://konstaui.com/) for more information on customizing and styling the components.

## Step 4: Build and Test

After integrating the `@capgo/konsta` components into your project, you can build and test your application. Use the relevant build commands for your project to compile the code and generate the production version. Refer to the `package.json` file in your project for available build scripts.

## Conclusion

Congratulations! You have successfully learned how to use the `@capgo/konsta` package to create pixel-perfect mobile UI components in your React, Vue, or Svelte projects. You can explore the documentation and experiment with different components and customization options to enhance your application's user interface.

For further assistance or to report any issues, please refer to the official `@capgo/konsta` documentation and community. Happy coding!
