#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Query {
    pub id: String,
    pub name: String,
    pub sql: String,
    pub params: Option<String>,
}
