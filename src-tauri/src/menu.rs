use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn build_menu() -> Menu {
    Menu::new()
        .add_submenu(Submenu::new(
            "ClickHouser",
            Menu::new().add_native_item(MenuItem::Quit),
        ))
        .add_item(CustomMenuItem::new("query".to_string(), "Query"))
        .add_submenu(build_query_submenu())
        .add_item(CustomMenuItem::new("view".to_string(), "View"))
        .add_submenu(build_view_submenu())
}

fn build_query_submenu() -> Submenu {
    let new_query =
        CustomMenuItem::new("new-query".to_string(), "New query").accelerator("CmdOrCtrl+N");
    let run_query =
        CustomMenuItem::new("run-query".to_string(), "Run query").accelerator("CmdOrCtrl+R");
    let save_query =
        CustomMenuItem::new("save-query".to_string(), "Save query").accelerator("CmdOrCtrl+S");
    let close_tab =
        CustomMenuItem::new("close-tab".to_string(), "Close query").accelerator("CmdOrCtrl+W");
    let close_window = CustomMenuItem::new("close-window".to_string(), "Close Window")
        .accelerator("CmdOrCtrl+Shift+W");
    Submenu::new(
        "Query",
        Menu::new()
            .add_item(new_query)
            .add_item(run_query)
            .add_native_item(MenuItem::Separator)
            .add_item(save_query)
            .add_native_item(MenuItem::Separator)
            .add_item(close_tab)
            .add_item(close_window),
    )
}

fn build_view_submenu() -> Submenu {
    let toggle_params = CustomMenuItem::new("toggle-params".to_string(), "Show Query Parameters")
        .accelerator("CmdOrCtrl+P");

    Submenu::new("View", Menu::new().add_item(toggle_params))
}
