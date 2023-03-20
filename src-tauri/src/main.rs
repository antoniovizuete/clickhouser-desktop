#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use connections_repository::commands as connection_commands;
use context::Context;
use queries_repository::commands as query_commands;

mod connections_repository;
mod context;
mod database;
mod errors;
mod queries_repository;

fn main() {
    let context = Context::new().unwrap();

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![
            connection_commands::get_all_connections,
            connection_commands::get_connection_by_id,
            connection_commands::insert_connection,
            connection_commands::update_connection,
            connection_commands::delete_connection,
            query_commands::get_all_queries,
            query_commands::get_query_by_id,
            query_commands::insert_query,
            query_commands::update_query,
            query_commands::delete_query,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
