---
title: "De V6 a V7"
locale: es
description: "Una guía detallada sobre la transición de la versión 6 a la versión 7 del actualizador de Capgo, describiendo los pasos necesarios y las consideraciones para un proceso de actualización exitoso, asegurando la compatibilidad con las últimas características y mejoras de Capacitor."
sidebar:
  order: 1
---

## Por qué esta actualización

Esta versión mayor está aquí para seguir la versión mayor de Capacitor

Primero sigue la guía de migración de Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Instalación

`npm i @capgo/capacitor-updater@7`

`Luego sincroniza la actualización del código nativo:`

`npx cap sync`

¡Eso es todo! ¡Bastante fácil!

## Migración de encriptación

Si estás usando el método de encriptación `key-v1`, necesitarás migrar al nuevo sistema de encriptación ya que `key-v1` ya no es compatible en V7. [[memory:96112]]

Sigue la guía de migración de encriptación aquí: [Guía de migración de encriptación](/docs/cli/migrations/encryption/)

## Cambios de configuración

Recomendamos agregar las siguientes propiedades en tu archivo `capacitor.config`:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Estas configuraciones deberían ayudar a gestionar mejor el Plugin y sus comportamientos.

