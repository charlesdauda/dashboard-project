import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import mongoose from 'mongoose';

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), '.env.local'));

const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/stock-app';

async function main() {
  console.log(`Attempting to connect to MongoDB using: ${uri.replace(/:[^:@]+@/, ':***@')}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    const dbName = mongoose.connection.db?.databaseName ?? 'unknown';
    console.log(` Connected successfully to database: ${dbName}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed');
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
