---
locale: fr
---

chanter @capgo/angular-ng-stepper

Le package `@capgo/angular-ng-stepper` est une bibliothèque pour les projets Angular qui fournit un composant pas à pas. Ce composant vous permet de créer un formulaire en plusieurs étapes ou une interface utilisateur de type assistant.

##Installation

Pour utiliser le package `@capgo/angular-ng-stepper` dans votre projet Angular, suivez ces étapes :

1 Installez le package à l'aide de npm ou de fil :

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   ou

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2 Importez le `NgStepperModule` dans votre module Angular :

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

Une fois que vous avez installé et importé le `NgStepperModule`, vous pouvez utiliser le composant stepper dans vos modèles Angular

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

Le composant `ng-stepper` agit comme un conteneur pour les étapes, tandis que le composant `ng-step` représente une étape individuelle. Vous pouvez personnaliser l'étiquette de chaque étape en fournissant l'attribut `label`

##API

Le package `@capgo/angular-ng-stepper` fournit plusieurs méthodes et options API pour interagir avec le composant pas à pas par programme

### Composant pas à pas

#### Propriétés

- `currentStep: number` : L'index de l'étape actuellement active
- `nextButtonText: string` : Le texte à afficher sur le bouton suivant
- `previousButtonText: string` : Le texte à afficher sur le bouton précédent

#### Méthodes

- `goToStep(index: number)` : passer par programme à une étape spécifique en fournissant son index en paramètre
- `next()` : Passer à l'étape suivante
- `previous()` : Passer à l'étape précédente
- `reset()` : Réinitialise le stepper à l'état initial

### Composant d'étape

#### Propriétés

- `label:string` : Le label de l'étape

## Conclusion

Le package `@capgo/angular-ng-stepper` fournit un composant pas à pas simple et facile à utiliser pour créer des formulaires ou des assistants en plusieurs étapes dans des projets Angular. En suivant les instructions d'installation et d'utilisation fournies dans ce didacticiel, vous pouvez rapidement intégrer le package dans vos propres applications angulaires