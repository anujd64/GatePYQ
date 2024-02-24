'use server';
import { IQuestion } from "../QuestionService/IQuestionService";
import { QuestionService } from "../QuestionService/QuestionService"

export const fetchQuestions = async (tag:string, pageNumber: number,limit:number) => {
  const questionService = new QuestionService();

  console.log(tag);
  const arr = [tag]
  const filterPredicate: Partial<IQuestion> = {
    tags: { $in: arr } 
    };
  return await questionService.getQuestions(
    // { tags: $all<IQuestion>:[tag]  }
      filterPredicate 
     , pageNumber, limit);
};