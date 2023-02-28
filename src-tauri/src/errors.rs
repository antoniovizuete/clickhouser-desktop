pub type Result<T> = std::result::Result<T, Error>;

pub enum ControlledErrors {
  NotConnected,
  FirstTime,
  NoDatabaseFile,
  NoDataDirectory,
  NoProjectDirectory,
  WrongPassphrase,
}

impl Into<String> for ControlledErrors {
  fn into(self) -> String {
    match self {
      ControlledErrors::NotConnected => "NotConnected".to_string(),
      ControlledErrors::FirstTime => "FirstTime".to_string(),
      ControlledErrors::NoDatabaseFile => "NoDatabaseFile".to_string(),
      ControlledErrors::NoDataDirectory => "NoDataDirectory".to_string(),
      ControlledErrors::NoProjectDirectory => "NoProjectDirectory".to_string(),
      ControlledErrors::WrongPassphrase => "WrongPassphrase".to_string(),
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
    match error {
      rusqlite::Error::SqliteFailure(error, _) => {
        if error.code == rusqlite::ErrorCode::NotADatabase {
          return Error::ControlledError(ControlledErrors::WrongPassphrase);
        }
      }
      _ => {}
    }
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