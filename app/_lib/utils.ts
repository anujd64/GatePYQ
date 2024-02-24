
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { findUser, createUser } from "../_server/actions/UserAction";
import { IUser } from "../_server/UserService/IUserService";
import { json } from "stream/consumers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */

export function shuffleArray(array: string[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}


// export async function getTags() {
//   const res = await fetch('http://localhost:2020/tags')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }


export function validateRegisterForm(values: {email:string,password:string,passwordC:string, username:string}) {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.password !== values.passwordC) {
    const errMsg = "Passwords don't match";
    errors.password = errMsg;
    errors.passwordC = errMsg;
  }

  return errors;
}

export async function onRegisterSubmit(values:{email:string,password:string, passwordC:string,username:string}) {

  const userObj = (values: { email: string; password: string; username?: string; })=> {
    return {
    email:values.email,
    password:values.password,
    username:values.username 
  }
}
  const data = findUser({email: values.email})
  let user = await data.then(json => json.data);
  if(user === null){
    user = await createUser(userObj(values)).then(json => json.data)
  } 
  return user;
}


export function validateLoginForm(values: {email:string,password:string}) {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.password == "") {
    const errMsg = "Password is too short";
    errors.password = errMsg;
  }

  return errors;
}