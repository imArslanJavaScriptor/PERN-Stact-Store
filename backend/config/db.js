import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// Creaes a SQL Connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
// This sql function we export is used as a tagged template literal, which allows us to write SQL queries safely

//  postgresql://neondb_owner:npg_7XeVIHU0iTql@ep-mute-meadow-a801uafz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
