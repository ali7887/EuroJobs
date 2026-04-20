//ok
import { db } from "@/lib/db"
import { applications } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function ApplicationsPage(
{ params }: { params: Promise<{ id: string }> }
){

const { id } = await params

const apps = await db
.select()
.from(applications)
.where(eq(applications.jobId, Number(id)))

return (

<div>

<h1>Applications</h1>

{apps.length === 0 && (
<p>No applications yet</p>
)}

{apps.map((app:any)=>(
<div key={app.id}>

<p>User: {app.userId}</p>
<p>Status: {app.status}</p>

</div>
))}

</div>

)

}
