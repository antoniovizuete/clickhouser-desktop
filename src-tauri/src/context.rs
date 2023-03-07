use crate::repository::Repository;
use std::sync::Mutex;

pub struct Context {
    pub repository: Mutex<Option<Repository>>,
    pub database_file: Mutex<Option<String>>,
}

unsafe impl Send for Context {}
unsafe impl Sync for Context {}
