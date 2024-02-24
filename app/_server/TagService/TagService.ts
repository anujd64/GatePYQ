import { Repository } from "@/app/_server/RepositoryService";
import { ITag, ITagService } from "./ITagService";

export class TagService implements ITagService {
  private repository: Repository<ITag>;

  constructor() {
    this.repository = new Repository<ITag>("tags");
  }

  async getTags(
    filter: Partial<ITag>,
    page: number = 1,
    limit: number = 30
  ): Promise<{ data: ITag[], totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }
}