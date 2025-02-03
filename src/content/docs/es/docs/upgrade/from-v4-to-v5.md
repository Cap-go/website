---
title: Da V4 a V5
description: Cómo migrar de V4 a V5
sidebar:
  order: 2
locale: es
---

## Por qué esta actualización

Esta versión principal está aquí para seguir la versión principal de Capacitor

Primero sigue la guía de migración de Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Instalación

`npm i @capgo/capacitor-updater@5`

`Luego sincroniza la actualización del código nativo:`

`npx cap sync`

¡Eso es todo! ¡Bastante fácil!

## Modo manual

Si estabas obteniendo la actualización por ti mismo con getLatest, hay un pequeño cambio
Ahora si ya estás actualizado, entrará en catch
Cualquier respuesta diferente a actualización disponible hará eso