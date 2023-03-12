use super::{clickhouse_connection::ClickhouseConnection, repository::Repository};
use crate::context::Context;
use tauri::State;

#[tauri::command]
pub fn get_all_connections(
    context: State<'_, Context>,
) -> Result<Vec<ClickhouseConnection>, String> {
    match Repository::new(&context.connection).get_all() {
        Ok(connections) => Ok(connections),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn get_connection_by_id(
    id: i32,
    context: State<'_, Context>,
) -> Result<ClickhouseConnection, String> {
    match Repository::new(&context.connection).get_by_id(id) {
        Ok(connection) => Ok(connection),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn insert_connection(
    connection: ClickhouseConnection,
    context: State<'_, Context>,
) -> Result<(), String> {
    match Repository::new(&context.connection).create(connection) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn update_connection(
    id: u32,
    connection: ClickhouseConnection,
    context: State<'_, Context>,
) -> Result<(), String> {
    match Repository::new(&context.connection).update(id, connection) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn delete_connection(id: u32, context: State<'_, Context>) -> Result<(), String> {
    match Repository::new(&context.connection).delete(id) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}
