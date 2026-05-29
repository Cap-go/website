---
locale: en
---
# Using @capgo/capacitor-crisp

Crisp Chat SDK Plugin for Capacitor. Provides live chat and customer support functionality through Crisp.chat.

## Install

```bash
bun add @capgo/capacitor-crisp
bunx cap sync
```

## What This Plugin Exposes

- `configure` - Configure the Crisp SDK with your website ID. Must be called before using any other methods.
- `openMessenger` - Open the Crisp messenger chat window. Shows the chat interface to the user.
- `setTokenID` - Set a unique token ID for the current user session. Used to identify and restore previous conversations.
- `setUser` - Set user information for the current session. Updates the user profile visible to support agents.

## Example Usage

### `configure`

Configure the Crisp SDK with your website ID. Must be called before using any other methods.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

await CrispPlugin.configure({ websiteID: 'YOUR_WEBSITE_ID' });
```

### `openMessenger`

Open the Crisp messenger chat window. Shows the chat interface to the user.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

await CapacitorCrisp.openMessenger();
```

### `setTokenID`

Set a unique token ID for the current user session. Used to identify and restore previous conversations.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

await CapacitorCrisp.setTokenID({} as { tokenID: string });
```

### `setUser`

Set user information for the current session. Updates the user profile visible to support agents.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

await CrispPlugin.setUser({
  nickname: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-crisp/
- Docs: /docs/plugins/crisp/

## Keep going from Using @capgo/capacitor-crisp

If you are using **Using @capgo/capacitor-crisp** to plan migration and enterprise operations, connect it with [@capgo/capacitor-crisp](/docs/plugins/crisp/) for the implementation detail in @capgo/capacitor-crisp, [Getting Started](/docs/plugins/crisp/getting-started/) for the implementation detail in Getting Started, [Capgo Enterprise](/enterprise/) for the product workflow in Capgo Enterprise, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Alternatives](/alternatives/) for the product workflow in Capgo Alternatives.
