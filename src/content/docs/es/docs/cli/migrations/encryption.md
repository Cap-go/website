---
title: Encriptación
description: Cómo cifrar tus datos con el nuevo cifrado
sidebar:
  order: 5
locale: es
---

Esta documentación explicará cómo cifrar tus datos con el nuevo sistema de cifrado y eliminar el anterior

Aprende más sobre el nuevo sistema de cifrado en el [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Primero, crea un nuevo par de claves con el siguiente comando:

```bash
npx @capgo/cli key create
```

Este comando creará un nuevo par de claves en tu aplicación; es imperativo almacenar la clave privada en un lugar seguro. Nunca se debe confirmar la clave privada en el control de código fuente ni compartirla con terceros no confiables

Este comando también eliminará la clave antigua de tu configuración de Capacitor, pero no eliminará los archivos de la clave antigua. El CLI los mantiene para permitirte continuar enviando actualizaciones en vivo para las aplicaciones que no han recibido una actualización de la tienda de aplicaciones y que todavía utilizan el plugin anterior. Esto facilita la migración

Cuando la migración te pregunte "¿Quieres configurar el cifrado con el nuevo canal para admitir aplicaciones antiguas y facilitar la migración?", por favor acepta. Esto agregará una nueva opción "defaultChannel" a tu configuración de Capacitor. Esto hará que tu aplicación use el canal "encryption_v2". Esto asegurará que el nuevo cifrado sea utilizado solo por aplicaciones que lo soporten. Las aplicaciones que no han recibido una actualización de la tienda de aplicaciones continuarán usando el canal predeterminado anterior

---

Ahora, necesitas construir tu paquete JS y subirlo al nuevo canal. Por favor, ejecuta el siguiente comando:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Luego, ejecuta este comando para permitir que las aplicaciones se auto-asignen al canal "encryption_v2"

:::caution
Esto es necesario para que la nueva opción "defaultChannel" funcione
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Ahora puedes ejecutar la aplicación; utilizará el nuevo sistema de cifrado

Para subir el nuevo paquete JS al canal antiguo, solo necesitas ejecutar el siguiente comando:

```bash
npx @capgo/cli bundle upload --channel production
```

---

No necesitas preocuparte por la configuración de Capacitor, nunca se sube a Capgo

Cuando todos los usuarios hayan actualizado sus aplicaciones (puede tomar hasta 3/4 meses), puedes eliminar el "defaultChannel" de tu configuración de Capacitor

Y luego, puedes eliminar el canal antiguo con el siguiente comando:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Después de eliminar el canal "encryption_v2", todas las aplicaciones que lo usen como predeterminado comenzarán a usar el canal "production"