import React, { Suspense } from "react";
import HeroSection from "@/components/ui/HeroSection";
import TagCard from "@/components/ui/TagCard";
import { fetchTags } from "./_server/actions/TagActions";
import { getServerSession } from "next-auth";
import { getTags } from "./_server/mongo-data-api/data-api";
import { ITag } from "./_server/TagService/ITagService";
import SearchBar from "@/components/ui/SearchBar";

type ISearchQuery = {
  page: string;
};

type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Home(params: HomeProps) {
  // get the current page number
  const { page } = params as ISearchQuery;
  let pageNumber = page && !isNaN(Number(page)) ? Number(page) : 1;

  let tags;
  let totalCount;
  try{
    const result = await getTags();
      tags = result.data;
      totalCount = result.totalCount;
  }catch(error){
    console.log("Error in first query",error);
    try{
      const result = await fetchTags(pageNumber, 999);
    tags = result.data;
    totalCount = result.totalCount;
      
    }catch(error){
      console.log("Error in second query",error);

    }
  }


  return (
      <div>

        {/* <div id="solve-by-container" className="flex flex-row"> */}
        {/* </div> */}

        <div className="lg:m-5 m-2">
          <HeroSection buttonText={tags.at(Math.random() * (tags.length - 0) + 0)?._id}/>
            {tags?.length ? (
              <>
                {tags.map((tag:ITag, index:string) => (
                  <TagCard key={index} text={tag._id} />
                ))}
                
              </>
            ) : (
              <h4 className="text-center">No tags found</h4>
            )}  
        </div>
      </div>
  );
}
