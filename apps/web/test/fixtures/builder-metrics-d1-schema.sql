DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT,
  actor_user_id TEXT,
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER,
  started_at INTEGER,
  completed_at INTEGER,
  runner_wait_ms INTEGER,
  payload_descriptor TEXT,
  error TEXT,
  provider TEXT
);
