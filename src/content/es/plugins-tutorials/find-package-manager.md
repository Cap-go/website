---
locale: es
---

cantar @capgo/find-package-manager

El paquete `@capgo/find-package-manager` es una herramienta útil para determinar qué gestor de paquetes se está utilizando en una ruta dada. Esto puede ser útil al trabajar con proyectos que usan diferentes gestores de paquetes.

Aquí hay un tutorial paso a paso sobre cómo utilizar este paquete:

## Instalación

Primero, asegúrate de tener Nodejs y npm instalados en tu máquina. Luego, abre tu terminal y ejecuta el siguiente comando para instalar el paquete `@capgo/find-package-manager`:

[[BLOQUE_DE_CÓDIGO]]

## Importar el paquete

Una vez que el paquete esté instalado, puedes importarlo en tu código utilizando la siguiente línea:

[[BLOQUE_DE_CÓDIGO]]

## Encontrar el tipo de gestor de paquetes

Para encontrar el tipo de gestor de paquetes en una ruta dada, puedes usar la función `findPackageManagerType`. Aquí hay un ejemplo:

[[BLOQUE_DE_CÓDIGO]]

La función `findPackageManagerType` devuelve un valor de cadena que indica el tipo de gestor de paquetes que se está utilizando. Puede devolver uno de los siguientes valores:

- `npm`: si se está usando npm
- `yarn`: si se está usando yarn
- `pnpm`: si se está usando pnpm
- `unknown`: si no se puede determinar el tipo de gestor de paquetes

## Resumiendo

Aquí hay un ejemplo completo de cómo usar el paquete `@capgo/find-package-manager`:

[[BLOQUE_DE_CÓDIGO]]

¡Eso es todo! Ahora puedes usar el paquete `@capgo/find-package-manager` para determinar el tipo de gestor de paquetes en una ruta dada.