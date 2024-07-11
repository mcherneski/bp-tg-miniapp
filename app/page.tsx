'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <p>Counter: {count}</p>
      <Button variant='default' size='lg' onClick={() => setCount(count + 1)}>Increase Counter</Button>

    </main>
  );
}
