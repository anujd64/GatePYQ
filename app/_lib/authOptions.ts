import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
    //  adapter: PrismaAdapter(PrismaClient),
     providers: [
      GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
      
      CredentialsProvider({
        type: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
    
          const credentialDetails = {
            email: credentials?.email,
            password: credentials?.password,
          };
    
          const resp = await fetch(process.env.NEXTAUTH_URL+"/api/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentialDetails),
          });
          const user = await resp.json();
              console.log("user request ",credentials?.email,credentials?.password,"user response", user)
          if (resp.ok) {
            console.log("nextauth user: " + user.user);
        
            return user.user;
          } 
          if(!resp.ok){
            console.log("check your credentials");
            throw new Error(user.message)
          }
          return null;
        },
      }),
     ],
    
    
     callbacks: {
      jwt: async ({ token, user }) => {

        if (user) {
          token.email =  user.email ;
          token.username = user.name;
          token.name = user.name;
          token.image = user.image;
        }


        // if (user) {
        //   const { user: userData } = user;
      
        //   console.log("jwt callback",user, userData)
        //   token.email = userData?.email ?? user.email;
        //   token.username = userData?.name ?? user.name;
        //   token.name = userData?.name ?? user.name;
        //   token.image = userData?.image ?? user.image;
        //   // token.accessToken = userData?.token; // Uncomment if needed
        // }
        return token;
      },
      session: ({ session, token }) => {
        if (token) {
          session.user!.email = token.email;
          session.user!.name = token.name;
          session.user!.image = token.image as string;
          // session.user.accessToken = token.accessToken;
        }
        return session;
      },
    },
    
    pages: {
      signIn: '/profile/login',
    },
    };
