use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub const NEW_QUERY: &str = "new-query";
pub const RUN_QUERY: &str = "run-query";
pub const SAVE_QUERY: &str = "save-query";
pub const CLOSE_TAB: &str = "close-tab";
pub const CLOSE_WINDOW: &str = "close-window";
pub const TOGGLE_PARAMS: &str = "toggle-params";
pub const TOGGLE_PANEL_CONNECTION: &str = "toggle-panel-connection";
pub const TOGGLE_PANEL_QUERY: &str = "toggle-panel-query";

pub fn build_menu() -> Menu {
    Menu::new()
        .add_submenu(Submenu::new(
            "ClickHouser",
            Menu::new().add_native_item(MenuItem::Quit),
        ))
        .add_item(CustomMenuItem::new("query".to_string(), "File"))
        .add_submenu(build_query_submenu())
        .add_item(CustomMenuItem::new("view-custom".to_string(), "View"))
        .add_submenu(build_view_submenu())
        .add_item(CustomMenuItem::new("run".to_string(), "Run"))
        .add_submenu(build_run_submenu())
}

fn build_query_submenu() -> Submenu {
    let new_query =
        CustomMenuItem::new(NEW_QUERY.to_string(), "New Query").accelerator("CmdOrCtrl+N");
    let save_query = CustomMenuItem::new(SAVE_QUERY.to_string(), "Save").accelerator("CmdOrCtrl+S");
    let close_tab =
        CustomMenuItem::new(CLOSE_TAB.to_string(), "Close Tab").accelerator("CmdOrCtrl+W");
    let close_window = CustomMenuItem::new(CLOSE_WINDOW.to_string(), "Close Window")
        .accelerator("CmdOrCtrl+Shift+W");
    Submenu::new(
        "Query",
        Menu::new()
            .add_item(new_query)
            .add_native_item(MenuItem::Separator)
            .add_item(save_query)
            .add_native_item(MenuItem::Separator)
            .add_item(close_tab)
            .add_item(close_window),
    )
}

fn build_view_submenu() -> Submenu {
    let toggle_params = CustomMenuItem::new(TOGGLE_PARAMS.to_string(), "Parameters")
        .accelerator("CmdOrCtrl+shift+P");
    let toggle_connections =
        CustomMenuItem::new(TOGGLE_PANEL_CONNECTION.to_string(), "Connections")
            .accelerator("CmdOrCtrl+shift+c");
    let toggle_queries = CustomMenuItem::new(TOGGLE_PANEL_QUERY.to_string(), "Saved queries")
        .accelerator("CmdOrCtrl+shift+q");

    Submenu::new(
        "View",
        Menu::new()
            .add_item(toggle_params)
            .add_native_item(MenuItem::Separator)
            .add_item(toggle_connections)
            .add_item(toggle_queries)
            .add_native_item(MenuItem::Separator),
    )
}

fn build_run_submenu() -> Submenu {
    let run_query =
        CustomMenuItem::new(RUN_QUERY.to_string(), "Run query").accelerator("CommandOrControl+R");
    Submenu::new("Run", Menu::new().add_item(run_query))
}
