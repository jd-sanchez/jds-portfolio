"use client";

import type { ContributionCalendar, ContributionLevel, ContributionWeek } from "@/types/github";

const SQUARE = 11;
const GAP = 3;
const STEP = SQUARE + GAP;

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-foreground/[0.06]",
  FIRST_QUARTILE: "bg-foreground/25",
  SECOND_QUARTILE: "bg-foreground/45",
  THIRD_QUARTILE: "bg-foreground/70",
  FOURTH_QUARTILE: "bg-foreground/95",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PLACEHOLDER_WEEKS: ContributionWeek[] = Array.from({ length: 53 }, () => ({
  contributionDays: Array.from({ length: 7 }, (_, weekday) => ({
    date: "",
    weekday,
    contributionCount: 0,
    contributionLevel: "NONE" as const,
  })),
}));

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function GithubHeatmap({ calendar }: { calendar: ContributionCalendar | null }) {
  const weeks = calendar?.weeks ?? PLACEHOLDER_WEEKS;

  const year = weeks
    .flatMap((week) => week.contributionDays)
    .find((day) => day.date)
    ?.date.slice(0, 4);

  const monthMarkers = weeks
    .map((week, index) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay?.date) return null;
      const prevFirstDay = weeks[index - 1]?.contributionDays[0]?.date;
      const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
      const prevMonth = prevFirstDay ? new Date(`${prevFirstDay}T00:00:00Z`).getUTCMonth() : null;
      if (month === prevMonth) return null;
      return { index, label: MONTHS[month] };
    })
    .filter((marker): marker is { index: number; label: string } => marker !== null);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-flex flex-col gap-2" style={{ minWidth: weeks.length * STEP }}>
        <div className="relative h-4 font-mono text-[10px] uppercase tracking-wider text-muted">
          {monthMarkers.map((marker) => (
            <span key={marker.index} className="absolute" style={{ left: marker.index * STEP }}>
              {marker.label}
            </span>
          ))}
        </div>

        <div className="flex" style={{ gap: GAP }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col" style={{ gap: GAP }}>
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={day.date || dayIndex}
                  title={day.date ? `${day.contributionCount} contributions on ${formatDate(day.date)}` : undefined}
                  className={`rounded-[2px] ${LEVEL_CLASS[day.contributionLevel]} ${
                    calendar ? "" : "animate-pulse"
                  }`}
                  style={{ width: SQUARE, height: SQUARE }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="pt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          {calendar ? `${calendar.totalContributions.toLocaleString()} contributions in ${year}` : "Loading activity…"}
        </div>
      </div>
    </div>
  );
}
