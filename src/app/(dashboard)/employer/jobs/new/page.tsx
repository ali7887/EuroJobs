import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { redirect } from "next/navigation"

async function createJob(formData:FormData){

"use server"

await db.insert(jobs).values({

title: formData.get("title") as string,
location: formData.get("location") as string,
salary: Number(formData.get("salary")),
employerId: 1,
companyId: 1,
published: true

})

redirect("/dashboard")

}

export default function NewJobPage(){

return (

<form action={createJob}>

<h1>Create Job</h1>

<input name="title" placeholder="Title"/>

<input name="location" placeholder="Location"/>

<input name="salary" placeholder="Salary"/>

<button type="submit">
Create Job
</button>

</form>

)

}
