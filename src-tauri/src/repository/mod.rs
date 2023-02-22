

use directories::ProjectDirs; 
use rusqlite::{Connection};
use std::{fs, path};

use crate::repository::clickhouse_connection::ClickhouseConnection;
use crate::errors::{Result, Error};

pub mod clickhouse_connection;

const TABLE: &str = "connections";
const DATABASE_NAME: &str = "clickmate.db";
const QUALIFIER: &str = "com";
const ORGANIZATION: &str = "clickmate";
const APPLICATION: &str = "clickmate";


pub struct Repository {
    connection: Connection
}

impl Repository {
    pub fn new(passphrase: &String) -> Result<Repository> {
        let database_file = check_database_file()?;
        let connection = Connection::open(&database_file)?;

        connection.pragma_update(None, "KEY", passphrase)?;

        connection.execute(format!("CREATE TABLE IF NOT EXISTS {} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            host TEXT NOT NULL,
            port INTEGER NOT NULL,
            user TEXT NOT NULL,
            password TEXT NOT NULL,
            database TEXT NOT NULL
        )", TABLE).as_str(), [])?;
        println!("Table created");
        Ok(Repository {
            connection
        })
        
    }

    pub fn create(&self, connection: ClickhouseConnection) -> Result<()> {
        self.connection.execute(
            format!("INSERT INTO {} (host, port, user, password, database) VALUES (?1, ?2, ?3, ?4, ?5)", TABLE).as_str(),
            (connection.host, connection.port, connection.user, connection.password, connection.database)
        )?;
        
        Ok(())
    }

    pub fn get_all(&self) -> Result<Vec<ClickhouseConnection>> {
        let mut stmt = self.connection.prepare(format!("SELECT * FROM {}", TABLE).as_str())?;
        let connections_iter = stmt.query_map([], |row| {
            Ok(ClickhouseConnection {
                host: row.get(1)?,
                port: row.get(2)?,
                user: row.get(3)?,
                password: row.get(4)?,
                database: row.get(5)?,
            })
        })?;

        let mut connections = Vec::new();
        for connection in connections_iter {
            connections.push(connection?);
        }

        Ok(connections)
    }

    pub fn get_by_id(&self, id: i32) -> Result<ClickhouseConnection> {
        let mut stmt = self.connection.prepare(
            format!("SELECT * FROM {} WHERE id = ?1", TABLE).as_str()
        )?;
        let connection = stmt.query_row([id], |row| {
            Ok(ClickhouseConnection {
                host: row.get(1)?,
                port: row.get(2)?,
                user: row.get(3)?,
                password: row.get(4)?,
                database: row.get(5)?,
            })
        })?;

        Ok(connection)
    }

}

fn check_database_file() -> core::result::Result<String, Error> {
    let option_project_dirs = ProjectDirs::from(QUALIFIER, ORGANIZATION, APPLICATION);
    if let None = option_project_dirs {
        return Err(Error::ControlledError("Could not find project directories".to_string()));
    }

    let project_dirs = option_project_dirs.unwrap();
    let data_dir = project_dirs.data_dir().to_str();
    if let None = data_dir {
        return Err(Error::ControlledError("Could not find data directory".to_string()));
    }
    let data_dir = data_dir.unwrap();
    
    let is_path_data_dir = path::Path::new(&data_dir).is_dir();
    if !is_path_data_dir {
        if let Err(e) = fs::create_dir_all(&data_dir) {
            return Err(Error::IOError(e));
        }
    }

    let database_file = format!("{}/{}", &data_dir, DATABASE_NAME);
    
    Ok(database_file)
}