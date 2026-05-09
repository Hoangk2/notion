import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    auth.protect();
    const { sessionClaims } = await auth();
    if (!sessionClaims?.email) {
      return NextResponse.json(
        { message: "No valid session found" },
        { status: 401 },
      );
    }

    const { room } = await req.json();

    if (!room) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 },
      );
    }

    const session = liveblocks.prepareSession(sessionClaims?.email!, {
      userInfo: {
        name: sessionClaims?.fullName!,
        email: sessionClaims?.email!,
        avatar: sessionClaims?.image!,
      },
    });

    const usersInRoom = await adminDb
      .collectionGroup("rooms")
      .where("userId", "==", sessionClaims?.email!)
      .where("roomId", "==", room)
      .get();

    const userInRoom = usersInRoom.docs[0];

    if (userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();
      return new Response(body, { status });
    } else {
      return NextResponse.json(
        { message: "You are not allowed to join this room" },
        { status: 403 },
      );
    }
  } catch (error) {
    console.error("Auth endpoint error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
