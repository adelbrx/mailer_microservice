const app = require("./app");

// SETTING THE PORT NUMBER
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
