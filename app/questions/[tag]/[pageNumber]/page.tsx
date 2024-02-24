"use server";
import React from "react";
// import { BookCard } from '@/Client/Components/Home/BookCard';
import { fetchQuestions } from "@/app/_server/actions/QuestionActions";
import QuestionCard from "@/components/ui/QuestionCard";
import {
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  Pagination,
} from "@/components/ui/pagination";
import { getQuestions } from "@/app/_server/mongo-data-api/data-api";
import { IQuestion } from "@/app/_server/QuestionService/IQuestionService";

type ISearchQuery = {
  page: string;
};

type HomeProps = {
  params: any;
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function Home(searchParams: HomeProps) {
  // get the current page number

  const page = searchParams.params.pageNumber;
  const text = decodeURI(searchParams.params.tag);

  const pageNumber = page && !isNaN(Number(page)) ? Number(page) : 1;

  const limit = 10;
  const skip = pageNumber === 1 ? 0 : 10;

  let questions: IQuestion[];
  let totalCount;
  try {
    const result = await getQuestions({
      arr: [text],
      skip: skip,
      limit: limit,
    });
    questions = result.data;
      totalCount = result.totalCount;
  } catch (error) {
    // If the first query fails, run the second one
    console.error("Error with the first query:", error);

    try {
      const result = await fetchQuestions(
        text,
        pageNumber,
        limit
      );
      questions = result.data;
      totalCount = result.totalCount;
    } catch (secondError) {
      // Handle the second query error
      console.error("Error with the second query:", secondError);
    }
  }

  console.log("page #", pageNumber, " tag", text);
  /* begin:: feetch book list */
  // const limit = 10;
  // // const { data: questions, totalCount } = await fetchQuestions(
  // //   text,
  // //   pageNumber,
  // //   limit
  // // );
  // const skip = pageNumber == 1 ? 0 : 10;

  // const { data: questions, totalCount } = await getQuestions({
  //   arr: [text],
  //   skip: skip,
  //   limit: limit,
  // });

  return (
    <div className="lg:px-8 px-2">
      <h2 className="justify-center text-center font-bold text-2xl my-5">
        {text}
      </h2>
      <hr className="w-full h-1 border-zinc-600" />
      <div className="mt-2 result-container lg:px-40 px-2">
        {questions!.length ? (
          <>
            {questions!.map((question: IQuestion, index: number) => (
              <QuestionCard
                key={index+question._id}
                questionNumber={
                  pageNumber == 1
                    ? index + 1 * pageNumber
                    : index + pageNumber * limit - 10 + 1
                }
                question={question}
              />
            ))}
            <Pagination>
              <PaginationContent>
                {pageNumber > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/questions/${text}/${pageNumber - 1}`}
                    />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href="#">{pageNumber}</PaginationLink>
                </PaginationItem>
                {totalCount - limit * page + 10 > 10 && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/questions/${text}/${pageNumber + 1}`}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <h4 className="text-center">No books found</h4>
        )}
      </div>
    </div>
  );
}
