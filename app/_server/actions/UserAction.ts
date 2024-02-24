'use server';

import { IUser } from "../UserService/IUserService";
import { UserService } from "../UserService/UserService"

export async function findUser(user:Partial<IUser>){
  const userService = new UserService();
  return await userService.findUser(user);
};


export const createUser = async (user:Partial<IUser>) => {
    const userService = new UserService();
    return await userService.createUser(user);
  };