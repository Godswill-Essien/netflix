import { User } from "@/models/User";
import jsonwebtoken  from "jsonwebtoken";
import { NextRequest } from "next/server";

import Cookie from "js-cookie"


export default function currentUser(req: NextRequest){
   const token = req.cookies.get("token")?.value

   const value = jsonwebtoken.decode(token!) as any
   const user = value.user  as User

   return user
}



export async function logout(){

await fetch("/api/auth/signout", {
  method: "POST",
  credentials: "include",
});

Cookie.remove("user")

window.location.href = "/login";
   
}




export function isAuth(){

   const token = Cookie.get("user")

   console.log("token: ", token)
   if (!token){
      return false
   } 

   return true
}