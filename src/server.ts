import app from "./app";
import { AppDataSource } from "./data-source";

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source Initialized");
    })
    .catch((err) => {
      console.error("Error during Data Source Initialization", err);
    });
  console.log(`app listen on port ${port}`);
});
