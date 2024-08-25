/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-content-generator_owner:wLt5HgsoY3ib@ep-small-union-a5kalcxc.us-east-2.aws.neon.tech/ai-content-generator?sslmode=require',
    }
  };