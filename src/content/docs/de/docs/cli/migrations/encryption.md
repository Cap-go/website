---
title: Verschlüsselung
description: Wie man seine Daten mit der neuen Verschlüsselung verschlüsselt.
sidebar:
  order: 5
locale: de
---

Diese Dokumentation erklärt, wie Sie Ihre Daten mit dem neuen Verschlüsselungssystem verschlüsseln und das alte entfernen können.

Erfahren Sie mehr über das neue Verschlüsselungssystem in dem [Blogbeitrag](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing).

---

1. Erstellen Sie zunächst ein neues Schlüsselpaar mit dem folgenden Befehl:

```bash
npx @capgo/cli key create
```

Dieser Befehl erstellt ein neues Schlüsselpaar in Ihrer App; es ist zwingend erforderlich, den privaten Schlüssel an einem sicheren Ort zu speichern. Man darf den privaten Schlüssel niemals in die Quellkontrolle einpflegen oder mit einer untrusted Partei teilen.

Dieser Befehl entfernt auch den alten Schlüssel aus Ihrer Capacitor-Konfiguration, aber er entfernt nicht die alten Schlüsseldateien. Die CLI behält sie, um Ihnen zu ermöglichen, weiterhin Live-Updates für die Apps zu senden, die kein App-Store-Update erhalten haben und weiterhin das alte Plugin verwenden. Dies erleichtert die Migration.

Wenn Sie bei der Migration gefragt werden: "Möchten Sie die Verschlüsselung mit dem neuen Kanal einrichten, um alte Apps zu unterstützen und die Migration zu erleichtern?", stimmen Sie bitte zu. Dies fügt Ihrer Capacitor-Konfiguration eine neue "defaultChannel"-Option hinzu. Dadurch wird Ihre App den Kanal "encryption_v2" verwenden. Dies stellt sicher, dass die neue Verschlüsselung nur von Apps verwendet wird, die sie unterstützen. Apps, die kein App-Store-Update erhalten haben, werden weiterhin den vorherigen Standardkanal verwenden.

---

2. Jetzt müssen Sie Ihr JS-Bündel erstellen und es an den neuen Kanal hochladen. Bitte führen Sie den folgenden Befehl aus:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

3. Führen Sie dann diesen Befehl aus, um den Apps zu erlauben, sich selbst dem Kanal "encryption_v2" zuzuweisen.

:::caution
Dies ist notwendig, damit die neue "defaultChannel"-Option funktioniert.
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

4. Sie können nun die App ausführen; sie wird das neue Verschlüsselungssystem verwenden.

Um das neue JS-Bündel an den alten Kanal hochzuladen, müssen Sie nur den folgenden Befehl ausführen:

```bash
npx @capgo/cli bundle upload --channel production
```

---

5. Sie müssen sich keine Sorgen um die Capacitor-Konfiguration machen, sie wird niemals an Capgo hochgeladen.

Wenn alle Benutzer ihre Apps aktualisiert haben (dies kann bis zu 3/4 Monate dauern), können Sie den "defaultChannel" aus Ihrer Capacitor-Konfiguration entfernen.

Und dann können Sie den alten Kanal mit dem folgenden Befehl entfernen:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

Nachdem der Kanal "encryption_v2" gelöscht wurde, werden alle Apps, die ihn als Standard verwenden, damit beginnen, den Kanal "production" zu verwenden.