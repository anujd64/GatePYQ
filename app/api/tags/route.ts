import { Repository } from "@/app/_server/RepositoryService";
import { ITag } from "@/app/_server/TagService/ITagService";
import { NextResponse } from "next/server";

export async function GET() {
  const repository: Repository<ITag> = new Repository<ITag>("tags");

  async function getTags(): Promise<{ data: ITag[], totalCount: number }> {
    const filter = {}
    return repository.find(filter,1,9999);
  }

  const {data}= await getTags()  
  
  return NextResponse.json(data);
}
