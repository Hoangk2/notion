"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const creatNewDocument = async () => {
  const { sessionClaims } = await auth();
  const docRef = await adminDb.collection("documents").add({
    title: "Untitled",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
};

export async function deleteDocument(roomId: string) {
  auth.protect();

  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  const { sessionClaims } = await auth();
  auth.protect();

  try {
    // Lưu user vào Firestore
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    // Lấy tiêu đề document
    const docSnapshot = await adminDb.collection("documents").doc(roomId).get();
    const docTitle = docSnapshot.data()?.title || "Untitled";

    // Gửi email thông báo
    await resend.emails.send({
      from: "NotionX <onboarding@resend.dev>",
      to: email,
      subject: `${sessionClaims?.fullName ?? "Ai đó"} đã mời bạn cộng tác trên "${docTitle}"`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="margin-top:0;">Bạn được mời cộng tác! 🎉</h2>
          <p>
            <strong>${sessionClaims?.fullName ?? sessionClaims?.email}</strong>
            đã mời bạn chỉnh sửa tài liệu
            <strong>"${docTitle}"</strong>.
          </p>
          <a
            href="${process.env.NEXT_PUBLIC_APP_URL}/doc/${roomId}"
            style="display:inline-block;margin-top:16px;background:#000;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;"
          >
            Mở tài liệu →
          </a>
          <p style="margin-top:24px;font-size:12px;color:#6b7280;">
            Nếu bạn không muốn nhận email này, hãy liên hệ người gửi.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}