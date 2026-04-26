// ABOUTME: Server entry point — binds the Express app to a TCP port.
// ABOUTME: Import app from app.ts for use in tests without starting the server.

import app from "./app";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
