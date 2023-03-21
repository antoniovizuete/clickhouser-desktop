use super::{query::Query, repository::Repository};
use crate::context::Context;
use tauri::State;

#[tauri::command]
pub fn get_all_query(context: State<'_, Context>) -> Result<Vec<Query>, String> {
    match Repository::new(&context.connection).get_all() {
        Ok(queries) => Ok(queries),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn get_query_by_id(id: String, context: State<'_, Context>) -> Result<Query, String> {
    match Repository::new(&context.connection).get_by_id(id) {
        Ok(query) => Ok(query),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn insert_query(entity: Query, context: State<'_, Context>) -> Result<(), String> {
    match Repository::new(&context.connection).create(entity) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn update_query(id: String, entity: Query, context: State<'_, Context>) -> Result<(), String> {
    match Repository::new(&context.connection).update(id, entity) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
pub fn delete_query(id: String, context: State<'_, Context>) -> Result<(), String> {
    match Repository::new(&context.connection).delete(id) {
        Ok(_) => Ok(()),
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}
