---
locale: en
---
# Using @capgo/capacitor-llm

LLM Plugin interface for interacting with on-device language models.

## Install

```bash
bun add @capgo/capacitor-llm
bunx cap sync
```

## What This Plugin Exposes

- `createChat` - Creates a new chat session.
- `sendMessage` - Sends a message to the AI in a specific chat session.
- `getReadiness` - Gets the readiness status of the LLM.
- `setModel` - Sets the model configuration - iOS: Use "Apple Intelligence" as path for system model, or provide path to MediaPipe model - Android: Path to a MediaPipe model file (in assets or files directory).

## Example Usage

### `createChat`

Creates a new chat session.

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

const result = await CapgoLLM.createChat();
console.log(result);
```

### `sendMessage`

Sends a message to the AI in a specific chat session.

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

await CapgoLLM.sendMessage({
  chatId: 'chat-id-123',
  message: 'Hello from Capacitor',
});
```

### `getReadiness`

Gets the readiness status of the LLM.

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

const result = await CapgoLLM.getReadiness();
console.log(result);
```

### `setModel`

Sets the model configuration - iOS: Use "Apple Intelligence" as path for system model, or provide path to MediaPipe model - Android: Path to a MediaPipe model file (in assets or files directory).

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

await CapgoLLM.setModel({
  path: 'path/to/file',
  modelType: 'task',
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-llm/
- Docs: /docs/plugins/llm/

## Keep going from Using @capgo/capacitor-llm

If you are using **Using @capgo/capacitor-llm** to plan dashboard and API operations, connect it with [@capgo/capacitor-llm](/docs/plugins/llm/) for the implementation detail in @capgo/capacitor-llm, [Getting Started](/docs/plugins/llm/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
