//@ts-nocheck
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { cn, shuffleArray } from "@/app/_lib/utils";
import { askGemini } from "@/app/_server/actions/GeminiActions";
import { IQuestion } from "@/app/_server/QuestionService/IQuestionService";
import { LoadingButton } from "./LoadingButton";
import Image from "next/image";
import correct from "@/public/correct.svg";
import wrong from "@/public/wrong.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SmallTag from "./SmallTag";
type QuestionCardProps = {
  question: IQuestion;
  questionNumber: number;
};
export default function QuestionCard({
  question,
  questionNumber,
}: QuestionCardProps) {
  const [optionsArr, setOptionsArr] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const correct_options = question.correct_options;
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const answerCheck = (option: string) => {
    setSelectedAnswers([...selectedAnswers, option]);
    selectedAnswers.push(option);
    if (correct_options.length === selectedAnswers.length) {
      setAnswers(correct_options);
    }
  };

  useEffect(() => {
    const arr = shuffleArray(question.options);
    setOptionsArr(arr);
  }, []);

  let image_link =
    question.image_links.length > 0 ? question.image_links[1] : "";

  const askGeminiClicked = () => {
    setLoading(true);
    setTimeout(() => {
      const response = askGemini(question.question, correct_options.toString());
      
      if (response != null) setLoading(false);
      setGeminiResponse(response);
    }, 500);
  };

  return (
    <div className="rounded-3xl bg-zinc-900 mt-5 px-5 py-5">
      <h5 className="font-outfit px-5 py-5 text-justify">
        <p className="inline font-bold"> Q{`${questionNumber}. `}</p>
        {`${question.question}`}
      </h5>

      <div className="flex flex-row flex-wrap"> {
        question.tags.map((tag,index) => {
          return <SmallTag key={index} text={tag}/>
        })
      } </div>


      {/* {image_link && (
        <img
          className="mx-auto w-auto my-5 rounded-lg"
          src={`${image_link}`}
        ></img>
      )} */}

      {optionsArr.map((option, index) => (
        <div key={index}>
          <div
            key={option}
            onClick={() => answerCheck(option)}
            className={cn(
              "flex flex-row font-outfit font-medium mx-2 my-2.5 rounded-3xl bg-zinc-800 lg:px-20 px-5 py-5 active:scale-90 transition-transform",
              {
                "bg-green-900": selectedAnswers.includes(option),
                "bg-blue-900": answers.length != 0 && answers.includes(option),
                "bg-red-900": answers.length != 0 && !answers.includes(option),
                "text-gray-200": answers,
              }
            )}
          >
            <Image
              className= {cn("mx-2 invert",{"hidden" : selectedAnswers.length !== correct_options.length} )}
              src={answers.includes(option) ? correct : wrong}
              width={25}
              height={25}
              alt=""
            />
            {option}
          </div>
        </div>
      ))}
      <section className="flex flex-row flex-wrap gap-1.5 mx-2 my-1">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-3 mx-1 text-center inline-flex  items-center align-middle"
          href={question.explanation_link}
        >
          GateOverflow
        </Link>

        <LoadingButton
          text={"Ask Gemini"}
          onClick={askGeminiClicked}
          loading={loading}
        />
        {/* <Button className="p-3" onClick={askGeminiClicked} > Ask Gemini !</Button> */}
        <p
          className={cn("p-2 text-justify", {
            hidden: geminiResponse.length < 1,
          })}
        >
          Gemini : {geminiResponse}
        </p>
      </section>
    </div>
  );
}
