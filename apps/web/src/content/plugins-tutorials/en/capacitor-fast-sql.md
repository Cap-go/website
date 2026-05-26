---
locale: en
---
# Using @capgo/capacitor-fast-sql

Fast SQL Plugin for high-performance SQLite database access.

## Install

```bash
bun add @capgo/capacitor-fast-sql
bunx cap sync
```

## What This Plugin Exposes

- `connect` - Initialize the database connection and start the HTTP server.
- `disconnect` - Close database connection and stop the HTTP server.
- `getServerInfo` - Get the HTTP server port and token for direct communication.
- `execute` - Execute a SQL query via Capacitor bridge (for simple queries). For better performance with large datasets, use the HTTP protocol directly via SQLConnection class.

## Example Usage

### `connect`

Initialize the database connection and start the HTTP server.

```typescript
import { CapgoCapacitorFastSql } from '@capgo/capacitor-fast-sql';

const conn = await CapgoCapacitorFastSql.connect({ database: 'myapp' });
console.log('Connected on port:', conn.port);
```

### `disconnect`

Close database connection and stop the HTTP server.

```typescript
import { CapgoCapacitorFastSql } from '@capgo/capacitor-fast-sql';

await CapgoCapacitorFastSql.disconnect({ database: 'myapp' });
```

### `getServerInfo`

Get the HTTP server port and token for direct communication.

```typescript
import { CapgoCapacitorFastSql } from '@capgo/capacitor-fast-sql';

const info = await CapgoCapacitorFastSql.getServerInfo({ database: 'myapp' });
console.log('Server port:', info.port);
```

### `execute`

Execute a SQL query via Capacitor bridge (for simple queries). For better performance with large datasets, use the HTTP protocol directly via SQLConnection class.

```typescript
import { CapgoCapacitorFastSql } from '@capgo/capacitor-fast-sql';

const result = await CapgoCapacitorFastSql.execute({
  database: 'myapp',
  statement: 'SELECT * FROM users WHERE age > ?',
  params: [18]
});
console.log('Rows:', result.rows);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-fast-sql/
- Docs: /docs/plugins/fast-sql/

## Keep going from Using @capgo/capacitor-fast-sql

If you are using **Using @capgo/capacitor-fast-sql** to plan storage and file handling, connect it with [@capgo/capacitor-fast-sql](/docs/plugins/fast-sql/) for the implementation detail in @capgo/capacitor-fast-sql, [Getting Started](/docs/plugins/fast-sql/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file.
