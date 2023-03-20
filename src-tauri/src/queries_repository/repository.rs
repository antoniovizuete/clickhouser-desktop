use rusqlite::Connection;

use crate::errors::Result;

use super::query::Query;

const TABLE: &str = "queries";

pub struct Repository<'a> {
    database_connection: &'a Connection,
}

impl<'a> Repository<'a> {
    pub fn new(connection: &'a Connection) -> Repository<'a> {
        Repository {
            database_connection: &connection,
        }
    }

    pub fn create(&self, query: Query) -> Result<()> {
        self.database_connection.execute(
            format!(
                "INSERT INTO {} (id, name, sql, params) VALUES (?1, ?2, ?3, ?4)",
                TABLE
            )
            .as_str(),
            (query.id, query.name, query.sql, query.params),
        )?;

        Ok(())
    }

    pub fn get_all(&self) -> Result<Vec<Query>> {
        let mut stmt = self.database_connection.prepare(
            format!("SELECT id, name, sql, params FROM {} ORDER BY name", TABLE).as_str(),
        )?;
        let queries_iter = stmt.query_map([], |row| Ok(map_row_to_clickhouse_connection(row)))?;

        let mut queries = Vec::new();
        for query in queries_iter {
            queries.push(query?);
        }

        Ok(queries)
    }

    pub fn get_by_id(&self, id: String) -> Result<Query> {
        let mut stmt = self.database_connection.prepare(
            format!("SELECT id, name, sql, params FROM {} WHERE id = ?1", TABLE).as_str(),
        )?;
        let connection = stmt.query_row([id], |row| Ok(map_row_to_clickhouse_connection(row)))?;

        Ok(connection)
    }

    pub fn update(&self, id: String, query: Query) -> Result<()> {
        self.database_connection.execute(
            format!(
                "UPDATE {} SET name = ?1, sql = ?2, params = ?3 WHERE id = ?4",
                TABLE
            )
            .as_str(),
            (query.name, query.sql, query.params, id),
        )?;

        Ok(())
    }

    pub fn delete(&self, id: String) -> Result<()> {
        self.database_connection.execute(
            format!("DELETE FROM {} WHERE id = ?1", TABLE).as_str(),
            [id],
        )?;

        Ok(())
    }
}

fn map_row_to_clickhouse_connection(row: &rusqlite::Row) -> Query {
    Query {
        id: row.get(0).unwrap(),
        name: row.get(1).unwrap(),
        sql: row.get(2).unwrap(),
        params: row.get(3).unwrap_or(None),
    }
}
