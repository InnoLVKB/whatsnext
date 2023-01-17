//all dynamic routes for NextAuth
//contains all gloabal NextAuth configs

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '../../../lib/db'
import PostgresAdapter from '../../../lib/adapter'


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      CredentialsProvider({
        name: 'Username',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "otis" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          })
          const user = await res.json()
          if (user) {
            console.log(user);
            return user
          } else {
            return null
          }
        }
      })
    ],
    // adapter: PostgresAdapter(db),
    // pages: {
    //   signIn: 'http://localhost:3000/login',
    //   newUser: 'http://localhost:3000/signup'
    // }
  }

  
  export default NextAuth(authOptions)