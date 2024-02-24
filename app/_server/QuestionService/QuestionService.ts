import { Repository } from "@/app/_server/RepositoryService";
import { IQuestion, IQuestionService } from "./IQuestionService";

export class QuestionService implements IQuestionService {
  private repository: Repository<IQuestion>;

  constructor() {
    this.repository = new Repository<IQuestion>("questions");
  }

  async getQuestions(
    filter: Partial<IQuestion>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IQuestion[], totalCount: number }> {

    
    return this.repository.find(filter, page, limit);
  }
}