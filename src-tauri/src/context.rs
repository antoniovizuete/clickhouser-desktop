use rusqlite::Connection;

use crate::{database::Database, errors::Result};

pub struct Context {
    pub connection: Connection,
}

impl Context {
    pub fn new() -> Result<Context> {
        match Database::new_connection() {
            Ok(connection) => Ok(Context {
                connection: connection,
            }),
            Err(e) => Err(e),
        }
    }
}

unsafe impl Send for Context {}
unsafe impl Sync for Context {}
