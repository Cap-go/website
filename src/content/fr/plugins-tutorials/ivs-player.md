---
locale: fr
---

chante @capgo/ivs-player

##Installation

Pour installer le package @capgo/ivs-player, vous devez exécuter la commande suivante :

```bash
npm install @capgo/ivs-player
npx cap sync
```

##API

Le package @capgo/ivs-player fournit l'API suivante :

### create(options : { url : chaîne ; pip ? : booléen ; titre ? : chaîne ; sous-titre ? : chaîne ; couverture ? : chaîne ; lecture automatique ? : booléen ; toBack ? : booléen ; x ? : numéro ; y ? : nombre; largeur?: nombre; hauteur?: nombre }) => Promesse;

Cette méthode crée une instance du lecteur IVS. Elle prend un objet d'options comme paramètre, qui contient diverses propriétés telles que l'URL de la vidéo, l'activation ou non du mode image dans l'image, le titre et le sous-titre de la vidéo, etc. Il renvoie une promesse qui se résout à l'instance créée

### start() => Promesse

Cette méthode démarre la lecture de la vidéo dans le lecteur IVS. Elle renvoie une promesse

### cast() => Promesse

Cette méthode diffuse la vidéo sur un appareil connecté. Elle renvoie une promesse

### getCastStatus() => Promesse<{ isActive: boolean; }>

Cette méthode récupère l'état de la fonctionnalité de diffusion. Elle renvoie une promesse qui se résout en un objet contenant la propriété isActive, qui indique si la diffusion est active.

### pause() => Promesse

Cette méthode met en pause la lecture vidéo. Elle renvoie une promesse

### delete() => Promesse

Cette méthode supprime l'instance du lecteur IVS. Elle renvoie une promesse

### getUrl() => Promesse

Cette méthode récupère l'URL de la vidéo en cours de lecture. Elle renvoie une promesse

### getState() => Promesse

Cette méthode récupère l'état actuel du lecteur IVS. Elle renvoie une promesse

### setPlayerPosition() => Promesse

Cette méthode définit la position du lecteur IVS sur l'écran. Elle prend les coordonnées x et y comme paramètres et renvoie une promesse.

### getPlayerPosition() => Promesse

Cette méthode récupère la position actuelle du lecteur IVS sur l'écran. Elle renvoie une promesse

### setAutoQuality() => Promesse

Cette méthode définit le mode de qualité automatique du lecteur IVS. Elle prend une valeur booléenne comme paramètre et renvoie une promesse.

### getAutoQuality() => Promesse

Cette méthode récupère le mode de qualité automatique actuel du lecteur IVS. Elle renvoie une promesse

### setPip() => Promesse

Cette méthode définit le mode image dans l'image du lecteur IVS. Elle prend une valeur booléenne comme paramètre et renvoie une promesse.

### getPip() => Promesse

Cette méthode récupère le mode image dans l'image actuel du lecteur IVS. Elle renvoie une promesse

### setFrame() => Promesse

Cette méthode définit le cadre du lecteur IVS. Elle prend une valeur numérique comme paramètre et renvoie une promesse.

### getFrame() => Promesse

Cette méthode récupère la frame actuelle du lecteur IVS. Elle renvoie une promesse

### setMute() => Promesse

Cette méthode définit le mode muet du lecteur IVS. Elle prend une valeur booléenne comme paramètre et renvoie une promesse.

### getMute() => Promesse

Cette méthode récupère le mode muet actuel du lecteur IVS. Elle renvoie une promesse

### setQuality() => Promesse

Cette méthode définit la qualité de la vidéo dans le lecteur IVS. Elle prend une valeur de chaîne comme paramètre et renvoie une promesse.

### getQuality() => Promesse

Cette méthode récupère la qualité actuelle de la vidéo dans le lecteur IVS. Elle renvoie une promesse

### getQualities() => Promesse

Cette méthode récupère les qualités disponibles de la vidéo dans le lecteur IVS. Elle renvoie une Promesse

### addListener('expandPip', ) => vide

Cette méthode ajoute un écouteur pour l'événement expandPip. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('closePip', ) => vide

Cette méthode ajoute un écouteur pour l'événement closePip. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onState', ) => vide

Cette méthode ajoute un écouteur pour l'événement onState. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onCues', ) => vide

Cette méthode ajoute un écouteur pour l'événement onCues. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onDuration', ) => vide

Cette méthode ajoute un écouteur pour l'événement onDurationIl prend une fonction de rappel comme paramètre et renvoie void

### addListener('onError', ) => vide

Cette méthode ajoute un écouteur pour l'événement onError. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onRebuffering', ) => vide

Cette méthode ajoute un écouteur pour l'événement onRebuffering. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onSeekCompleted', ) => vide

Cette méthode ajoute un écouteur pour l'événement onSeekCompleted. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onVideoSize', ) => vide

Cette méthode ajoute un écouteur pour l'événement onVideoSize. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onQuality', ) => vide

Cette méthode ajoute un écouteur pour l'événement onQuality. Elle prend une fonction de rappel comme paramètre et renvoie void

### addListener('onCastStatus', ) => vide

Cette méthode ajoute un écouteur pour l'événement onCastStatus. Elle prend une fonction de rappel comme paramètre et renvoie void

### RemoveAllListeners() => vide

Cette méthode supprime tous les écouteurs d'événements ajoutés. Elle renvoie void

## Conclusion

Le package @capgo/ivs-player fournit une API complète pour intégrer un lecteur IVS dans votre application Capacitor. En suivant les étapes d'installation et en référençant la documentation de l'API, vous pouvez facilement commencer à lire des vidéos dans votre application à l'aide du lecteur IVS.