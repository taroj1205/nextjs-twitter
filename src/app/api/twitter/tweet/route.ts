import { userTweet } from "@/lib/twitter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get("id"));

  const data = await userTweet(id);

  return new Response(JSON.stringify(data));
}
