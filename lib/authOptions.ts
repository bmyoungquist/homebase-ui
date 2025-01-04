import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				const res = await fetch('http://localhost:3000/v1/auth/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" }
				})
				const token = await res.json()

				// If no error and we have user data, return it
				if (res.ok && token) {
					return token
				}

				// Return null if user data could not be retrieved
				return null
			}
		})
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: async ({ token }) => {
			return token
		},
		session: async ({ session }) => {
			return session
		}
	},
	pages: {
		signIn: '/login'
	}
}
