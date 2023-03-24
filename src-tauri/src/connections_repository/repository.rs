use rusqlite::Connection;

use crate::errors::Result;

use super::clickhouse_connection::ClickhouseConnection;

const TABLE: &str = "connections";

pub struct Repository<'a> {
    database_connection: &'a Connection,
}

impl<'a> Repository<'a> {
    pub fn new(connection: &'a Connection) -> Repository<'a> {
        Repository {
            database_connection: &connection,
        }
    }

    pub fn create(&self, connection: ClickhouseConnection) -> Result<()> {
        self.database_connection.execute(
            format!("INSERT INTO {} (name, host, port, secure, username, password, database, color) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)", TABLE).as_str(),
            (connection.name, connection.host, connection.port, connection.secure, connection.username, connection.password, connection.database, connection.color)
        )?;

        Ok(())
    }

    pub fn get_all(&self) -> Result<Vec<ClickhouseConnection>> {
        let mut stmt = self.database_connection.prepare(
            format!(
                "SELECT id, name, host, port, secure, username, password, database, color FROM {} ORDER BY name, host, port",
                TABLE
            )
            .as_str(),
        )?;
        let connections_iter =
            stmt.query_map([], |row| Ok(map_row_to_clickhouse_connection(row)))?;

        let mut connections = Vec::new();
        for connection in connections_iter {
            connections.push(connection?);
        }

        Ok(connections)
    }

    pub fn get_by_id(&self, id: i32) -> Result<ClickhouseConnection> {
        let mut stmt = self
            .database_connection
            .prepare(format!("SELECT id, name, host, port, secure, username, password, database, color FROM {} WHERE id = ?1", TABLE).as_str())?;
        let connection = stmt.query_row([id], |row| Ok(map_row_to_clickhouse_connection(row)))?;

        Ok(connection)
    }

    pub fn update(&self, id: u32, connection: ClickhouseConnection) -> Result<()> {
        self.database_connection.execute(
            format!("UPDATE {} SET name = ?1, host = ?2, port = ?3, secure = ?4, username = ?5, password = ?6, database = ?7, color = ?8 WHERE id = ?9", TABLE).as_str(),
            (connection.name, connection.host, connection.port, connection.secure, connection.username, connection.password, connection.database, connection.color, id)
        )?;

        Ok(())
    }

    pub fn delete(&self, id: u32) -> Result<()> {
        self.database_connection.execute(
            format!("DELETE FROM {} WHERE id = ?1", TABLE).as_str(),
            [id],
        )?;

        Ok(())
    }
}

fn map_row_to_clickhouse_connection(row: &rusqlite::Row) -> ClickhouseConnection {
    ClickhouseConnection {
        id: row.get(0).unwrap_or(None),
        name: row.get(1).unwrap_or(None),
        host: row.get(2).unwrap(),
        port: row.get(3).unwrap(),
        secure: row.get(4).unwrap(),
        username: row.get(5).unwrap(),
        password: row.get(6).unwrap_or(None),
        database: row.get(7).unwrap_or(None),
        color: row.get(8).unwrap_or(None),
    }
}
