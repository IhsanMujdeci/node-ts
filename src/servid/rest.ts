import * as express from "express";

export function startServer(port: number): Promise<express.Application> {
  const app = express();

  return new Promise((resolve, reject) => {
    app.on;
    app
      .listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
        resolve(app);
      })

      .on("error", reject);
  });
}
