---
locale: de
---

sing @capgo/angular-ng-stepper Paket

Das `@capgo/angular-ng-stepper` Paket ist eine Bibliothek für Angular-Projekte, die eine Stepper-Komponente bereitstellt. Diese Komponente ermöglicht es Ihnen, ein mehrstufiges Formular oder eine wizardartige Benutzeroberfläche zu erstellen.

## Installation

Um das `@capgo/angular-ng-stepper` Paket in Ihrem Angular-Projekt zu verwenden, befolgen Sie diese Schritte:

1. Installieren Sie das Paket mit npm oder yarn:

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   oder

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2. Importieren Sie das `NgStepperModule` in Ihr Angular-Modul:

   ```typescript
   import { NgStepperModule } from '@capgo/angular-ng-stepper';
   
   @NgModule({
     imports: [
       NgStepperModule
     ]
   })
   export class AppModule { }
   ```

## Verwendung

Sobald Sie das `NgStepperModule` installiert und importiert haben, können Sie die Stepper-Komponente in Ihren Angular-Vorlagen verwenden.

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

Die `ng-stepper` Komponente fungiert als Container für die Schritte, während die `ng-step` Komponente einen einzelnen Schritt darstellt. Sie können das Label jedes Schrittes anpassen, indem Sie das `label` Attribut angeben.

## API

Das `@capgo/angular-ng-stepper` Paket bietet mehrere API-Methoden und Optionen, um programmgesteuert mit der Stepper-Komponente zu interagieren.

### Stepper-Komponente

#### Eigenschaften

- `currentStep: number`: Der Index des aktuell aktiven Schrittes
- `nextButtonText: string`: Der Text, der auf der Schaltfläche "Weiter" angezeigt wird
- `previousButtonText: string`: Der Text, der auf der Schaltfläche "Zurück" angezeigt wird

#### Methoden

- `goToStep(index: number)`: Programmgesteuert zu einem bestimmten Schritt wechseln, indem sein Index als Parameter bereitgestellt wird
- `next()`: Zum nächsten Schritt wechseln
- `previous()`: Zum vorherigen Schritt wechseln
- `reset()`: Den Stepper in den Ausgangszustand zurücksetzen

### Schritt-Komponente

#### Eigenschaften

- `label: string`: Das Label des Schrittes

## Fazit

Das `@capgo/angular-ng-stepper` Paket bietet eine einfache und benutzerfreundliche Stepper-Komponente zum Erstellen von mehrstufigen Formularen oder Wizards in Angular-Projekten. durch Befolgen der Installations- und Verwendungshinweise in diesem Tutorial können Sie das Paket schnell in Ihre eigenen Angular-Anwendungen integrieren.