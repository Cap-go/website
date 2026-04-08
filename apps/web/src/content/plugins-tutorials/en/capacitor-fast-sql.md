---
locale: en
---

# Capacitor Fast SQL Tutorial

## Complete Implementation Guide

This tutorial demonstrates how to build production-ready applications using **@capgo/capacitor-fast-sql**. You'll learn to create a robust database service, implement sync systems, handle migrations, and optimize for performance.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Database Service Architecture](#database-service-architecture)
3. [Migration System](#migration-system)
4. [Complete Application Examples](#complete-application-examples)
5. [Sync Engine](#sync-engine)
6. [Framework Integration](#framework-integration)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Installation & Setup

### Step 1: Install the Plugin

```bash
npm install @capgo/capacitor-fast-sql
npx cap sync
```

### Step 2: Platform Configuration

#### iOS Configuration

Add to `ios/App/App/Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
</dict>
```

#### Android Configuration

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:usesCleartextTraffic="true">
    ...
</application>
```

## Database Service Architecture

Create a comprehensive database service that handles connection management, migrations, and common operations:

### DatabaseService.ts

```typescript
import { FastSQL, IsolationLevel } from '@capgo/capacitor-fast-sql';

export interface DatabaseConfig {
  name: string;
  version: number;
  encrypted?: boolean;
  encryptionKey?: string;
}

export interface Migration {
  version: number;
  up: (db: any) => Promise<void>;
  down?: (db: any) => Promise<void>;
}

export class DatabaseService {
  private db: any = null;
  private config: DatabaseConfig;
  private migrations: Migration[] = [];
  private isInitialized = false;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  /**
   * Register migrations to run during initialization
   */
  registerMigrations(migrations: Migration[]): void {
    this.migrations = migrations.sort((a, b) => a.version - b.version);
  }

  /**
   * Initialize database and run migrations
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Database already initialized');
      return;
    }

    try {
      // Connect to database
      this.db = await FastSQL.connect({
        database: this.config.name,
        encrypted: this.config.encrypted,
        encryptionKey: this.config.encryptionKey,
      });

      console.log('Database connected on port:', this.db.port);

      // Create migrations table
      await this.createMigrationsTable();

      // Run pending migrations
      await this.runMigrations();

      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  /**
   * Create migrations tracking table
   */
  private async createMigrationsTable(): Promise<void> {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        version INTEGER PRIMARY KEY,
        applied_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `);
  }

  /**
   * Get current database version
   */
  private async getCurrentVersion(): Promise<number> {
    const result = await this.db.query(
      'SELECT MAX(version) as version FROM migrations'
    );
    return result[0]?.version || 0;
  }

  /**
   * Run all pending migrations
   */
  private async runMigrations(): Promise<void> {
    const currentVersion = await this.getCurrentVersion();
    const pendingMigrations = this.migrations.filter(
      (m) => m.version > currentVersion
    );

    if (pendingMigrations.length === 0) {
      console.log('No pending migrations');
      return;
    }

    console.log(`Running ${pendingMigrations.length} migrations...`);

    for (const migration of pendingMigrations) {
      try {
        await this.db.transaction(async (tx: any) => {
          console.log(`Applying migration ${migration.version}...`);
          await migration.up(tx);
          await tx.run('INSERT INTO migrations (version) VALUES (?)', [
            migration.version,
          ]);
        });
        console.log(`Migration ${migration.version} applied successfully`);
      } catch (error) {
        console.error(`Migration ${migration.version} failed:`, error);
        throw error;
      }
    }
  }

  /**
   * Execute a query with parameters
   */
  async query<T = any>(
    statement: string,
    params: any[] = []
  ): Promise<T[]> {
    this.ensureInitialized();
    return await this.db.query(statement, params);
  }

  /**
   * Execute a statement that modifies data
   */
  async run(
    statement: string,
    params: any[] = []
  ): Promise<{ insertId?: number; rowsAffected: number }> {
    this.ensureInitialized();
    return await this.db.run(statement, params);
  }

  /**
   * Execute multiple statements in a transaction
   */
  async transaction<T>(
    callback: (tx: any) => Promise<T>,
    isolationLevel?: IsolationLevel
  ): Promise<T> {
    this.ensureInitialized();
    return await this.db.transaction(callback, isolationLevel);
  }

  /**
   * Execute batch operations efficiently
   */
  async executeBatch(
    operations: Array<{ statement: string; params?: any[] }>
  ): Promise<any[]> {
    this.ensureInitialized();
    return await this.db.executeBatch(operations);
  }

  /**
   * Get direct HTTP server info for maximum performance
   */
  async getServerInfo(): Promise<{ port: number; token: string }> {
    this.ensureInitialized();
    return await FastSQL.getServerInfo({ database: this.config.name });
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    if (!this.isInitialized) return;

    await FastSQL.disconnect(this.config.name);
    this.db = null;
    this.isInitialized = false;
    console.log('Database closed');
  }

  /**
   * Ensure database is initialized
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
  }

  /**
   * Vacuum database to reclaim space
   */
  async vacuum(): Promise<void> {
    this.ensureInitialized();
    await this.db.execute('VACUUM');
  }

  /**
   * Get database size in bytes
   */
  async getDatabaseSize(): Promise<number> {
    this.ensureInitialized();
    const result = await this.db.query('PRAGMA page_count');
    const pageCount = result[0].page_count;
    const pageSizeResult = await this.db.query('PRAGMA page_size');
    const pageSize = pageSizeResult[0].page_size;
    return pageCount * pageSize;
  }
}
```

## Migration System

Define migrations for your database schema:

### migrations.ts

```typescript
import { Migration } from './DatabaseService';

export const migrations: Migration[] = [
  // Migration 1: Initial schema
  {
    version: 1,
    up: async (db) => {
      await db.execute(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          created_at INTEGER DEFAULT (strftime('%s', 'now')),
          updated_at INTEGER DEFAULT (strftime('%s', 'now'))
        )
      `);

      await db.execute(`
        CREATE INDEX idx_users_email ON users(email)
      `);

      await db.execute(`
        CREATE TABLE posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          content TEXT,
          published BOOLEAN DEFAULT 0,
          created_at INTEGER DEFAULT (strftime('%s', 'now')),
          updated_at INTEGER DEFAULT (strftime('%s', 'now')),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      await db.execute(`
        CREATE INDEX idx_posts_user_id ON posts(user_id)
      `);
    },
    down: async (db) => {
      await db.execute('DROP TABLE IF EXISTS posts');
      await db.execute('DROP TABLE IF EXISTS users');
    },
  },

  // Migration 2: Add sync tracking
  {
    version: 2,
    up: async (db) => {
      await db.execute(`
        CREATE TABLE sync_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          table_name TEXT NOT NULL,
          record_id INTEGER NOT NULL,
          operation TEXT NOT NULL,
          synced BOOLEAN DEFAULT 0,
          created_at INTEGER DEFAULT (strftime('%s', 'now'))
        )
      `);

      await db.execute(`
        CREATE INDEX idx_sync_log_synced ON sync_log(synced)
      `);

      // Add sync columns to existing tables
      await db.execute(`
        ALTER TABLE users ADD COLUMN sync_version INTEGER DEFAULT 1
      `);

      await db.execute(`
        ALTER TABLE posts ADD COLUMN sync_version INTEGER DEFAULT 1
      `);
    },
  },

  // Migration 3: Add comments table
  {
    version: 3,
    up: async (db) => {
      await db.execute(`
        CREATE TABLE comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          created_at INTEGER DEFAULT (strftime('%s', 'now')),
          updated_at INTEGER DEFAULT (strftime('%s', 'now')),
          sync_version INTEGER DEFAULT 1,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      await db.execute(`
        CREATE INDEX idx_comments_post_id ON comments(post_id)
      `);
    },
  },
];
```

## Complete Application Examples

### Example 1: Blog Application

Complete blog app with posts, comments, and user management:

```typescript
import { DatabaseService } from './DatabaseService';
import { migrations } from './migrations';

export interface User {
  id?: number;
  email: string;
  name: string;
  created_at?: number;
  updated_at?: number;
}

export interface Post {
  id?: number;
  user_id: number;
  title: string;
  content: string;
  published: boolean;
  created_at?: number;
  updated_at?: number;
}

export interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at?: number;
  updated_at?: number;
}

export class BlogApp {
  private db: DatabaseService;

  constructor() {
    this.db = new DatabaseService({
      name: 'blog',
      version: 3,
    });
    this.db.registerMigrations(migrations);
  }

  async initialize(): Promise<void> {
    await this.db.initialize();
  }

  // User operations
  async createUser(user: User): Promise<number> {
    const result = await this.db.run(
      'INSERT INTO users (email, name) VALUES (?, ?)',
      [user.email, user.name]
    );
    return result.insertId!;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.db.query<User>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users[0] || null;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(updates), id];

    await this.db.run(
      `UPDATE users SET ${fields}, updated_at = strftime('%s', 'now') WHERE id = ?`,
      values
    );
  }

  // Post operations
  async createPost(post: Post): Promise<number> {
    const result = await this.db.run(
      'INSERT INTO posts (user_id, title, content, published) VALUES (?, ?, ?, ?)',
      [post.user_id, post.title, post.content, post.published ? 1 : 0]
    );
    return result.insertId!;
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    return await this.db.query<Post>(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
  }

  async getPublishedPosts(limit = 20, offset = 0): Promise<Post[]> {
    return await this.db.query<Post>(
      `SELECT p.*, u.name as author_name
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.published = 1
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<void> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(updates), id];

    await this.db.run(
      `UPDATE posts SET ${fields}, updated_at = strftime('%s', 'now') WHERE id = ?`,
      values
    );
  }

  async deletePost(id: number): Promise<void> {
    await this.db.run('DELETE FROM posts WHERE id = ?', [id]);
  }

  // Comment operations
  async createComment(comment: Comment): Promise<number> {
    const result = await this.db.run(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [comment.post_id, comment.user_id, comment.content]
    );
    return result.insertId!;
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await this.db.query<Comment>(
      `SELECT c.*, u.name as author_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [postId]
    );
  }

  async deleteComment(id: number): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id = ?', [id]);
  }

  // Search
  async searchPosts(query: string): Promise<Post[]> {
    return await this.db.query<Post>(
      `SELECT p.*, u.name as author_name
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.published = 1
       AND (p.title LIKE ? OR p.content LIKE ?)
       ORDER BY p.created_at DESC`,
      [`%${query}%`, `%${query}%`]
    );
  }

  // Statistics
  async getStats() {
    const [users, posts, comments] = await Promise.all([
      this.db.query('SELECT COUNT(*) as count FROM users'),
      this.db.query('SELECT COUNT(*) as count FROM posts WHERE published = 1'),
      this.db.query('SELECT COUNT(*) as count FROM comments'),
    ]);

    return {
      totalUsers: users[0].count,
      publishedPosts: posts[0].count,
      totalComments: comments[0].count,
    };
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}
```

### Example 2: Sync Engine for Offline-First Apps

Implement a robust sync system for CRDTs and local-first applications:

```typescript
import { DatabaseService } from './DatabaseService';

export interface SyncOperation {
  id?: number;
  table_name: string;
  record_id: number;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  data?: any;
  synced: boolean;
  created_at?: number;
}

export class SyncEngine {
  private db: DatabaseService;
  private syncInterval: number = 30000; // 30 seconds
  private intervalId: any = null;
  private isSyncing = false;

  constructor(db: DatabaseService) {
    this.db = db;
  }

  /**
   * Start automatic sync
   */
  startAutoSync(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(async () => {
      await this.sync();
    }, this.syncInterval);

    // Initial sync
    this.sync();
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Manually trigger sync
   */
  async sync(): Promise<{ uploaded: number; downloaded: number }> {
    if (this.isSyncing) {
      console.log('Sync already in progress');
      return { uploaded: 0, downloaded: 0 };
    }

    this.isSyncing = true;
    console.log('Starting sync...');

    try {
      // Upload local changes
      const uploaded = await this.uploadChanges();

      // Download remote changes
      const downloaded = await this.downloadChanges();

      console.log(`Sync complete: ${uploaded} uploaded, ${downloaded} downloaded`);
      return { uploaded, downloaded };
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Log a change for sync
   */
  async logChange(
    tableName: string,
    recordId: number,
    operation: 'INSERT' | 'UPDATE' | 'DELETE',
    data?: any
  ): Promise<void> {
    await this.db.run(
      'INSERT INTO sync_log (table_name, record_id, operation, data) VALUES (?, ?, ?, ?)',
      [tableName, recordId, operation, JSON.stringify(data)]
    );
  }

  /**
   * Upload pending changes to server
   */
  private async uploadChanges(): Promise<number> {
    // Get unsynced operations
    const operations = await this.db.query<SyncOperation>(
      'SELECT * FROM sync_log WHERE synced = 0 ORDER BY created_at ASC'
    );

    if (operations.length === 0) {
      return 0;
    }

    try {
      // Send to server (implement your API call here)
      await this.sendToServer(operations);

      // Mark as synced
      const ids = operations.map((op) => op.id);
      await this.db.run(
        `UPDATE sync_log SET synced = 1 WHERE id IN (${ids.join(',')})`,
        []
      );

      return operations.length;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  /**
   * Download changes from server
   */
  private async downloadChanges(): Promise<number> {
    try {
      // Get latest sync version
      const result = await this.db.query(
        'SELECT MAX(sync_version) as version FROM users'
      );
      const currentVersion = result[0]?.version || 0;

      // Fetch from server (implement your API call here)
      const remoteChanges = await this.fetchFromServer(currentVersion);

      // Apply changes in transaction
      await this.db.transaction(async (tx) => {
        for (const change of remoteChanges) {
          await this.applyRemoteChange(tx, change);
        }
      });

      return remoteChanges.length;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  /**
   * Send operations to server
   */
  private async sendToServer(operations: SyncOperation[]): Promise<void> {
    // Implement your server API call here
    // Example:
    // const response = await fetch('https://api.example.com/sync/upload', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ operations })
    // });
    // if (!response.ok) throw new Error('Upload failed');
    console.log('Sending to server:', operations);
  }

  /**
   * Fetch changes from server
   */
  private async fetchFromServer(afterVersion: number): Promise<any[]> {
    // Implement your server API call here
    // Example:
    // const response = await fetch(`https://api.example.com/sync/download?after=${afterVersion}`);
    // if (!response.ok) throw new Error('Download failed');
    // return await response.json();
    console.log('Fetching from server after version:', afterVersion);
    return [];
  }

  /**
   * Apply a remote change to local database
   */
  private async applyRemoteChange(tx: any, change: any): Promise<void> {
    const { table, operation, data } = change;

    switch (operation) {
      case 'INSERT':
      case 'UPDATE':
        await this.upsertRecord(tx, table, data);
        break;
      case 'DELETE':
        await tx.run(`DELETE FROM ${table} WHERE id = ?`, [data.id]);
        break;
    }
  }

  /**
   * Insert or update a record
   */
  private async upsertRecord(tx: any, table: string, data: any): Promise<void> {
    const fields = Object.keys(data).filter((k) => k !== 'id');
    const placeholders = fields.map(() => '?').join(',');
    const updates = fields.map((f) => `${f} = excluded.${f}`).join(',');

    await tx.run(
      `INSERT INTO ${table} (${fields.join(',')}) VALUES (${placeholders})
       ON CONFLICT(id) DO UPDATE SET ${updates}`,
      fields.map((f) => data[f])
    );
  }

  /**
   * Get sync status
   */
  async getSyncStatus(): Promise<{
    pending: number;
    lastSync?: number;
  }> {
    const pending = await this.db.query(
      'SELECT COUNT(*) as count FROM sync_log WHERE synced = 0'
    );

    const lastSync = await this.db.query(
      'SELECT MAX(created_at) as last_sync FROM sync_log WHERE synced = 1'
    );

    return {
      pending: pending[0].count,
      lastSync: lastSync[0].last_sync,
    };
  }
}
```

### Example 3: E-Commerce Shopping Cart

```typescript
import { DatabaseService } from './DatabaseService';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

export interface CartItem {
  id?: number;
  product_id: number;
  quantity: number;
  price_at_add: number;
  product?: Product;
}

export interface Order {
  id?: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at?: number;
}

export class ShoppingCartApp {
  private db: DatabaseService;

  constructor() {
    this.db = new DatabaseService({
      name: 'shop',
      version: 1,
    });
  }

  async initialize(): Promise<void> {
    await this.db.initialize();

    // Create tables
    await this.db.transaction(async (tx) => {
      await tx.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          stock INTEGER DEFAULT 0,
          image_url TEXT
        )
      `);

      await tx.execute(`
        CREATE TABLE IF NOT EXISTS cart_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          price_at_add REAL NOT NULL,
          FOREIGN KEY (product_id) REFERENCES products(id)
        )
      `);

      await tx.execute(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          total REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at INTEGER DEFAULT (strftime('%s', 'now'))
        )
      `);

      await tx.execute(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          price REAL NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
        )
      `);
    });
  }

  // Cart operations
  async addToCart(productId: number, quantity: number): Promise<void> {
    // Get product price
    const products = await this.db.query<Product>(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      throw new Error('Product not found');
    }

    const product = products[0];

    if (product.stock! < quantity) {
      throw new Error('Insufficient stock');
    }

    // Check if item already in cart
    const existing = await this.db.query<CartItem>(
      'SELECT * FROM cart_items WHERE product_id = ?',
      [productId]
    );

    if (existing.length > 0) {
      // Update quantity
      await this.db.run(
        'UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?',
        [quantity, productId]
      );
    } else {
      // Add new item
      await this.db.run(
        'INSERT INTO cart_items (product_id, quantity, price_at_add) VALUES (?, ?, ?)',
        [productId, quantity, product.price]
      );
    }
  }

  async getCart(): Promise<CartItem[]> {
    return await this.db.query<CartItem>(
      `SELECT ci.*, p.name, p.description, p.image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id`
    );
  }

  async updateCartItem(itemId: number, quantity: number): Promise<void> {
    await this.db.run('UPDATE cart_items SET quantity = ? WHERE id = ?', [
      quantity,
      itemId,
    ]);
  }

  async removeFromCart(itemId: number): Promise<void> {
    await this.db.run('DELETE FROM cart_items WHERE id = ?', [itemId]);
  }

  async clearCart(): Promise<void> {
    await this.db.run('DELETE FROM cart_items', []);
  }

  async getCartTotal(): Promise<number> {
    const result = await this.db.query(
      'SELECT SUM(quantity * price_at_add) as total FROM cart_items'
    );
    return result[0]?.total || 0;
  }

  // Checkout
  async checkout(): Promise<number> {
    return await this.db.transaction(async (tx) => {
      // Get cart items
      const cartItems = await tx.query<CartItem>(
        'SELECT * FROM cart_items'
      );

      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price_at_add,
        0
      );

      // Create order
      const orderResult = await tx.run(
        'INSERT INTO orders (total, status) VALUES (?, ?)',
        [total, 'pending']
      );
      const orderId = orderResult.insertId!;

      // Create order items and update stock
      for (const item of cartItems) {
        await tx.run(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price_at_add]
        );

        await tx.run(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }

      // Clear cart
      await tx.run('DELETE FROM cart_items', []);

      return orderId;
    });
  }

  async getOrders(): Promise<Order[]> {
    return await this.db.query<Order>(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}
```

## Framework Integration

### React Integration

```typescript
import React, { useEffect, useState } from 'react';
import { BlogApp, Post } from './BlogApp';

const db = new BlogApp();

export const BlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      await db.initialize();
      const allPosts = await db.getPublishedPosts();
      setPosts(allPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By {(post as any).author_name}</small>
        </article>
      ))}
    </div>
  );
};
```

### Vue 3 Integration

```vue
<template>
  <div>
    <h1>Blog Posts</h1>
    <div v-if="loading">Loading...</div>
    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <small>By {{ post.author_name }}</small>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BlogApp, Post } from './BlogApp';

const db = new BlogApp();
const posts = ref<Post[]>([]);
const loading = ref(true);

onMounted(async () => {
  await db.initialize();
  posts.value = await db.getPublishedPosts();
  loading.value = false;
});
</script>
```

## Performance Optimization

### 1. Use Indexes

```typescript
// Create indexes for frequently queried columns
await db.execute('CREATE INDEX idx_posts_user_id ON posts(user_id)');
await db.execute('CREATE INDEX idx_posts_published ON posts(published)');
```

### 2. Use Transactions for Bulk Operations

```typescript
// Much faster than individual inserts
await db.transaction(async (tx) => {
  for (const item of items) {
    await tx.run('INSERT INTO items (name, value) VALUES (?, ?)', [
      item.name,
      item.value,
    ]);
  }
});
```

### 3. Use Batch Operations

```typescript
const operations = items.map((item) => ({
  statement: 'INSERT INTO items (name, value) VALUES (?, ?)',
  params: [item.name, item.value],
}));

await db.executeBatch(operations);
```

### 4. Use HTTP Protocol for Large Datasets

```typescript
const { port, token } = await db.getServerInfo();

const response = await fetch(`http://localhost:${port}/execute`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    statement: 'SELECT * FROM large_table',
    params: [],
  }),
});

const result = await response.json();
```

## Troubleshooting

### Issue: "Database locked" errors

**Solution**: Use transactions properly and avoid long-running queries:

```typescript
// Bad - multiple operations without transaction
await db.run('INSERT INTO users ...');
await db.run('UPDATE posts ...');

// Good - use transaction
await db.transaction(async (tx) => {
  await tx.run('INSERT INTO users ...');
  await tx.run('UPDATE posts ...');
});
```

### Issue: Slow queries

**Solution**: Add indexes and use EXPLAIN QUERY PLAN:

```typescript
const plan = await db.query('EXPLAIN QUERY PLAN SELECT * FROM posts WHERE user_id = ?', [123]);
console.log('Query plan:', plan);

// Add missing indexes
await db.execute('CREATE INDEX idx_posts_user_id ON posts(user_id)');
```

### Issue: Database file growing too large

**Solution**: Run VACUUM periodically:

```typescript
await db.vacuum();
const size = await db.getDatabaseSize();
console.log('Database size:', size, 'bytes');
```

## Conclusion

You now have a complete understanding of building production-ready applications with **@capgo/capacitor-fast-sql**:

- ✅ Database service with migrations
- ✅ Complete application examples (blog, sync, e-commerce)
- ✅ Sync engine for offline-first apps
- ✅ Framework integration (React & Vue)
- ✅ Performance optimization techniques
- ✅ Troubleshooting common issues

The custom HTTP protocol provides exceptional performance for sync systems and large datasets, making it ideal for local-first applications and IndexedDB replacements.

## Additional Resources

- [Plugin Documentation](/docs/plugins/fast-sql/)
- [Getting Started Guide](/docs/plugins/fast-sql/getting-started)
- [GitHub Repository](https://github.com/Cap-go/capacitor-fast-sql)
