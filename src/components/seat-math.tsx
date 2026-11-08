import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { velaForSeats } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function SeatMath() {
  const [seats, setSeats] = useState(12);
  const voisoCost = seats * 65; // Voiso average seat cost
  const quote = velaForSeats(seats);
  const savings = Math.max(0, voisoCost - quote.monthly);

  return (
    <div className="ios-glass rounded-3xl p-6 md:p-9 border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-volt">
            Cost & Capacity Calculator
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Stop paying per-seat taxes to legacy telecom
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            Slide to match your team size. See how Vela eliminates seat markups compared to Voiso.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-muted block font-medium">Active Agent Floor</span>
          <p className="text-4xl font-semibold tracking-tight text-white tabular-nums">
            {seats} <span className="text-base font-normal text-muted">agents</span>
          </p>
        </div>
      </div>

      {/* Apple-Style Smooth Slider */}
      <div className="mt-8">
        <Slider.Root
          className="relative flex h-12 w-full touch-none select-none items-center"
          min={1}
          max={50}
          step={1}
          value={[seats]}
          onValueChange={([value]) => setSeats(value ?? 1)}
          aria-label="Number of agent seats"
        >
          <Slider.Track className="relative h-2.5 grow rounded-full bg-white/10 overflow-hidden">
            <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-volt to-[#0071e3]" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-6 rounded-full bg-white shadow-lg shadow-black/50 ring-2 ring-volt focus-visible:outline-none active:scale-110 transition-transform cursor-grab active:cursor-grabbing"
            aria-label="Seats"
          />
        </Slider.Root>
        <div className="flex justify-between text-[11px] text-muted font-mono mt-1">
          <span>1 seat (Solo)</span>
          <span>12 seats (Core)</span>
          <span>25 seats (Scale)</span>
          <span>50+ seats (Enterprise)</span>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Figure
          label="Voiso / Zadarma Estimated"
          value={`$${voisoCost.toLocaleString()}`}
          sublabel="Billed per seat"
          hint="$65/agent/mo + PBX add-ons"
          _muted
        />
        <Figure
          label={`Vela ${quote.plan.name} Tier`}
          value={`$${quote.monthly.toLocaleString()}`}
          sublabel="Flat workspace fee"
          hint={
            quote.extra > 0
              ? `Includes 25 core seats + ${quote.extra} overflow @ 6 USDT`
              : `All ${seats} agent seats included in flat pool`
          }
          highlight
        />
        <Figure
          label="Estimated Monthly Retained"
          value={`$${savings.toLocaleString()}`}
          sublabel="Net capital saved"
          hint={`Save ~${Math.round((savings / voisoCost) * 100)}% every month with zero seat penalty`}
          accent
        />
      </div>

      <p className="mt-6 text-xs text-muted/70 leading-relaxed">
        Calculations in USDT (1:1 with USD). Minute overages past included pool billed at 0.012 USDT per minute. Inbound calls to all attached international DIDs are 100% free with zero per-minute fees.
      </p>
    </div>
  );
}

function Figure({
  label,
  value,
  sublabel,
  hint,
  _muted,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  sublabel: string;
  hint: string;
  _muted?: boolean;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 border transition-all",
        accent
          ? "bg-ios-green/[0.08] border-ios-green/30 text-white"
          : highlight
            ? "bg-volt/[0.08] border-volt/30 text-white"
            : "bg-white/[0.03] border-white/5 text-muted",
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider">{label}</span>
      </div>

      <p
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight tabular-nums",
          accent ? "text-ios-green" : highlight ? "text-volt" : "text-fg",
        )}
      >
        {value}
        <span className="text-xs font-normal text-muted ml-1.5">/ mo</span>
      </p>

      <p className="mt-1 text-xs font-medium text-white/90">{sublabel}</p>
      <p className="mt-2 text-xs text-muted leading-snug">{hint}</p>
    </div>
  );
}
