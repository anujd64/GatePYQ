import { Repository } from "@/app/_server/RepositoryService";
import { IUser, IUserService } from "./IUserService";

export class UserService implements IUserService {
  private repository: Repository<IUser>;

  constructor() {
    this.repository = new Repository<IUser>("users");
  }
  async createUser(user:Partial<IUser>): Promise<{ data: IUser }> {
    return this.repository.createUser(user);
  }

  async findUser(filter: Partial<IUser>): Promise<{ data: IUser }> {
    return this.repository.findUser(filter);
  }
}
