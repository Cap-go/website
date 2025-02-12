# Using @capgo/angular-ng-stepper Package

The `@capgo/angular-ng-stepper` package is a library for Angular projects that provides a stepper component. This component allows you to create a multi-step form or wizard-like user interface.

## Installation

To use the `@capgo/angular-ng-stepper` package in your Angular project, follow these steps:

1. Install the package using npm or yarn:

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   or

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2. Import the `NgStepperModule` in your Angular module:

   ```typescript
   import { NgStepperModule } from '@capgo/angular-ng-stepper';
   
   @NgModule({
     imports: [
       NgStepperModule
     ]
   })
   export class AppModule { }
   ```

## Usage

Once you have installed and imported the `NgStepperModule`, you can use the stepper component in your Angular templates.

```html
<ng-stepper>
  <ng-step label="Step 1">
    Step 1 Content
  </ng-step>
  <ng-step label="Step 2">
    Step 2 Content
  </ng-step>
  <ng-step label="Step 3">
    Step 3 Content
  </ng-step>
</ng-stepper>
```

The `ng-stepper` component acts as the container for the steps, while the `ng-step` component represents an individual step. You can customize the label of each step by providing the `label` attribute.

## API

The `@capgo/angular-ng-stepper` package provides several API methods and options to interact with the stepper component programmatically.

### Stepper Component

#### Properties

- `currentStep: number`: The index of the currently active step.
- `nextButtonText: string`: The text to display on the next button.
- `previousButtonText: string`: The text to display on the previous button.

#### Methods

- `goToStep(index: number)`: Programmatically switch to a specific step by providing its index as a parameter.
- `next()`: Move to the next step.
- `previous()`: Move to the previous step.
- `reset()`: Reset the stepper to the initial state.

### Step Component

#### Properties

- `label: string`: The label of the step.

## Conclusion

The `@capgo/angular-ng-stepper` package provides a simple and easy-to-use stepper component for creating multi-step forms or wizards in Angular projects. By following the installation and usage instructions provided in this tutorial, you can quickly integrate the package into your own Angular applications.