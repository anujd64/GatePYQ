import { Button } from "@/components/ui/button";
import heroImage from "@/public/hero-image.svg"
import Link from "next/link";
import Image from 'next/image'
import sparkle from '@/public/sparkle.svg'
type HearoSectionProps = {
    buttonText: string | undefined;
}
export default function HeroSection({buttonText}:HearoSectionProps) {

    return(
        <section className="flex lg:flex-row md:flex-col flex-col items-center">

       <div className="lg:w-3/5 md:w-full w-full">
        <p 
        className="lg:px-10 px-6 pt-5 pb-5 lg:text-5xl md:text-4xl text-3xl w-90 font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Practice GATE CSE Previous year questions on the go!
        </p>
        <p className="lg:px-10 px-6  font-semibold lg:text-lg md:text-sm text-sm text-slate-400">
            Your one stop destination to practice GATE previous year questions. <br />
            Get expalanations from Google&apos;s Gemini Pro
             <Image className="inline invert" alt="sparkle" src={sparkle} width={28} height={28}/>
        </p>
        <div className="flex">
            <Link href={`/questions/${buttonText}/1`}>
            
            <Button className="shadow-xl rounded-xl bg-gray-800 lg:mx-10 mx-5 ">
            <p className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent lg:text-md md:text-sm">Pick a random subject</p>
            </Button>

            </Link>
        </div>
       </div>

       <div className="lg:w-2/5 md:w-full w-full flex items-center justify-center align-top">
        <Image
        alt="hero image"
        src={heroImage}
        />
       </div>
       </section>
    )
}   