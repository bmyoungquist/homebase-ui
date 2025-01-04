'use client'

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CheckAuth({ children }: { children: React.ReactNode }) {
	const path = usePathname()
	const router = useRouter()
	const { data: session } = useSession()

	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		if (session?.user && ['/login', '/register'].includes(path)) return router.push('/')
		if (!session?.user && !['/login', '/register'].includes(path)) return router.push('/login')

		setShow(true)
	}, [path, session, router])

	return <div className={show ? 'visible' : 'hidden'}>{children}</div>
}