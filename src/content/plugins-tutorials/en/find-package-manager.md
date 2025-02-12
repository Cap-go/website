# Using @capgo/find-package-manager

The `@capgo/find-package-manager` package is a helpful tool for determining which package manager is being used in a given path. This can be useful when working with projects that use different package managers.

Here is a step-by-step tutorial on how to use this package:

## Installation

First, make sure you have Node.js and npm installed on your machine. Then, open your terminal and run the following command to install the `@capgo/find-package-manager` package:

```
npm install @capgo/find-package-manager
```

## Import the package

Once the package is installed, you can import it into your code using the following line:

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'
```

## Find the package manager type

To find the package manager type in a given path, you can use the `findPackageManagerType` function. Here's an example:

```typescript
console.log(findPackageManagerType())
```

The `findPackageManagerType` function returns a string value indicating the type of package manager being used. It can return one of the following values:

- `npm`: if npm is being used
- `yarn`: if yarn is being used
- `pnpm`: if pnpm is being used
- `unknown`: if the package manager type cannot be determined

## Putting it all together

Here's a complete example of how to use the `@capgo/find-package-manager` package:

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'

console.log(findPackageManagerType()) // npm | yarn | pnpm | unknown
```

That's it! You can now use the `@capgo/find-package-manager` package to determine the package manager type in a given path.