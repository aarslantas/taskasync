// Require SQLite3 verbose module
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database, and if it doesn't exist, create it
const db = new sqlite3.Database(
  "./taskAsync.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Error handling for connection
    if (err) {
      return console.error(err.message);
    } else {
      // Success message for successful connection
      console.log("Connected to the SQLite database.");
    }
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY UNIQUE,
      title TEXT,
      description TEXT,
      status TEXT
  )`,
    (err) => {
      // Error handling for table creation
      if (err) {
        return console.error(err.message);
      }
      console.log("Created tasks table");

      // Close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Closed the database connection.");
      });
    }
  );
});
