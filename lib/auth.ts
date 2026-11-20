import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const mongoUri = process.env.MONGODB_URI as string

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient
}

const client = globalForMongo.mongoClient ?? new MongoClient(mongoUri)

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client
}

const db = client.db("EquipVault")

const trustedOrigins = [
  "http://localhost:3000",
  process.env.BETTER_AUTH_URL || "",
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "",
].filter(Boolean)

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
    },
  },
})