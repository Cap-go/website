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

await CapgoLLM.createChat();
```

### `sendMessage`

Sends a message to the AI in a specific chat session.

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

await CapgoLLM.sendMessage({} as { chatId: string; message: string });
```

### `getReadiness`

Gets the readiness status of the LLM.

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

await CapgoLLM.getReadiness();
```

### `setModel`

Sets the model configuration - iOS: Use "Apple Intelligence" as path for system model, or provide path to MediaPipe model - Android: Path to a MediaPipe model file (in assets or files directory).

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

await CapgoLLM.setModel({} as ModelOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-llm/
- Docs: /docs/plugins/llm/
