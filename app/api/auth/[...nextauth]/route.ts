import NextAuth from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions'
// import { PrismaClient } from "@prisma/client"
// import { PrismaAdapter } from "@auth/prisma-adapter"
//TODO configure adapter
// If the adapter is not configured the new accounts created via oauth will not be saved to the db


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}