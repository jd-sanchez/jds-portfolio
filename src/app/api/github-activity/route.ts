import { NextResponse } from "next/server";
import { contact } from "@/data/content";

export const revalidate = 3600;

const GITHUB_USERNAME = contact.github.split("/").filter(Boolean).pop() ?? "";

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured" }, { status: 500 });
  }

  const year = new Date().getUTCFullYear();
  const from = new Date(Date.UTC(year, 0, 1));
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59));

  const githubRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: 3600 },
  });

  if (!githubRes.ok) {
    return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 502 });
  }

  const json = await githubRes.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ error: "Unexpected GitHub API response" }, { status: 502 });
  }

  return NextResponse.json(calendar);
}
