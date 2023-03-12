use base64::{engine::general_purpose, Engine as _};
use sha256::digest;

pub fn calculate_passphrase() -> String {
    let machine_id: String = machine_uid::get().unwrap().to_lowercase();
    let b64 = general_purpose::STANDARD.encode(machine_id.as_bytes());

    digest(b64.as_bytes()).to_string()
}
