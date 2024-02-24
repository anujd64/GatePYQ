'use server';

import { TagService } from "../TagService/TagService"

export const fetchTags = async (pageNumber: number,limit:number) => {
  const tagService = new TagService();
  return await tagService.getTags({}, pageNumber, limit);
};