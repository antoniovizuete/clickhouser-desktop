# Clickhouse Desktop 
Clickhouse Desktop is a desktop client with a graphical interface for Clickhouse, built using React, Tauri, and Tensorflow. This client allows you to interact with Clickhouse in an easy and efficient way.

## Prerequisites

Before you begin, make sure you have the following installed:
* [Rust](https://www.rust-lang.org/)
* [Node.js](https://nodejs.org/)

## Installing Rust

To install Rust on your system, follow the instructions on the [official Rust page](https://www.rust-lang.org/tools/install).

## Dependencies on Linux

If you are using Linux, install the following dependencies:

```bash
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/antoniovizuete/clickhouse-desktop.git
```

2. Install the project dependencies:
```bash
npm install
```

3. Build the project
```bash
npm run tauri build
```

After building the project, you will find the executable files in the src-tauri/target/release folder.

On Linux, look for the .deb file and run it to install the program.
On Windows, look for the .exe file and run it to install the program.
On macOS, look for the .dmg file and run it to install the program.

## Recommended IDE

It is recommended to use [VS Code](https://code.visualstudio.com/) with the following extensions for the best workflow:

- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)