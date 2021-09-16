import express from "express";

function startServer(port: string) {
  const app = express();

  return new Promise((resolve, reject) => {
    app.on;
    app.listen(port, () => {
      resolve()
      console.log(`Example app listening at http://localhost:${port}`);
    })
        .on('error', reject)
  });
}
