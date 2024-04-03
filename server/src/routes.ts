import { Request, Response, Router } from "express";
import { db } from "./db";
import multer from "multer";
import os from "os";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

router.get("/users", (req: Request, res: Response) => {
  const users = db
    .prepare(
      "SELECT first_name as firstName, last_name as lastName, * FROM users",
    )
    .all();

  res.json({
    users: users,
  });
});

router.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "SELECT first_name as firstName, last_name as lastName, * FROM users where id = @id",
    )
    .get({
      id,
    });

  res.json({
    user,
  });
});

router.post("/users", (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name, email, birthday) VALUES (@firstName, @lastName, @email, @birthday)",
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
    });

  res.json({
    id: user.lastInsertRowid,
  });
});

router.put("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  const userExists = db.prepare("SELECT id FROM users where id = @id").get({
    id,
  });

  if (!userExists) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "UPDATE users SET (first_name, last_name, email, birthday) = (@firstName, @lastName, @email, @birthday) where id = @id",
    )
    .run({
      id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
    });

  res.json({
    rowsAffected: user.changes,
  });
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  },
);

export default router;
