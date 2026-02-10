// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'

import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
 
providers: [
    CredentialProvider({
        name: 'Credentials',
      type: 'credentials',

     
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password', placeholder: 'adminpassword' }
      },
      async authorize(credentials) {
       
        const { username, password } = credentials as { username: string; password: string }

        try {
         const admin  = {
            email: 'admin@example.com',
            username: 'admin',
            password: 'adminpassword'
         }

          if (username === admin.username && password === admin.password) {
           
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            return admin as any
          }

          return null
        } catch (e) {
          throw new Error((e as Error).message)
        }
      }
    }),
  ],

  session: {
   
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  pages: {
    signIn: '/login'
  },

  callbacks: {
  
    async jwt({ token, user }) {
      if (user) {
      
        token.name = user.name
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
      }

      return session
    }
  }
}
