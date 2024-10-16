---
locale: de
---

singen @capgo/ivs-player

## Installation

Um das @capgo/ivs-player-Paket zu installieren, müssen Sie den folgenden Befehl ausführen:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## API

Das @capgo/ivs-player-Paket bietet die folgende API:

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

Diese Methode erstellt eine Instanz des IVS-Players. Sie nimmt ein Optionsobjekt als Parameter, das verschiedene Eigenschaften wie die URL des Videos, ob der Bild-in-Bild-Modus aktiviert werden soll, den Titel und Untertitel des Videos und mehr enthält. Sie gibt ein Promise zurück, das zur erstellten Instanz aufgelöst wird.

### start() => Promise

Diese Methode startet die Wiedergabe des Videos im IVS-Player. Sie gibt ein Promise zurück.

### cast() => Promise

Diese Methode streamt das Video zu einem angeschlossenen Gerät. Sie gibt ein Promise zurück.

### getCastStatus() => Promise<{ isActive: boolean; }>

Diese Methode ruft den Status der Casting-Funktion ab. Sie gibt ein Promise zurück, das zu einem Objekt mit der Eigenschaft isActive aufgelöst wird, die angibt, ob das Casting aktiv ist.

### pause() => Promise

Diese Methode pausiert die Video-Wiedergabe. Sie gibt ein Promise zurück.

### delete() => Promise

Diese Methode löscht die IVS-Player-Instanz. Sie gibt ein Promise zurück.

### getUrl() => Promise

Diese Methode ruft die URL des aktuell wiedergegebenen Videos ab. Sie gibt ein Promise zurück.

### getState() => Promise

Diese Methode ruft den aktuellen Zustand des IVS-Players ab. Sie gibt ein Promise zurück.

### setPlayerPosition() => Promise

Diese Methode setzt die Position des IVS-Players auf dem Bildschirm. Sie nimmt x- und y-Koordinaten als Parameter und gibt ein Promise zurück.

### getPlayerPosition() => Promise

Diese Methode ruft die aktuelle Position des IVS-Players auf dem Bildschirm ab. Sie gibt ein Promise zurück.

### setAutoQuality() => Promise

Diese Methode setzt den automatischen Qualitätsmodus des IVS-Players. Sie nimmt einen booleschen Wert als Parameter und gibt ein Promise zurück.

### getAutoQuality() => Promise

Diese Methode ruft den aktuellen automatischen Qualitätsmodus des IVS-Players ab. Sie gibt ein Promise zurück.

### setPip() => Promise

Diese Methode setzt den Bild-in-Bild-Modus des IVS-Players. Sie nimmt einen booleschen Wert als Parameter und gibt ein Promise zurück.

### getPip() => Promise

Diese Methode ruft den aktuellen Bild-in-Bild-Modus des IVS-Players ab. Sie gibt ein Promise zurück.

### setFrame() => Promise

Diese Methode setzt das Frame des IVS-Players. Sie nimmt einen Zahlenwert als Parameter und gibt ein Promise zurück.

### getFrame() => Promise

Diese Methode ruft das aktuelle Frame des IVS-Players ab. Sie gibt ein Promise zurück.

### setMute() => Promise

Diese Methode setzt den Stumm-Modus des IVS-Players. Sie nimmt einen booleschen Wert als Parameter und gibt ein Promise zurück.

### getMute() => Promise

Diese Methode ruft den aktuellen Stumm-Modus des IVS-Players ab. Sie gibt ein Promise zurück.

### setQuality() => Promise

Diese Methode setzt die Qualität des Videos im IVS-Player. Sie nimmt einen String-Wert als Parameter und gibt ein Promise zurück.

### getQuality() => Promise

Diese Methode ruft die aktuelle Qualität des Videos im IVS-Player ab. Sie gibt ein Promise zurück.

### getQualities() => Promise

Diese Methode ruft die verfügbaren Qualitäten des Videos im IVS-Player ab. Sie gibt ein Promise zurück.

### addListener('expandPip', ) => void

Diese Methode fügt einen Listener für das expandPip-Ereignis hinzu. Sie nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('closePip', ) => void

Diese Methode fügt einen Listener für das closePip-Ereignis hinzu. Sie nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onState', ) => void

Diese Methode fügt einen Listener für das onState-Ereignis hinzu. Sie nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onCues', ) => void

Diese Methode fügt einen Listener für das onCues-Ereignis hinzu. Sie nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onDuration', ) => void

Diese Methode fügt einen Listener für das onDuration-Ereignis hinzu.Es nimmt eine Callback-Funktion als Parameter und gibt void zurück

### addListener('onError', ) => void

Diese Methode fügt einen Listener für das onError-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onRebuffering', ) => void

Diese Methode fügt einen Listener für das onRebuffering-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onSeekCompleted', ) => void

Diese Methode fügt einen Listener für das onSeekCompleted-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onVideoSize', ) => void

Diese Methode fügt einen Listener für das onVideoSize-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onQuality', ) => void

Diese Methode fügt einen Listener für das onQuality-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### addListener('onCastStatus', ) => void

Diese Methode fügt einen Listener für das onCastStatus-Ereignis hinzu. Es nimmt eine Callback-Funktion als Parameter und gibt void zurück.

### removeAllListeners() => void

Diese Methode entfernt alle hinzugefügten Ereignis-Listener. Es gibt void zurück.

## Fazit

Das @capgo/ivs-player-Paket bietet eine umfassende API zur Integration eines IVS-Players in Ihre Capacitor-App. Durch das Befolgen der Installationsschritte und das Referenzieren der API-Dokumentation können Sie einfach beginnen, Videos in Ihrer App mit dem IVS-Player abzuspielen.