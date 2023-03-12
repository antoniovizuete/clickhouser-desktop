pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum ControlledErrors {
    NoDataDirectory,
    NoProjectDirectory,
    WrongPassphrase,
}

impl Into<String> for ControlledErrors {
    fn into(self) -> String {
        match self {
            ControlledErrors::NoDataDirectory => "NoDataDirectory".to_string(),
            ControlledErrors::NoProjectDirectory => "NoProjectDirectory".to_string(),
            ControlledErrors::WrongPassphrase => "WrongPassphrase".to_string(),
        }
    }
}

#[derive(Debug)]
pub enum Error {
    ControlledError(ControlledErrors),
    IOError(std::io::Error),
    SqliteError(rusqlite::Error),
    MigratonError(rusqlite_migration::Error),
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

impl From<rusqlite_migration::Error> for Error {
    fn from(value: rusqlite_migration::Error) -> Self {
        Error::MigratonError(value)
    }
}

impl Into<String> for Error {
    fn into(self) -> String {
        match self {
            Error::ControlledError(e) => e.into(),
            Error::IOError(e) => e.to_string(),
            Error::SqliteError(e) => e.to_string(),
            Error::MigratonError(e) => e.to_string(),
        }
    }
}
