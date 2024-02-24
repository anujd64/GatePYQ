export type IUser = {
    _id:string,
    username: string | undefined,
    password: string,
    email:string,
  };
  
  
  export interface IUserService {
    createUser(
      filter: Partial<IUser>
    ): Promise<{ data: IUser;}>;

    findUser(
        filter: Partial<IUser>
      ): Promise<{ data: IUser;}>;
  }
  