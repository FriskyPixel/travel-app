const app = require("./server");

// Setup Server
const port = 8000;
const server = app.listen(port, function () {
  console.log(`Server running on local host: ${port}`);
});
