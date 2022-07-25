import UserModel from "../models/user.model";

const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const createUser = (name: string, email: string, password: string) => {
  return UserModel.create({
    name,
    email,
    password,
  });
};

const getUsers = () => {
  return UserModel.find();
};

module.exports = {
  findUserByEmail,
  createUser,
  getUsers,
};
