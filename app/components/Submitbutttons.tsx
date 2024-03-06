"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"
import { useFormStatus } from "react-dom"

export function SubmitButton() {
     const { pending } = useFormStatus()

     return (
          <>
               {
                    pending ? (
                         <Button className="w-fit" disabled><Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              Please Wait
                         </Button>
                    ) : (
                         <Button type="submit" className="w-fit">
                              Save Now
                         </Button>
                    )
               }
          </>
     )
}



export function StripeSubscriptionCreationButton() {
     const { pending } = useFormStatus()

     return (
          <>
               {
                    pending ? (
                         <Button className="w-full" disabled><Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              Please Wait
                         </Button>
                    ) : (
                         <Button className="w-full">
                              Create Subscription
                         </Button>
                    )
               }
          </>
     )
}



export function StripePortal() {
     const { pending } = useFormStatus()

     return (
          <>
               {
                    pending ? (
                         <Button className="w-fit" disabled><Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              Please Wait
                         </Button>
                    ) : (
                         <Button className="w-fit" type="submit">
                              View payment details
                         </Button>
                    )
               }
          </>
     )
}



export function TrashDelete() {
     const { pending } = useFormStatus()

     return (
          <>
               {
                    pending ? (
                         <Button variant={"destructive"} type="submit" size={"icon"} disabled>
                              <Loader2 className="h-4 w-4 animate-spin" />
                         </Button>
                    ) : (
                         <Button variant={"destructive"} type="submit" size={"icon"}>
                              <Trash className="h-4 w-4" />
                         </Button>
                    )
               }
          </>
     )
}