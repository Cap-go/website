---
locale: fr
---

chanter @capgo/ivs-player

## Installation

Pour installer le package @capgo/ivs-player, vous devez exécuter la commande suivante :

[[BLOC_DE_CODE]]

## API

Le package @capgo/ivs-player fournit l'API suivante :

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

Cette méthode crée une instance du lecteur IVS. Elle prend un objet d'options comme paramètre, qui contient diverses propriétés telles que l'URL de la vidéo, la possibilité d'activer le mode image dans l'image, le titre et le sous-titre de la vidéo, et plus encore. Elle retourne une promesse qui se résout avec l'instance créée.

### start() => Promise

Cette méthode commence la lecture de la vidéo dans le lecteur IVS. Elle retourne une promesse.

### cast() => Promise

Cette méthode diffuse la vidéo sur un appareil connecté. Elle retourne une promesse.

### getCastStatus() => Promise<{ isActive: boolean; }>

Cette méthode récupère l'état de la fonction de diffusion. Elle retourne une promesse qui se résout avec un objet contenant la propriété isActive, qui indique si la diffusion est active.

### pause() => Promise

Cette méthode met en pause la lecture de la vidéo. Elle retourne une promesse.

### delete() => Promise

Cette méthode supprime l'instance du lecteur IVS. Elle retourne une promesse.

### getUrl() => Promise

Cette méthode récupère l'URL de la vidéo actuellement en cours de lecture. Elle retourne une promesse.

### getState() => Promise

Cette méthode récupère l'état actuel du lecteur IVS. Elle retourne une promesse.

### setPlayerPosition() => Promise

Cette méthode définit la position du lecteur IVS à l'écran. Elle prend les coordonnées x et y comme paramètres et retourne une promesse.

### getPlayerPosition() => Promise

Cette méthode récupère la position actuelle du lecteur IVS à l'écran. Elle retourne une promesse.

### setAutoQuality() => Promise

Cette méthode définit le mode de qualité automatique du lecteur IVS. Elle prend une valeur booléenne comme paramètre et retourne une promesse.

### getAutoQuality() => Promise

Cette méthode récupère le mode de qualité automatique actuel du lecteur IVS. Elle retourne une promesse.

### setPip() => Promise

Cette méthode définit le mode image dans l'image du lecteur IVS. Elle prend une valeur booléenne comme paramètre et retourne une promesse.

### getPip() => Promise

Cette méthode récupère le mode image dans l'image actuel du lecteur IVS. Elle retourne une promesse.

### setFrame() => Promise

Cette méthode définit la valeur de cadre du lecteur IVS. Elle prend une valeur numérique comme paramètre et retourne une promesse.

### getFrame() => Promise

Cette méthode récupère le cadre actuel du lecteur IVS. Elle retourne une promesse.

### setMute() => Promise

Cette méthode définit le mode sourd du lecteur IVS. Elle prend une valeur booléenne comme paramètre et retourne une promesse.

### getMute() => Promise

Cette méthode récupère le mode sourd actuel du lecteur IVS. Elle retourne une promesse.

### setQuality() => Promise

Cette méthode définit la qualité de la vidéo dans le lecteur IVS. Elle prend une valeur string comme paramètre et retourne une promesse.

### getQuality() => Promise

Cette méthode récupère la qualité actuelle de la vidéo dans le lecteur IVS. Elle retourne une promesse.

### getQualities() => Promise

Cette méthode récupère les qualités disponibles de la vidéo dans le lecteur IVS. Elle retourne une promesse.

### addListener('expandPip', ) => void

Cette méthode ajoute un écouteur pour l'événement expandPip. Elle prend une fonction de rappel comme paramètre et retourne void.

### addListener('closePip', ) => void

Cette méthode ajoute un écouteur pour l'événement closePip. Elle prend une fonction de rappel comme paramètre et retourne void.

### addListener('onState', ) => void

Cette méthode ajoute un écouteur pour l'événement onState. Elle prend une fonction de rappel comme paramètre et retourne void.

### addListener('onCues', ) => void

Cette méthode ajoute un écouteur pour l'événement onCues. Elle prend une fonction de rappel comme paramètre et retourne void.

### addListener('onDuration', ) => void

Cette méthode ajoute un écouteur pour l'événement onDuration.Il prend une fonction de rappel comme paramètre et retourne void

### addListener('onError', ) => void

Cette méthode ajoute un écouteur pour l'événement onError. Elle prend une fonction de rappel comme paramètre et retourne void

### addListener('onRebuffering', ) => void

Cette méthode ajoute un écouteur pour l'événement onRebuffering. Elle prend une fonction de rappel comme paramètre et retourne void

### addListener('onSeekCompleted', ) => void

Cette méthode ajoute un écouteur pour l'événement onSeekCompleted. Elle prend une fonction de rappel comme paramètre et retourne void

### addListener('onVideoSize', ) => void

Cette méthode ajoute un écouteur pour l'événement onVideoSize. Elle prend une fonction de rappel comme paramètre et retourne void

### addListener('onQuality', ) => void

Cette méthode ajoute un écouteur pour l'événement onQuality. Elle prend une fonction de rappel comme paramètre et retourne void

### addListener('onCastStatus', ) => void

Cette méthode ajoute un écouteur pour l'événement onCastStatus. Elle prend une fonction de rappel comme paramètre et retourne void

### removeAllListeners() => void

Cette méthode supprime tous les écouteurs d'événements ajoutés. Elle retourne void

## Conclusion

Le package @capgo/ivs-player offre une API complète pour intégrer un lecteur IVS dans votre application Capacitor. En suivant les étapes d'installation et en consultant la documentation de l'API, vous pouvez facilement commencer à lire des vidéos dans votre application en utilisant le lecteur IVS.