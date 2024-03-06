import { ReactNode } from "react";
import { DashboardNav } from "../components/DashBoardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { stripe } from "../lib/stripe";
import { unstable_noStore as noStore } from "next/cache";


export async function getData({ email, id, firstName, lastName, profileImage }: { email: string; id: string; firstName: string | undefined | null; lastName: string | undefined | null; profileImage: string | undefined | null }) {
     noStore()

     const user = await prisma.user.findUnique(
          {
               where: {
                    id: id
               },

               // its  like we are using this to select the specific things we want from the data base
               select: {
                    id: true,
                    stripeCustomerId: true
               }
          }
     )

     // if our user does not exist create new one 
     if (!user) {
          const name = `${firstName ?? ''}${lastName ?? ''}`

          await prisma.user.create(
               {
                    data: {
                         id: id,
                         email: email,
                         name: name
                    }
               }
          )
     }

     if (!user?.stripeCustomerId) {
          // if we dont have a stripecustomer id we are creating a new one
          const data = await stripe.customers.create(
               {
                    email: email
               }
          )

          await prisma.user.update(
               {
                    where: {
                         id: id,
                    },

                    // we are telling it what we want to update 
                    data: {
                         stripeCustomerId: data.id
                    }
               }
          )
     }
}

export default async function DashBoardLayout({ children }: { children: ReactNode }) {
     const { getUser } = getKindeServerSession()
     const user = await getUser()

     if (!user) {
          return redirect("/")
     }

     await getData({ email: user.email as string, firstName: user.given_name as string, id: user.id as string, lastName: user.family_name as string, profileImage: user.picture as string })

     return (
          <div className="flex flex-col space-y-6 mt-10">
               <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
                    <aside className="hidden w-[200px] flex-col md:flex">
                         <DashboardNav />
                    </aside>
                    <main>{children}</main>
               </div>
          </div>
     )

}
