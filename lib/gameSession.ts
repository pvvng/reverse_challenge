import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserData } from "./types";

interface SessionContent {
  id?: string;
  users?: UserData[];
  startAt?: Date;
  endAt?: Date;
  curTurn?: number;
}

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
  path: "/",
};

export async function getGameSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "RVS_CLGE",
    password: process.env.COOKIE_PASSWORD!,
    ttl: 1000 * 60 * 60 * 3, // 3시간
    cookieOptions,
  });
}
