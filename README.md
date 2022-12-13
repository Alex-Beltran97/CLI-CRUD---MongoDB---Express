# CLI - CRUD Todo list (MongoDB + Express)

This project consists of a CRUD application working with MongoDB NoSql database.

## How can I run this application?

You must have MongoDB installed on your PC, you can also download Docker and create a container with a MongoDB image and run it by connecting port 27017 of the container to your local port 27017.

2. The database name must be called "Todo" and you must create a "Task" collection. The schema contains the following data:

```
const taskSchema = new Schema({
  _id: String,
  name: String,
  completedEn: Date || null
});

```

3. Run the following two commands from the terminal:

 * npm run __start:api__: Connect to the API from MongoDB.
 * npm run __start__: Run CLI application


Thanks for your attention and if you want to give any comments to make it better, I listen to you.

Translated with www.DeepL.com/Translator (free version)