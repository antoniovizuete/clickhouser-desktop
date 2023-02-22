pub type Result<T> = std::result::Result<T, Error>;
pub enum Error {
  ControlledError(String),
  IOError(std::io::Error),
  SqliteError(rusqlite::Error),
}

impl From<rusqlite::Error> for Error {
  fn from(error: rusqlite::Error) -> Self {
    Error::SqliteError(error)
  }
}

impl Into<String> for Error {
  fn into(self) -> String {
    match self {
      Error::ControlledError(e) => e,
      Error::IOError(e) => e.to_string(),
      Error::SqliteError(e) => e.to_string(),
    }
  }
}