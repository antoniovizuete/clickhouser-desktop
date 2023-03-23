use crate::errors::Result;
use rusqlite::Connection;
use rusqlite_migration::{Migrations, M};

pub fn apply_migrations(connection: &mut Connection) -> Result<()> {
    let migrations = Migrations::new(vec![
        M::up(
            "CREATE TABLE IF NOT EXISTS connections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                host TEXT NOT NULL,
                port INTEGER NOT NULL,
                secure BOOLEAN NOT NULL,
                username TEXT NOT NULL,
                password TEXT,
                database TEXT
            )",
        ),
        M::up(
            "CREATE TABLE IF NOT EXISTS queries (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                sql TEXT NOT NULL,
                params TEXT
            )",
        ),
        M::up("ALTER TABLE connections ADD color TEXT;"),
    ]);

    migrations.to_latest(connection)?;

    Ok(())
}
