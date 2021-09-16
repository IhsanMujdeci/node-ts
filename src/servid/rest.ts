import express from "express";

function startServer(port: string) {
  const app = express();

  return new Promise((resolve, reject) => {
    app.on;
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });
}
