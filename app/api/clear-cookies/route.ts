import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  
  const response = NextResponse.json({ cleared: allCookies.length })
  
  // Clear ALL cookies to reset the state
  allCookies.forEach(cookie => {
    response.cookies.delete(cookie.name)
  })
  
  return response
}