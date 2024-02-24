export type ITag = {
    _id:string,
    questionIds: string[],
    count:number
  };
  
  
  export interface ITagService {
    getTags(
      filter: Partial<ITag>
    ): Promise<{ data: ITag[]; totalCount: number }>;
  }
  