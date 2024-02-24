import { connectToDatabase } from "@/app/_server/db-helper";
import prisma from "@/prisma";
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
    try {
        const {name, email, password} = await req.json()
        
        if(!email || !password){
            return NextResponse.json({message: "Invalid data"}, {status: 422});
        }
        let userName = "";
        if(!name){
            userName = await fetch("https://random-data-api.com/api/v2/users").then(data => data.json()).then(json=> json.username);
            // console.log(userName);
        }else{
            userName = name;
        }

        await connectToDatabase();
        const hashedPassword = await bcrypt.hash(password,12);
        const alreadyUser = await prisma.users.findFirst({where: {email: email}})
        if(alreadyUser){
            return NextResponse.json({message:"Already registered!"}, {status:403})
        }
        const user = await prisma.users.create({data:{email,name:userName,hashedPassword}});
        return NextResponse.json({user},{status:201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server Error"}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }

}