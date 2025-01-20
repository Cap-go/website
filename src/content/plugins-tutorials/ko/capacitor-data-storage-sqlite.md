---
locale: ko
---

capgo/capacitor-data-storage-sqlite Tutorial

이 튜토리얼은 Ionic Capacitor 앱에서 간단한 문자열 데이터에 대한 키-값 영구 저장소를 구현하기 위해 `@capgo/capacitor-data-storage-sqlite` 패키지를 사용하는 프로세스를 안내합니다.

## 전제 조건

시작하기 전에 다음이 설치되어 있는지 확인하십시오.

- Nodejs
- npm
- 이온콘덴서 프로젝트

## 설치

1 터미널이나 명령 프롬프트를 열고 프로젝트 디렉터리로 이동합니다.

2 다음 명령을 실행하여 패키지를 설치합니다.

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 설치 후 Capacitor 프로젝트를 동기화합니다.

```bash
npx cap sync
```

4 웹 플랫폼의 경우 localforage를 설치합니다.

```bash
npm install --save localforage
```

5 Electron 플랫폼의 경우 다음 추가 단계를 따르십시오.

```bash
npm install --save @capacitor-community/electron
npx cap add @capacitor-community/electron
cd electron
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm run build
cd ..
npx cap sync @capacitor-community/electron
```

## 용법

이제 패키지를 설치했으므로 앱에서 이를 사용하는 방법을 살펴보겠습니다.

### 플러그인 가져오기

먼저 TypeScript 파일에서 플러그인을 가져옵니다.

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### 매장 오픈

저장소 사용을 시작하려면 저장소를 열어야 합니다.

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### 값 설정

저장소에서 값을 설정하려면:

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### 가치 얻기

저장소에서 값을 검색하려면:

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### 키가 존재하는지 확인하기

저장소에 키가 있는지 확인하려면 다음 안내를 따르세요.

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### 키 제거

저장소에서 키를 제거하려면:

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### 매장 정리

저장소에서 모든 데이터를 지우려면:

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### 매장 폐쇄

스토어 사용이 끝나면 닫는 것이 좋습니다.

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## 사용 예

다음은 플러그인 사용 방법에 대한 전체 예입니다.

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

async function dataStorageExample() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  
  try {
    // Open the store
    await store.openStore({ database: "my_db", table: "my_table" });

    // Set a value
    await store.set("myKey", "Hello, Capacitor!");

    // Get the value
    const result = await store.get("myKey");
    console.log("Value:", result.value);

    // Check if key exists
    const keyExists = await store.iskey("myKey");
    console.log("Key exists:", keyExists.result);

    // Remove the key
    await store.remove("myKey");

    // Clear the store
    await store.clear();

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the store
    await store.closeStore();
  }
}

dataStorageExample();
```

## 결론

이제 `@capgo/capacitor-data-storage-sqlite` 패키지를 사용하여 Ionic Capacitor 앱에서 키-값 저장 시스템을 구현하는 방법을 배웠습니다. 이 플러그인은 다양한 플랫폼에서 문자열 데이터를 저장하고 검색하는 간단한 방법을 제공합니다. , iOS, Android, Electron, 웹 포함

오류를 적절하게 처리하고 사용이 끝나면 저장소를 닫는 것을 잊지 마십시오. 암호화된 데이터베이스, 다중 테이블 및 JSON 가져오기/내보내기 작업을 포함한 고급 사용법은 플러그인의 전체 API 문서를 참조하세요.

API 및 사용 가능한 옵션에 대한 자세한 내용은 패키지의 README 또는 설명서를 참조하세요.