'use client'

import { useSearchParams } from 'next/navigation'

export default function Catalog() {
    const searchParams = useSearchParams()
    const search = searchParams.get('categories')

    return (
      <main>    
        <h1>Category: {search}</h1>
      </main>
  
    );
  }
  