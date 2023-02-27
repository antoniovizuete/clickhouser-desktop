
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;
use errors::{ControlledErrors, Error};
use repository::{Repository, clickhouse_connection::ClickhouseConnection, check_database_file};
use tauri::State;

mod errors;
mod repository;


struct Context {
    repository: Mutex<Option<Repository>>,
}

unsafe impl Send for Context {}
unsafe impl Sync for Context {}

#[tauri::command]
fn is_first_time() -> Result<bool, String> {
    match check_database_file(&true) {
        Ok(_) => Ok(false),
        Err(e) => {
            match e {
                Error::ControlledError(ControlledErrors::FirstTime) => Ok(true),
                _ => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

#[tauri::command]
fn init_db(passphrase: String, context: State<Context>) -> Result<(), String> {
    let repository = Repository::new(&passphrase);
    match repository {
        Ok(repository) => {
            let mut context_repo = context.repository.lock().unwrap();
            *context_repo = Some(repository);
            Ok(())
        }
        Err(e) => {
            let string_error: String = e.into();
            Err(string_error)
        }
    }
}

#[tauri::command]
fn get_all_connections(context: tauri::State<'_,Context>) -> Result<Vec<ClickhouseConnection>, String> {
    match context.repository.lock().unwrap().as_ref() {
        None => Err(ControlledErrors::NotConnected.into()),
        Some(repository) => {
            match repository.get_all() {
                Ok(connections) => Ok(connections),
                Err(e) => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

#[tauri::command]
fn get_connection_by_id(id: i32, context: tauri::State<'_,Context>) -> Result<ClickhouseConnection, String> {
    match context.repository.lock().unwrap().as_ref() {
        None => Err(ControlledErrors::NotConnected.into()),
        Some(repository) => {
            match repository.get_by_id(id) {
                Ok(connection) => Ok(connection),
                Err(e) => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

#[tauri::command]
fn insert_connection(connection: ClickhouseConnection, context: tauri::State<'_,Context>) -> Result<(), String> {
    //let repository = get_context_repository(context)?;
    match context.repository.lock().unwrap().as_ref() {
        None => Err(ControlledErrors::NotConnected.into()),
        Some(repository) => {
            match repository.create(connection) {
                Ok(_) => Ok(()),
                Err(e) => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

#[tauri::command]
fn update_connection(id: u32, connection: ClickhouseConnection, context: tauri::State<'_,Context>) -> Result<(), String> {
    match context.repository.lock().unwrap().as_ref() {
        None => Err(ControlledErrors::NotConnected.into()),
        Some(repository) => {
            match repository.update(id, connection) {
                Ok(_) => Ok(()),
                Err(e) => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

#[tauri::command]
fn delete_connection(id: u32, context: tauri::State<'_,Context>) -> Result<(), String> {
    match context.repository.lock().unwrap().as_ref() {
        None => Err(ControlledErrors::NotConnected.into()),
        Some(repository) => {
            match repository.delete(id) {
                Ok(_) => Ok(()),
                Err(e) => {
                    let string_error: String = e.into();
                    Err(string_error)
                }
            }
        }
    }
}

fn main() {
    let context = Context {
        repository: Default::default(),
    };

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![
            is_first_time,
            init_db, 
            get_all_connections,
            get_connection_by_id,
            insert_connection,
            update_connection,
            delete_connection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
