#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ClickhouseConnection {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub password: Option<String>,
    pub database: Option<String>,
}