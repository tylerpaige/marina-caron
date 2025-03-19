// pages/api/trigger-deploy.js

import { NextResponse } from "next/server";

export async function POST(req) {
  // Verify the webhook secret header (set this in your Sanity webhook settings)
  const webhookSecret = req.headers.get("x-sanity-webhook-secret");
  if (webhookSecret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.error("Invalid secret", { status: 401 });
  }

  // Parse the payload from Sanity
  const body = await req.json()
  const { isPrivate, username, password } = body;

  // Build a JSON string of the privacy configuration
  const privacyConfig = JSON.stringify({ isPrivate, username, password });

  // Update the Vercel Environment Variable
  const updateEnvUrl = `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/env/${process.env.VERCEL_ENV_VAR_ID}`;
  const updateResponse = await fetch(updateEnvUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    body: JSON.stringify({
      value: privacyConfig,
    }),
  });

  if (!updateResponse.ok) {
    const errMsg = await updateResponse.text();
    console.error("Failed to update environment variable:", errMsg);
    return NextResponse.error("Failed to update env variable", { status: 500 });
  }

  // Trigger a Redeployment via a Deploy Hook
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  const deployResponse = await fetch(deployHookUrl, {
    method: "POST",
  });

  if (!deployResponse.ok) {
    const errMsg = await deployResponse.text();
    console.error("Failed to trigger deployment:", errMsg);
    return NextResponse.error("Failed to trigger deployment", { status: 500 });
  }

  return NextResponse.json({ success: true });
}
