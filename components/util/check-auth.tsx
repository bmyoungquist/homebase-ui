'use client'

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CheckAuth() {
	const path = usePathname()
	const router = useRouter()
	const { data: session } = useSession()

	useEffect(() => {
		if (session?.user && ['/login', '/register'].includes(path)) router.push('/')
		if (!session?.user && !['/login', '/register'].includes(path)) router.push('/login')
	}, [path, session, router])

	return <></>
}