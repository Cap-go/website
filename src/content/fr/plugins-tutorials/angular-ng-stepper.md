---
locale: fr
---

Chanter le package @capgo/angular-ng-stepper

Le package `@capgo/angular-ng-stepper` est une bibliothèque pour les projets Angular qui fournit un composant stepper. Ce composant vous permet de créer un formulaire multi-étapes ou une interface utilisateur de type assistant.

## Installation

Pour utiliser le package `@capgo/angular-ng-stepper` dans votre projet Angular, suivez ces étapes :

1. Installez le package en utilisant npm ou yarn :

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   ou

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2. Importez le `NgStepperModule` dans votre module Angular :

   ```typescript
   import { NgStepperModule } from '@capgo/angular-ng-stepper';
   
   @NgModule({
     imports: [
       NgStepperModule
     ]
   })
   export class AppModule { }
   ```

## Utilisation

Une fois que vous avez installé et importé le `NgStepperModule`, vous pouvez utiliser le composant stepper dans vos templates Angular.

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

Le composant `ng-stepper` agit comme le conteneur pour les étapes, tandis que le composant `ng-step` représente une étape individuelle. Vous pouvez personnaliser l'étiquette de chaque étape en fournissant l'attribut `label`.

## API

Le package `@capgo/angular-ng-stepper` fournit plusieurs méthodes et options API pour interagir avec le composant stepper de manière programmatique.

### Composant Stepper

#### Propriétés

- `currentStep: number`: L'index de l'étape actuellement active.
- `nextButtonText: string`: Le texte à afficher sur le bouton suivant.
- `previousButtonText: string`: Le texte à afficher sur le bouton précédent.

#### Méthodes

- `goToStep(index: number)`: Passer de manière programmatique à une étape spécifique en fournissant son index comme paramètre.
- `next()`: Passer à l'étape suivante.
- `previous()`: Passer à l'étape précédente.
- `reset()`: Réinitialiser le stepper à l'état initial.

### Composant Step

#### Propriétés

- `label: string`: L'étiquette de l'étape.

## Conclusion

Le package `@capgo/angular-ng-stepper` fournit un composant stepper simple et facile à utiliser pour créer des formulaires ou des assistants multi-étapes dans des projets Angular. En suivant les instructions d'installation et d'utilisation fournies dans ce tutoriel, vous pouvez rapidement intégrer le package dans vos propres applications Angular.