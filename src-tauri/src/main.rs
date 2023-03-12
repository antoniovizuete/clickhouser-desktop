#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use connections_repository::commands;
use context::Context;

mod connections_repository;
mod context;
mod database;
mod errors;

fn main() {
    let context = Context::new().unwrap();

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![
            commands::get_all_connections,
            commands::get_connection_by_id,
            commands::insert_connection,
            commands::update_connection,
            commands::delete_connection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
