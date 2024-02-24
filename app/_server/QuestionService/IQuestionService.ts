export type IQuestion = {
  _id:string,
  question: string,
  options: string[],
  correct_options:string[],
  image_links:string[],
  explanation_link:string,
  tags: string[] | any,
};


export interface IQuestionService {
  getQuestions(
    filter: Partial<IQuestion>
  ): Promise<{ data: IQuestion[]; totalCount: number }>;
}
