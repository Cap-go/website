---
title: 暗号化
description: Cifrado de datos con nuevo método de encriptación
sidebar:
  order: 5
locale: es
---

Esta documentación explicará cómo cifrar sus datos con el nuevo sistema de cifrado y eliminar el antiguo

Aprenda más sobre el nuevo sistema de cifrado en el [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Primero, cree un nuevo par de claves con el siguiente comando:

```bash
npx @capgo/cli key create
```

Este comando creará un nuevo par de claves en su aplicación; es imperativo almacenar la clave privada en un lugar seguro. Nunca se debe confirmar la clave privada en el control de código fuente ni compartirla con terceros no confiables

Este comando también eliminará la clave antigua de su configuración de Capacitor, pero no eliminará los archivos de la clave antigua. El CLI los mantiene para permitirle continuar enviando actualizaciones en vivo para las aplicaciones que no han recibido una actualización de la tienda de aplicaciones y aún están usando el complemento antiguo. Esto facilita la migración

Cuando la migración le pregunte "¿Desea configurar el cifrado con el nuevo canal para admitir aplicaciones antiguas y facilitar la migración?", por favor acepte. Esto agregará una nueva opción "defaultChannel" a su configuración de Capacitor. Esto hará que su aplicación use el canal "encryption_v2". Esto asegurará que el nuevo cifrado sea utilizado solo por aplicaciones que lo soporten. Las aplicaciones que no han recibido una actualización de la tienda de aplicaciones continuarán usando el canal predeterminado anterior

---

Ahora, necesita construir su paquete JS y subirlo al nuevo canal. Por favor ejecute el siguiente comando:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Luego, ejecute este comando para permitir que las aplicaciones se autoasignen al canal "encryption_v2"

:::caution
Esto es necesario para que la nueva opción "defaultChannel" funcione
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Ahora puede ejecutar la aplicación; utilizará el nuevo sistema de cifrado

Para subir el nuevo paquete JS al canal antiguo, solo necesita ejecutar el siguiente comando:

```bash
npx @capgo/cli bundle upload --channel production
```

---

No necesita preocuparse por la configuración de Capacitor, nunca se sube a Capgo

Cuando todos los usuarios hayan actualizado sus aplicaciones (puede tomar hasta 3/4 meses), puede eliminar el "defaultChannel" de su configuración de Capacitor

Y luego, puede eliminar el canal antiguo con el siguiente comando:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Después de eliminar el canal "encryption_v2", todas las aplicaciones que lo usen como predeterminado comenzarán a usar el canal "production"