import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mic, MicOff, Pause, Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  effectivePlanId,
  LEADS,
  planAllows,
  planById,
  visibleDids,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import { useVela } from "@/lib/store";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"] as const;
const HEIGHTS = ["h-2", "h-5", "h-3", "h-6", "h-4", "h-7", "h-3", "h-5", "h-2", "h-6", "h-4", "h-7"];

export function VoicePanel() {
  const store = useVela();
  const plan = planById(effectivePlanId(store.planId, store.active));
  const numbers = visibleDids(store.ownedDids, plan.dids);
  const [digits, setDigits] = useState("");
  const [now, setNow] = useState(0);
  const [mode, setMode] = useState<"pad" | "dialer">("pad");
  const [smsTo, setSmsTo] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const dialerAllowed = planAllows(plan.id, "lattice");

  const numberKey = numbers.join("|");

  useEffect(() => {
    const list = numberKey.split("|");
    const current = useVela.getState().did;
    if (!list.includes(current) && list[0]) useVela.getState().setDid(list[0]);
  }, [numberKey]);

  useEffect(() => {
    if (store.callStatus !== "live") return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [store.callStatus]);

  const elapsed =
    store.callStarted && now ? Math.max(0, Math.floor((now - store.callStarted) / 1000)) : 0;
  const busy = store.callStatus !== "idle";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 rounded-lg border border-line bg-raised p-4 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-faint">Presenting</p>
            <label className="mt-2 block text-sm text-muted" htmlFor="did">
              Caller ID
            </label>
            <select
              id="did"
              value={numbers.includes(store.did) ? store.did : numbers[0]}
              onChange={(event) => store.setDid(event.target.value)}
              className="mt-1 h-11 w-full max-w-xs rounded-md border border-line bg-bg px-3 text-sm text-fg"
            >
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted">
            {plan.name} · {plan.minutes.toLocaleString()} min pool
          </p>
        </div>

        <div className="mt-6 rounded-md border border-line bg-bg p-4" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-widest text-faint">
              {store.callStatus === "idle"
                ? "Idle"
                : store.callStatus === "dialing"
                  ? store.callDirection === "in"
                    ? "Incoming"
                    : "Calling"
                  : store.held
                    ? "On hold"
                    : "Live"}
            </p>
            <p className="tabular-nums text-sm text-muted">{busy && store.callStatus === "live" ? formatDuration(elapsed) : "00:00"}</p>
          </div>
          <p className="mt-2 truncate font-display text-3xl text-fg">{busy ? store.callPeer : "No active call"}</p>
          {store.callStatus === "live" && !store.held ? (
            <div className="vela-wave mt-4 flex h-8 items-end gap-1" aria-hidden="true">
              {HEIGHTS.map((height, index) => (
                <span key={index} className={cn("w-1 rounded-full bg-volt", height)} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-faint">Audio stays in this browser. Nothing is recorded here.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="line" disabled={store.callStatus !== "live"} onClick={store.toggleMute} aria-pressed={store.muted}>
              {store.muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              {store.muted ? "Unmute" : "Mute"}
            </Button>
            <Button variant="line" disabled={store.callStatus !== "live"} onClick={store.toggleHold} aria-pressed={store.held}>
              <Pause className="size-4" />
              {store.held ? "Resume" : "Hold"}
            </Button>
            {store.callStatus === "dialing" && store.callDirection === "in" ? (
              <Button onClick={store.answer}>
                <Phone className="size-4" />
                Answer
              </Button>
            ) : null}
            <Button variant={busy ? "primary" : "line"} disabled={!busy} onClick={store.hangup}>
              <PhoneOff className="size-4" />
              End
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-faint">Recent</p>
            {store.recents.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No calls yet. Dial a test number, or ring this line.</p>
            ) : (
              <ul className="mt-2 divide-y divide-line">
                {store.recents.map((call) => (
                  <li key={call.id} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0">
                      <span className="block truncate text-sm">{call.peer}</span>
                      <span className="text-xs text-faint">{call.direction === "out" ? "Outbound" : "Inbound"}</span>
                    </span>
                    <span className="tabular-nums text-sm text-muted">{formatDuration(call.seconds)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form
            className="min-w-0"
            onSubmit={(event) => {
              event.preventDefault();
              store.sendSms(smsTo, smsBody);
              setSmsBody("");
            }}
          >
            <p className="text-xs uppercase tracking-widest text-faint">SMS</p>
            <input
              value={smsTo}
              onChange={(event) => setSmsTo(event.target.value)}
              placeholder="To"
              aria-label="SMS recipient"
              className="mt-3 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
            />
            <input
              value={smsBody}
              onChange={(event) => setSmsBody(event.target.value.slice(0, 160))}
              placeholder="Message"
              aria-label="SMS body"
              className="mt-2 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="tabular-nums text-xs text-faint">{smsBody.length}/160</span>
              <Button type="submit" variant="line" disabled={!smsTo.trim() || !smsBody.trim()}>
                Send
              </Button>
            </div>
            {store.messages.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {store.messages.slice(0, 3).map((message) => (
                  <li key={message.id} className="text-sm text-muted">
                    <span className="text-fg">{message.to}</span> — {message.body}
                  </li>
                ))}
              </ul>
            ) : null}
          </form>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-bg p-4">
        <div className="grid grid-cols-2 gap-1 rounded-md bg-surface p-1">
          <button
            type="button"
            className={cn("min-h-11 rounded-md text-sm", mode === "pad" ? "bg-bg text-fg" : "text-muted")}
            onClick={() => setMode("pad")}
          >
            Keypad
          </button>
          <button
            type="button"
            className={cn("min-h-11 rounded-md text-sm", mode === "dialer" ? "bg-bg text-fg" : "text-muted")}
            onClick={() => setMode("dialer")}
          >
            Dialer
          </button>
        </div>

        {mode === "pad" ? (
          <div className="mt-4">
            <input
              inputMode="tel"
              aria-label="Number to call"
              value={digits}
              placeholder="Number"
              onChange={(event) => setDigits(event.target.value.replace(/[^\d+*#\s]/g, "").slice(0, 18))}
              className="h-14 w-full bg-transparent text-center font-display text-3xl tabular-nums text-fg outline-none placeholder:text-faint"
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="min-h-12 rounded-md border border-line bg-raised text-lg text-fg hover:border-muted"
                  onClick={() => setDigits((value) => (value + key).slice(0, 18))}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="line" onClick={() => setDigits((value) => value.slice(0, -1))} disabled={!digits}>
                Delete
              </Button>
              <Button onClick={() => store.startCall(digits)} disabled={!digits.trim() || busy}>
                <Phone className="size-4" />
                Call
              </Button>
            </div>
            <Button variant="ghost" className="mt-2 w-full" onClick={store.ring} disabled={busy}>
              Simulate an inbound ring
            </Button>
          </div>
        ) : (
          <Dialer allowed={dialerAllowed} />
        )}
      </div>
    </div>
  );
}

function Dialer({ allowed }: { allowed: boolean }) {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState("Ready");
  const lead = LEADS[index] ?? LEADS[0];

  useEffect(() => {
    if (!running) return;
    setResult("Ringing");
    const ring = window.setTimeout(() => {
      const outcomes = ["Human · 18s", "Machine · skipped", "No answer"];
      setResult(outcomes[index % outcomes.length] ?? "No answer");
    }, 700);
    const next = window.setTimeout(() => {
      setIndex((value) => (value + 1) % LEADS.length);
    }, 1700);
    return () => {
      window.clearTimeout(ring);
      window.clearTimeout(next);
    };
  }, [running, index]);

  if (!allowed) {
    return (
      <div className="mt-6">
        <p className="text-sm text-muted">Predictive dialer starts on Lattice. Relay stays on the keypad.</p>
        <Link to="/pricing" className="mt-4 inline-flex min-h-11 items-center text-sm text-volt">
          See Lattice
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-xs uppercase tracking-widest text-faint">Sample list · five fictional leads</p>
      <p className="mt-3 font-display text-2xl">{lead.name}</p>
      <p className="mt-1 tabular-nums text-sm text-muted">{lead.number}</p>
      <p className="mt-3 text-sm text-volt">{result}</p>
      <Button className="mt-4 w-full" variant={running ? "line" : "primary"} onClick={() => setRunning((value) => !value)}>
        {running ? "Stop list" : "Start list"}
      </Button>
    </div>
  );
}
