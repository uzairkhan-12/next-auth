import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';
import NextAuth from "next-auth/next";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email:{label:"email", type:"email",placeholder:"jsmit@gmail.com"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                        if(!credentials.email || !credentials.password) {
                            return
                        }
                        try {
                            const client = await MongoClient.connect(process.env.MONGO_URI);
                            const db = client.db('mydb');

                            const result = await db.collection('users').findOne({
                                email: credentials.email,
                            });
                            if (!result) {
                                client.close();
                                throw new Error('No user found with the email');
                            }
                            const checkPassword = await compare(credentials.password, result.password);
                            if (!checkPassword) {
                                client.close();
                                throw new Error('Password doesnt match');
                            }
                            client.close();
                            return { email: result.email,name:result.name,user:result };
                        } catch (err) {
                            return null;
                        }
                       
                    },
        })
    ],
}

export default NextAuth(authOptions)