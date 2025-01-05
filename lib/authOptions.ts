import { AuthOptions, DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT, TokenContents } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user?: TokenContents;
	}

	interface User extends DefaultUser {
		token?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends Record<string, unknown>, DefaultJWT {
		contents?: TokenContents;
	}

	interface TokenContents {
		id: number;
		email: string;
		fullName: string;
		firstName: string;
		lastName: string;
		organizations: any[];
	}
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const res = await fetch('http://localhost:3000/v1/auth/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' },
				});
				const token = await res.json();

				// If no error and we have user data, return it
				if (res.ok && token) {
					return token;
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			const tokenContents = user?.token
				? JSON.parse(
						Buffer.from(
							user.token.split('.')[1],
							'base64'
						).toString()
				  )
				: undefined;

			if (tokenContents) token.contents = tokenContents;

			return token;
		},
		session: async ({ session, token }) => {
			if (token.contents) {
				console.log({ user: token.contents });
				session.user = token.contents;
				session.user.fullName =
					`${token.contents.firstName} ${token.contents.lastName}`.trim();
			}

			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};
