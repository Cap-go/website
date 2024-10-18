---
locale: it
---

Cantando el paquete `@capgo/angular-ng-stepper`

El paquete `@capgo/angular-ng-stepper` es una biblioteca para proyectos Angular que proporciona un componente stepper. Este componente permite crear un formulario de múltiples pasos o una interfaz de usuario similar a un asistente.

## Instalación

Para usar el paquete `@capgo/angular-ng-stepper` en tu proyecto Angular, sigue estos pasos:

1. Instala el paquete usando npm o yarn:

   [[BLOQUE_CODIGO]]

   o

   [[BLOQUE_CODIGO]]

2. Importa el `NgStepperModule` en tu módulo Angular:

   [[BLOQUE_CODIGO]]

## Uso

Una vez que hayas instalado e importado el `NgStepperModule`, puedes usar el componente stepper en tus plantillas de Angular.

[[BLOQUE_CODIGO]]

El componente `ng-stepper` actúa como el contenedor para los pasos, mientras que el componente `ng-step` representa un paso individual. Puedes personalizar la etiqueta de cada paso proporcionando el atributo `label`.

## API

El paquete `@capgo/angular-ng-stepper` proporciona varios métodos y opciones de API para interactuar con el componente stepper programáticamente.

### Componente Stepper

#### Propiedades

- `currentStep: number`: El índice del paso actualmente activo.
- `nextButtonText: string`: El texto a mostrar en el botón siguiente.
- `previousButtonText: string`: El texto a mostrar en el botón anterior.

#### Métodos

- `goToStep(index: number)`: Cambia programáticamente a un paso específico proporcionando su índice como parámetro.
- `next()`: Mueve al siguiente paso.
- `previous()`: Mueve al paso anterior.
- `reset()`: Restablece el stepper al estado inicial.

### Componente Step

#### Propiedades

- `label: string`: La etiqueta del paso.

## Conclusión

El paquete `@capgo/angular-ng-stepper` proporciona un componente stepper simple y fácil de usar para crear formularios de múltiples pasos o asistentes en proyectos Angular. Siguiendo las instrucciones de instalación y uso proporcionadas en este tutorial, puedes integrar rápidamente el paquete en tus propias aplicaciones Angular.