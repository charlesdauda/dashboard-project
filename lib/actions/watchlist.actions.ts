"use server";

import { connectToDatabase } from "@/database/mongoose";
import { auth, type AuthClient } from "@/lib/better-auth/auth";
import { Watchlist } from "@/database/models/watchlist.model";

export const getWatchlistSymbolsByEmail = async (
  email: string,
): Promise<string[]> => {
  try {
    await connectToDatabase();

    // Ensure the auth module is initialized (project pattern)
    const _authClient = (await auth) as AuthClient;
    void _authClient;

    const mongoose = await connectToDatabase();
    const rawDb = mongoose.connection.db;
    if (!rawDb) return [];

    const user = await rawDb.collection("user").findOne({ email });
    const userId =
      user?.id?.toString?.() ?? user?._id?.toString?.() ?? null;

    if (!userId) return [];

    const items = await Watchlist.find({ userId }).select("symbol").lean();
    return (items ?? [])
      .map((item: { symbol?: string }) => (item.symbol ?? "").toUpperCase())
      .filter(Boolean);
  } catch (e) {
    console.error("Error fetching watchlist symbols by email:", e);
    return [];
  }
};


