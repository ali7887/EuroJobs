"use client"

import { useState } from "react"

export default function ApplyButton({ jobId }: { jobId: number }) {

const [loading,setLoading] = useState(false)

async function apply(){

setLoading(true)

await fetch(`/api/jobs/${jobId}/apply`,{
method:"POST",
headers:{ "Content-Type":"application/json" },

body: JSON.stringify({
userId:1,
resumeUrl:"resume.pdf",
coverLetter:"I am interested in this role"
})
})

setLoading(false)

alert("Applied successfully")

}

return (

<button onClick={apply} disabled={loading}>
{loading ? "Applying..." : "Apply"}
</button>

)

}
