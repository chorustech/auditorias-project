import "dotenv/config";

export default {
  out: "./drizzle",
  schema: "./db/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
