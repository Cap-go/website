---
slug: de__basic-js-css-config-for-native-app-look
title: Grundlegende JS- und CSS-Konfigurationen für ein natives App-Aussehen
description: >-
  Erfahren Sie, wie Sie Ihre Web-App mit grundlegenden JavaScript- und
  CSS-Einstellungen konfigurieren können, damit sie wie eine native App aussieht
  und sich anfühlt, einschließlich der Deaktivierung von Hover-Effekten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: Illustration des nativen App-Aussehens
tag: Web Development
published: true
locale: de
next_blog: ''
---

# Grundlegende JS- und CSS-Konfigurationen für ein natives App-Aussehen

Bei der Erstellung einer Web-App ist es wichtig, dass sie wie eine native App aussieht und sich auch so anfühlt, um ein nahtloses Benutzererlebnis zu bieten. In diesem Artikel behandeln wir die grundlegenden JavaScript- und CSS-Konfigurationen, die für ein natives App-Aussehen erforderlich sind, einschließlich der Deaktivierung von Hover-Effekten.

## Hover-Effekte deaktivieren

Auf Touch-Geräten können Hover-Effekte problematisch sein, da sie keinen echten Hover-Zustand wie Desktop-Geräte haben. Um Hover-Effekte auf Touch-Geräten zu deaktivieren, können Sie den folgenden CSS-Code verwenden:

```css
@media (hover: none) {
  .element:hover {
    /* Reset the hover styles */
    background-color: initial;
    color: initial;
    /* Add any other style resets needed */
  }
}
```

Ersetzen Sie `element` durch den entsprechenden Selektor für die Elemente, bei denen Sie Hover-Effekte deaktivieren möchten.

## Link-Vorschau deaktivieren

Um die Link-Vorschau auf Touch-Geräten zu deaktivieren, können Sie den folgenden JavaScript-Code verwenden:

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## Auswahl deaktivieren

Um die Textauswahl zu deaktivieren, fügen Sie den folgenden CSS-Code zu Ihrem Stylesheet hinzu:

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## Zoom deaktivieren

Um das Zoomen zu deaktivieren, fügen Sie den folgenden Meta-Tag zum Head Ihrer HTML-Datei hinzu:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Sicheren CSS-Bereich hinzufügen

Um sicherzustellen, dass Ihr Inhalt innerhalb des sicheren Bereichs des Geräts angezeigt wird, fügen Sie den folgenden CSS-Code zu Ihrem Stylesheet hinzu:

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## Zusätzliche Tipps

- Verwenden Sie responsive Design-Techniken, um sicherzustellen, dass Ihre App auf allen Geräten gut aussieht.
- Optimieren Sie die Leistung Ihrer App, indem Sie die Verwendung von umfangreichen JavaScript-Bibliotheken und Frameworks minimieren.
- Testen Sie Ihre App auf verschiedenen Geräten und Browsern, um Kompatibilität und ein konsistentes Benutzererlebnis sicherzustellen.

Indem Sie diese grundlegenden JavaScript- und CSS-Konfigurationen befolgen, können Sie eine Web-App erstellen, die wie eine native App aussieht und sich auch so anfühlt, und ein nahtloses und angenehmes Benutzererlebnis bietet.