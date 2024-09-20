import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === "user.created") {
    await clerkClient.users.updateUserMetadata(id!, {
      publicMetadata: {
        role: "user",
      },
    });
    await db.user.create({
      data: {
        id: id!,
        name: evt.data.first_name + " " + evt.data.last_name,
      },
    });
  }
  if (eventType === "user.updated") {
    await db.user.upsert({
      where: { id: id! },
      update: {
        name: evt.data.first_name + " " + evt.data.last_name,
      },
      create: {
        id: id!,
      },
    });
  }
  if (eventType === "user.deleted") {
    await db.user.delete({
      where: { id: id! },
    });
  }
  if (eventType === "session.created") {
    // Create a new session in your database
    if (!id) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }
    const users = await clerkClient.users.getUserList();
    users.data.forEach(async (user) => {
      await db.user.upsert({
        where: {
          id: user.id,
        },
        update: {
          name: user.firstName + " " + user.lastName,
        },
        create: {
          id: user.id,
          name: user.firstName + " " + user.lastName,
        },
      });
    });
  }

  return new Response("", { status: 200 });
}
