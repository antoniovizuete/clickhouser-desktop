pub type Result<T> = std::result::Result<T, Error>;

pub enum ControlledErrors {
  NotConnected,
  FirstTime,
  NoProjectDirectory,
  NoDataDirectory,
}

impl Into<String> for ControlledErrors {
  fn into(self) -> String {
    match self {
      ControlledErrors::NotConnected => "NotConnected".to_string(),
      ControlledErrors::FirstTime => "FirstTime".to_string(),
      ControlledErrors::NoProjectDirectory => "NoProjectDirectory".to_string(),
      ControlledErrors::NoDataDirectory => "NoDataDirectory".to_string(),
    }
  }
}

pub enum Error {
  ControlledError(ControlledErrors),
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
      Error::ControlledError(e) => e.into(),
      Error::IOError(e) => e.to_string(),
      Error::SqliteError(e) => e.to_string(),
    }
  }
}