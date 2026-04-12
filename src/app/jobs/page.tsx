import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import ApplyButton from "./ApplyButton"

export default async function JobsPage(){

const list = await db
.select()
.from(jobs)
.where(eq(jobs.published,true))

return (

<div>

<h1>Jobs</h1>

{list.map((job:any)=>(

<div key={job.id}>

<h3>{job.title}</h3>

<p>{job.location}</p>

<p>{job.salary}</p>

<ApplyButton jobId={job.id}/>

</div>

))}

</div>

)

}
