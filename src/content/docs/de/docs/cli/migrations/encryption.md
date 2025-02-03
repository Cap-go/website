---
title: Verschlüsselung
description: Verschlüsselung der Daten mit neuer Verschlüsselungsmethode
sidebar:
  order: 5
locale: de
---

Diese Dokumentation erklärt, wie Sie Ihre Daten mit dem neuen Verschlüsselungssystem verschlüsseln und das alte entfernen können

Erfahren Sie mehr über das neue Verschlüsselungssystem im [Blog-Beitrag](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)

---

Erstellen Sie zunächst ein neues Schlüsselpaar mit folgendem Befehl:

```bash
npx @capgo/cli key create
```

Dieser Befehl erstellt ein neues Schlüsselpaar in Ihrer App; es ist zwingend erforderlich, den privaten Schlüssel an einem sicheren Ort aufzubewahren. Der private Schlüssel darf niemals in die Versionskontrolle übernommen oder mit nicht vertrauenswürdigen Parteien geteilt werden

Dieser Befehl entfernt auch den alten Schlüssel aus Ihrer Capacitor-Konfiguration, entfernt aber nicht die alten Schlüsseldateien. Die CLI behält sie bei, damit Sie weiterhin Live-Updates für Apps senden können, die noch kein App-Store-Update erhalten haben und das alte Plugin verwenden. Dies erleichtert die Migration

Wenn Sie bei der Migration gefragt werden: "Möchten Sie die Verschlüsselung mit dem neuen Kanal einrichten, um alte Apps zu unterstützen und die Migration zu erleichtern?", stimmen Sie bitte zu. Dies fügt eine neue "defaultChannel"-Option zu Ihrer Capacitor-Konfiguration hinzu. Dadurch verwendet Ihre App den Kanal "encryption_v2". Dies stellt sicher, dass die neue Verschlüsselung nur von Apps verwendet wird, die sie unterstützen. Apps, die kein App-Store-Update erhalten haben, verwenden weiterhin den vorherigen Standardkanal

---

Jetzt müssen Sie Ihr JS-Bundle erstellen und in den neuen Kanal hochladen. Führen Sie dazu folgenden Befehl aus:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

Führen Sie dann diesen Befehl aus, um Apps zu erlauben, sich selbst dem Kanal "encryption_v2" zuzuweisen:

:::caution
Dies ist notwendig, damit die neue "defaultChannel"-Option funktioniert
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

Sie können die App jetzt ausführen; sie wird das neue Verschlüsselungssystem verwenden

Um das neue JS-Bundle in den alten Kanal hochzuladen, müssen Sie nur den folgenden Befehl ausführen:

```bash
npx @capgo/cli bundle upload --channel production
```

---

Sie müssen sich keine Sorgen um die Capacitor-Konfiguration machen, sie wird nie zu Capgo hochgeladen

Wenn alle Benutzer ihre Apps aktualisiert haben (dies kann bis zu 3/4 Monate dauern), können Sie den "defaultChannel" aus Ihrer Capacitor-Konfiguration entfernen

Dann können Sie den alten Kanal mit folgendem Befehl entfernen:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Nach dem Löschen des "encryption_v2"-Kanals werden alle Apps, die ihn als Standard verwenden, den "production"-Kanal nutzen