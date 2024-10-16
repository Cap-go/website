---
locale: es
---

Paquete `@capgo/angular-ng-stepper`

El paquete `@capgo/angular-ng-stepper` es una biblioteca para proyectos de Angular que proporciona un componente de stepper. Este componente te permite crear un formulario de varios pasos o una interfaz de usuario similar a un asistente.

## Instalación

Para usar el paquete `@capgo/angular-ng-stepper` en tu proyecto de Angular, sigue estos pasos:

1. Instala el paquete usando npm o yarn:

   [[BLOQUE_DE_CODIGO]]

   o

   [[BLOQUE_DE_CODIGO]]

2. Importa el `NgStepperModule` en tu módulo de Angular:

   [[BLOQUE_DE_CODIGO]]

## Uso

Una vez que hayas instalado e importado el `NgStepperModule`, puedes usar el componente stepper en tus plantillas de Angular.

[[BLOQUE_DE_CODIGO]]

El componente `ng-stepper` actúa como el contenedor para los pasos, mientras que el componente `ng-step` representa un paso individual. Puedes personalizar la etiqueta de cada paso proporcionando el atributo `label`.

## API

El paquete `@capgo/angular-ng-stepper` proporciona varios métodos y opciones de API para interactuar con el componente stepper programáticamente.

### Componente Stepper

#### Propiedades

- `currentStep: number`: El índice del paso actualmente activo.
- `nextButtonText: string`: El texto a mostrar en el botón de siguiente.
- `previousButtonText: string`: El texto a mostrar en el botón de anterior.

#### Métodos

- `goToStep(index: number)`: Cambia programáticamente a un paso específico proporcionando su índice como parámetro.
- `next()`: Mueve al siguiente paso.
- `previous()`: Mueve al paso anterior.
- `reset()`: Restablece el stepper al estado inicial.

### Componente Step

#### Propiedades

- `label: string`: La etiqueta del paso.

## Conclusión

El paquete `@capgo/angular-ng-stepper` proporciona un componente stepper simple y fácil de usar para crear formularios o asistentes de varios pasos en proyectos de Angular. Siguiendo las instrucciones de instalación y uso proporcionadas en este tutorial, puedes integrar rápidamente el paquete en tus propias aplicaciones de Angular.