import { useState } from "react"

export function useJobForm(initialData: any = {}) {
  const [form, setForm] = useState<any>(initialData)

  function handleChange(e: any) {
    const { name, value } = e.target
    setForm((prev: any) => ({ ...prev, [name]: value }))
  }

  return {
    form,
    setForm,
    handleChange,
    loading: false,
    setLoading: (p0: boolean) => {},
  }
}
