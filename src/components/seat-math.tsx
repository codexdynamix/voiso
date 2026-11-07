import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { legacyMonthly, velaForSeats } from "@/lib/catalog";

export function SeatMath() {
  const [seats, setSeats] = useState(8);
  const legacy = legacyMonthly(seats);
  const quote = velaForSeats(seats);
  const keep = Math.max(0, legacy - quote.monthly);

  return (
    <div className="rounded-lg border border-line bg-raised p-5 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-volt">Seat math</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-fg md:text-4xl">
            Stop renting agents one at a time.
          </h2>
        </div>
        <p className="font-display text-4xl tabular-nums text-fg">
          {seats}
          <span className="ml-2 font-sans text-sm text-muted">seats</span>
        </p>
      </div>
      <Slider.Root
        className="relative mt-8 flex h-11 w-full touch-none items-center"
        min={1}
        max={40}
        step={1}
        value={[seats]}
        onValueChange={([value]) => setSeats(value ?? 1)}
        aria-label="Team size"
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-line">
          <Slider.Range className="absolute h-full rounded-full bg-volt" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-5 rounded-full border-2 border-ink bg-volt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          aria-label="Seats"
        />
      </Slider.Root>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Figure label="Typical per-agent suite" value={legacy} hint="About $52 per agent, before usage" muted />
        <Figure
          label={`Vela ${quote.plan.name}`}
          value={quote.monthly}
          hint={quote.extra > 0 ? `${quote.extra} seats above Foundry at 6 USDT` : quote.plan.blurb}
        />
        <Figure label="You keep" value={keep} hint="Every month, before minute overage" accent />
      </div>
      <p className="mt-6 text-sm text-faint">
        Illustrative monthly totals in USDT. Overage after the included pool is 0.012 USDT a minute. Inbound to
        your DIDs stays included.
      </p>
    </div>
  );
}

function Figure({
  label,
  value,
  hint,
  muted,
  accent,
}: {
  label: string;
  value: number;
  hint: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-bg p-4">
      <p className="text-xs uppercase tracking-widest text-faint">{label}</p>
      <p
        className={
          accent
            ? "mt-2 font-display text-4xl tabular-nums text-volt"
            : muted
              ? "mt-2 font-display text-4xl tabular-nums text-muted"
              : "mt-2 font-display text-4xl tabular-nums text-fg"
        }
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-muted">{hint}</p>
    </div>
  );
}
