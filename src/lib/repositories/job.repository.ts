import { and, ilike, gte, lte, eq } from "drizzle-orm"
import { jobs } from "@/lib/db/schema/jobs"
import { db } from "@/lib/db/db"

export const jobRepository = {

  async create(data: any) {
    const result = await db
      .insert(jobs)
      .values(data)
      .returning()

    return result[0]
  },

  async findAll(limit = 20, offset = 0) {
    return db
      .select()
      .from(jobs)
      .limit(limit)
      .offset(offset)
  },

  async findByEmployer(userId:number){

return db
.select()
.from(jobs)
.where(eq(jobs.createdBy,userId))

},


  async findById(id: number) {

    const result = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id))

    return result[0]
  },

  async delete(id: number) {

    const result = await db
      .delete(jobs)
      .where(eq(jobs.id, id))
      .returning()

    return result[0]
  },

  async search(filters: any, limit = 20, offset = 0) {

    const conditions = []

    if (filters.search) {
      conditions.push(
        ilike(jobs.title, `%${filters.search}%`)
      )
    }

    if (filters.location) {
      conditions.push(
        ilike(jobs.location, `%${filters.location}%`)
      )
    }

    if (filters.salaryMin) {
      conditions.push(
        gte(jobs.salary, filters.salaryMin)
      )
    }

    if (filters.salaryMax) {
      conditions.push(
        lte(jobs.salary, filters.salaryMax)
      )
    }

    const query = db
      .select()
      .from(jobs)
      .limit(limit)
      .offset(offset)

    if (conditions.length > 0) {
      query.where(and(...conditions))
    }

    return query
  }

}
