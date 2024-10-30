'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Header from "@/components/header"

export default function SearchSection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get('type') || 'movie'
  const title = searchParams.get('title') || 'movie'

  const updateSearchParams = (newType: string, newTitle: string) => {
    const params = new URLSearchParams()
    if (newType) params.set('type', newType)
    if (newTitle) params.set('title', newTitle)
    router.push(`/?${params.toString()}`)
  }

  return (
    <Header
      onUpdateSearchParams={updateSearchParams}
      type={type}
      title={title}
    />
  )
}