import { Request, Response } from "express";
const {
  findUserByEmail,
  createUser,
  getUsers,
} = require("../database/user.database");
const encryptPassword = require("../utils/bcrypt");

export async function handleCreateUser(req: Request, res: Response) {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  try {
    //Validate data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos. " });
    }

    //Verify if email already exists (poderia fazer isso utilizando a validação do Mongoose, porém preferi fazer manualmente)
    const user = await findUserByEmail(email);

    if (user) {
      return res
        .status(409)
        .json({ message: "Usuário já existe com esse email. " });
    }

    //Encrypt password
    const newPassword = await encryptPassword(password);

    //Create user
    await createUser(name, email, newPassword);

    //Return created user
    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      message: "Algo deu errado ao tentar criar o usuário. ",
      error,
    });
  }
}

export async function handleGetUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res
      .status(200)
      .json({ message: "Usuários carregados com sucesso. ", users });
  } catch (error) {
    return res.status(500).json({
      message: "Algo deu errado ao tentar carregar os usuários. ",
      error,
    });
  }
}
