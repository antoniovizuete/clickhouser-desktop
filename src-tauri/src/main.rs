#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use context::Context;
use menu::{
    CLOSE_TAB, CLOSE_WINDOW, NEW_QUERY, RUN_QUERY, SAVE_QUERY, TOGGLE_PANEL_CONNECTION,
    TOGGLE_PANEL_QUERY, TOGGLE_PARAMS,
};
use tauri::Manager;

mod connections_repository;
mod context;
mod database;
mod errors;
mod menu;
mod queries_repository;

#[tauri::command]
async fn log(message: String) -> Result<(), String> {
    println!("{}", message);
    Ok(())
}

fn main() {
    let context = Context::new().unwrap();

    tauri::Builder::default()
        .manage(context)
        .menu(menu::build_menu())
        .on_menu_event(|event| match event.menu_item_id() {
            CLOSE_WINDOW => {
                let window = event.window();
                window.close().unwrap();
            }
            CLOSE_TAB | NEW_QUERY | RUN_QUERY | SAVE_QUERY | TOGGLE_PARAMS => {
                let window = event.window();
                window.emit_all(event.menu_item_id(), {}).unwrap()
            }
            TOGGLE_PANEL_CONNECTION | TOGGLE_PANEL_QUERY => {
                let window = event.window();
                window
                    .emit_all("toggle-sidebar", event.menu_item_id())
                    .unwrap()
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            log,
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
