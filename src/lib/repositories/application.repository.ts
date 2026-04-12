import { db } from "@/lib/db/db"
import { jobApplications } from "@/lib/db/schema/job_embeddings"
import { eq, and } from "drizzle-orm"

export const applicationRepository = {

async create(data:any){

return db
.insert(jobApplications)
.values(data)
.returning()

},

async findByUser(userId:number){

return db
.select()
.from(jobApplications)
.where(eq(jobApplications.userId,userId))

},

async findByJob(jobId:number){

return db
.select()
.from(jobApplications)
.where(eq(jobApplications.jobId,jobId))

},

async findExisting(jobId:number,userId:number){

return db
.select()
.from(jobApplications)
.where(
and(
eq(jobApplications.jobId,jobId),
eq(jobApplications.userId,userId)
)
)

},

async updateStatus(id:number,status:string){

return db
.update(jobApplications)
.set({ status })
.where(eq(jobApplications.id,id))
.returning()

},

async delete(id:number){

return db
.delete(jobApplications)
.where(eq(jobApplications.id,id))
.returning()

}

}
