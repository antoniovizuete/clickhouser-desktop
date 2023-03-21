#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use context::Context;

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
            connections_repository::commands::get_all_connection,
            connections_repository::commands::get_connection_by_id,
            connections_repository::commands::insert_connection,
            connections_repository::commands::update_connection,
            connections_repository::commands::delete_connection,
            queries_repository::commands::get_all_query,
            queries_repository::commands::get_query_by_id,
            queries_repository::commands::insert_query,
            queries_repository::commands::update_query,
            queries_repository::commands::delete_query,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
