import { applicationRepository } from "@/lib/repositories/application.repository"

export const applicationService = {

async applyToJob(userId:number, jobId:number, data:any){

const existing =
await applicationRepository.findExisting(jobId,userId)

if(existing.length > 0){
throw new Error("Already applied")
}

return applicationRepository.create({
jobId,
userId,
...data
})

},

async getUserApplications(userId:number){
return applicationRepository.findByUser(userId)
},

async getJobApplications(jobId:number){
return applicationRepository.findByJob(jobId)
},

async updateStatus(id:number,data:{status:string}){

return applicationRepository.updateStatus(id,data.status)

},

async deleteApplication(id:number){

return applicationRepository.delete(id)

}

}
