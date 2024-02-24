import { connectToDatabase } from "@/app/_server/db-helper";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }

    await connectToDatabase();

    const user = await prisma.users.findFirst({
      where: { email: email }
    });

    console.log(email, password, "records received", user)

    if(!user){
        return NextResponse.json({message:"Not found"}, {status:404})
    }
    const result =await bcrypt.compare(password, user.hashedPassword as string);

    if(!result){
        return NextResponse.json({message:"Wrong Password"}, {status:401})
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
