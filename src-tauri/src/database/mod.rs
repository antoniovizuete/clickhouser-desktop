use std::{fs, path};

use crate::errors::{ControlledErrors, Error, Result};
use directories::ProjectDirs;
use rusqlite::Connection;

mod migrations;
mod security;

const DATABASE_NAME: &str = "data.db";
const QUALIFIER: &str = "com";
const ORGANIZATION: &str = "clickhouser";
const APPLICATION: &str = "clickhouser-desktop";

pub struct Database {}

impl Database {
    pub fn new_connection() -> Result<Connection> {
        let database_file = Database::check_database_file()?;
        let passphrase = security::calculate_passphrase();

        let mut connection = Connection::open(&database_file)?;
        connection.pragma_update(None, "KEY", passphrase)?;

        migrations::apply_migrations(&mut connection)?;

        Ok(connection)
    }

    pub fn check_database_file() -> core::result::Result<String, Error> {
        let option_project_dirs = ProjectDirs::from(QUALIFIER, ORGANIZATION, APPLICATION);
        if let None = option_project_dirs {
            return Err(Error::ControlledError(ControlledErrors::NoProjectDirectory));
        }

        let project_dirs = option_project_dirs.unwrap();
        let data_dir = project_dirs.data_dir().to_str();
        if let None = data_dir {
            return Err(Error::ControlledError(ControlledErrors::NoDataDirectory));
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
}
