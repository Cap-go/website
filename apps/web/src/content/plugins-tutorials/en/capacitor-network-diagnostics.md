---
locale: en
---
# Using @capgo/capacitor-network-diagnostics

Native network diagnostics for Capacitor apps that need to debug restricted Wi-Fi, captive portals, blocked ports, WebSocket failures, slow downloads, and packet loss.

## Install

```bash
npm install @capgo/capacitor-network-diagnostics
npx cap sync
```

## What This Plugin Exposes

- `getNetworkStatus` - Read the native connection type and platform network flags.
- `testUrl` - Check HTTP or HTTPS URL reachability with status code and latency.
- `testPort` - Open a native TCP socket to a host and port.
- `testWebSocket` - Validate a `ws://` or `wss://` handshake.
- `testDownloadSpeed` - Measure native download throughput.
- `testPacketLoss` - Estimate application-level packet loss with repeated probes.
- `runDiagnostics` - Run a combined diagnostic pass and return an issue list.

## Example Usage

```typescript
import { NetworkDiagnostics } from '@capgo/capacitor-network-diagnostics';

const report = await NetworkDiagnostics.runDiagnostics({
  urls: [{ url: 'https://api.example.com/health' }],
  ports: [{ host: 'api.example.com', port: 443 }],
  websockets: [{ url: 'wss://ws.example.com/socket' }],
  packetLoss: {
    mode: 'tcp',
    host: 'api.example.com',
    port: 443,
    count: 10,
  },
});

console.log(report.status);
console.log(report.issues);
```

## Support Workflow

Ask the affected user to run diagnostics while connected to the problematic Wi-Fi or access point. Send results to support with:

- connection type and OS network flags
- failed URLs, ports, or WebSocket endpoints
- download Mbps
- packet loss percentage
- native error codes and messages

Raw ICMP ping is not portable on iOS and Android apps, so packet loss is measured with repeated TCP or HTTP probes.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-network-diagnostics/
- Docs: /docs/plugins/network-diagnostics/
