#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use context::Context;

mod commands;
mod context;
mod errors;
mod repository;

fn main() {
    let context = Context {
        repository: Default::default(),
        database_file: Default::default(),
    };

    tauri::Builder::default()
        .manage(context)
        .invoke_handler(tauri::generate_handler![
            commands::is_first_time,
            commands::init_db,
            commands::delete_db,
            commands::get_all_connections,
            commands::get_connection_by_id,
            commands::insert_connection,
            commands::update_connection,
            commands::delete_connection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
