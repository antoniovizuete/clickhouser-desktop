#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ClickhouseConnection {
    pub id: Option<u32>,
    pub name: Option<String>,
    pub host: String,
    pub port: u16,
    pub secure: bool,
    pub username: String,
    pub password: Option<String>,
    pub database: Option<String>,
    pub color: Option<String>,
}
