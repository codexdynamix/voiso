import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mic, MicOff, Pause, Phone, PhoneOff, Send, MessageSquare, Clock } from "lucide-react";
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
import { playKeyTone } from "@/lib/dtmf";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"] as const;
const KEY_SUBTEXT: Record<string, string> = {
  "1": "",
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
  "*": "",
  "0": "+",
  "#": "",
};
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

  const onKeyClick = (key: string) => {
    playKeyTone(key);
    setDigits((val) => (val + key).slice(0, 18));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Left Column: Live Call Stage & Messaging */}
      <div className="min-w-0 ios-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
        <div>
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted font-medium">Outbound Caller ID</p>
              <div className="mt-1.5 flex items-center gap-3">
                <select
                  id="did"
                  value={numbers.includes(store.did) ? store.did : numbers[0]}
                  onChange={(event) => store.setDid(event.target.value)}
                  className="h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-sm font-mono text-white focus:outline-none focus:ring-1 focus:ring-volt"
                >
                  {numbers.map((number) => (
                    <option key={number} value={number} className="bg-bg text-white">
                      {number}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-ios-green font-medium flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-ios-green" />
                  Direct SIP Line
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-muted block">{plan.name} Pool</span>
              <span className="text-sm font-semibold text-white tabular-nums">
                {plan.minutes.toLocaleString()} minutes remaining
              </span>
            </div>
          </div>

          {/* Active Call Canvas / Screen */}
          <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-5 md:p-6" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    store.callStatus === "live"
                      ? "bg-ios-green animate-pulse"
                      : store.callStatus === "dialing"
                        ? "bg-volt animate-ping"
                        : "bg-muted",
                  )}
                />
                <p className="text-xs uppercase tracking-wider font-semibold text-muted">
                  {store.callStatus === "idle"
                    ? "Standby"
                    : store.callStatus === "dialing"
                      ? store.callDirection === "in"
                        ? "Incoming WebRTC Ring"
                        : "Outbound Signaling"
                      : store.held
                        ? "Call On Hold"
                        : "Encrypted WebRTC Session"}
                </p>
              </div>

              <p className="tabular-nums font-mono text-sm font-medium text-white">
                {busy && store.callStatus === "live" ? formatDuration(elapsed) : "00:00"}
              </p>
            </div>

            <p className="mt-3 truncate font-display text-3xl font-semibold text-white">
              {busy ? store.callPeer : "No Active Call"}
            </p>

            {store.callStatus === "live" && !store.held ? (
              <div className="vela-wave mt-4 flex h-8 items-end gap-1.5 justify-center py-1" aria-hidden="true">
                {HEIGHTS.map((height, index) => (
                  <span key={index} className={cn("w-1.5 rounded-full bg-volt shadow-sm shadow-volt/50", height)} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-muted">
                Local WebRTC audio engine. Audio stream never recorded or stored on remote servers.
              </p>
            )}

            {/* In-Call Action Toolbar */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button
                variant="line"
                size="sm"
                disabled={store.callStatus !== "live"}
                onClick={store.toggleMute}
                aria-pressed={store.muted}
                className={cn(store.muted && "bg-volt/20 text-volt border-volt/40")}
              >
                {store.muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                {store.muted ? "Muted" : "Mute"}
              </Button>

              <Button
                variant="line"
                size="sm"
                disabled={store.callStatus !== "live"}
                onClick={store.toggleHold}
                aria-pressed={store.held}
                className={cn(store.held && "bg-white/20 text-white")}
              >
                <Pause className="size-4" />
                {store.held ? "Resume" : "Hold"}
              </Button>

              {store.callStatus === "dialing" && store.callDirection === "in" ? (
                <Button variant="call" size="sm" onClick={store.answer}>
                  <Phone className="size-4" />
                  Answer
                </Button>
              ) : null}

              <Button
                variant={busy ? "hangup" : "line"}
                size="sm"
                disabled={!busy}
                onClick={store.hangup}
              >
                <PhoneOff className="size-4" />
                End Call
              </Button>
            </div>
          </div>

          {/* Recents and SMS Bottom Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted font-semibold">
                <Clock className="size-3.5" />
                <span>Recent Calls</span>
              </div>

              {store.recents.length === 0 ? (
                <p className="mt-3 text-xs text-muted">No calls yet. Dial a number on the keypad to test.</p>
              ) : (
                <ul className="mt-3 divide-y divide-line">
                  {store.recents.slice(0, 4).map((call) => (
                    <li key={call.id} className="flex items-center justify-between gap-3 py-2.5 text-xs">
                      <span className="min-w-0">
                        <span className="block truncate font-mono font-medium text-white">{call.peer}</span>
                        <span className="text-[11px] text-muted">
                          {call.direction === "out" ? "Outbound" : "Inbound"}
                        </span>
                      </span>
                      <span className="tabular-nums font-mono text-muted">{formatDuration(call.seconds)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* SMS Form */}
            <form
              className="min-w-0 flex flex-col justify-between"
              onSubmit={(event) => {
                event.preventDefault();
                store.sendSms(smsTo, smsBody);
                setSmsBody("");
              }}
            >
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted font-semibold">
                  <MessageSquare className="size-3.5" />
                  <span>Instant SMS</span>
                </div>

                <input
                  value={smsTo}
                  onChange={(event) => setSmsTo(event.target.value)}
                  placeholder="Recipient (+1...)"
                  aria-label="SMS recipient"
                  className="mt-3 h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-xs font-mono text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-volt"
                />

                <input
                  value={smsBody}
                  onChange={(event) => setSmsBody(event.target.value.slice(0, 160))}
                  placeholder="Type message..."
                  aria-label="SMS body"
                  className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-xs text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-volt"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="tabular-nums text-[11px] text-muted font-mono">{smsBody.length}/160</span>
                <Button type="submit" variant="line" size="sm" disabled={!smsTo.trim() || !smsBody.trim()}>
                  <Send className="size-3" />
                  <span>Send SMS</span>
                </Button>
              </div>

              {store.messages.length > 0 && (
                <div className="mt-3 rounded-xl bg-white/[0.02] p-2 text-xs text-muted">
                  <span className="font-semibold text-white">Latest to {store.messages[0].to}: </span>
                  {store.messages[0].body}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Right Column: Tactile Apple-Style Keypad / Predictive Dialer */}
      <div className="ios-glass rounded-3xl p-6 border border-white/10 flex flex-col">
        {/* iOS-Style Mode Pill Switcher */}
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white/[0.05] p-1 border border-white/5">
          <button
            type="button"
            className={cn(
              "h-9 rounded-xl text-xs font-semibold transition-all",
              mode === "pad" ? "bg-white text-black shadow-md" : "text-muted hover:text-white",
            )}
            onClick={() => setMode("pad")}
          >
            Keypad
          </button>
          <button
            type="button"
            className={cn(
              "h-9 rounded-xl text-xs font-semibold transition-all",
              mode === "dialer" ? "bg-white text-black shadow-md" : "text-muted hover:text-white",
            )}
            onClick={() => setMode("dialer")}
          >
            Predictive Dialer
          </button>
        </div>

        {mode === "pad" ? (
          <div className="mt-5 flex flex-col justify-between flex-1">
            {/* Number Readout */}
            <input
              inputMode="tel"
              aria-label="Number to call"
              value={digits}
              placeholder="Enter number"
              onChange={(event) =>
                setDigits(event.target.value.replace(/[^\d+*#\s]/g, "").slice(0, 18))
              }
              className="h-12 w-full bg-transparent text-center font-mono text-2xl font-semibold tracking-wider text-white outline-none placeholder:text-muted/40"
            />

            {/* 12-Key DTMF Pad */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="h-14 rounded-2xl bg-white/[0.04] border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.1] active:scale-95 transition-all text-white"
                  onClick={() => onKeyClick(key)}
                >
                  <span className="text-xl font-semibold leading-none">{key}</span>
                  {KEY_SUBTEXT[key] && (
                    <span className="text-[9px] font-medium tracking-widest text-muted mt-0.5 leading-none">
                      {KEY_SUBTEXT[key]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Call / Clear Action Bar */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Button
                variant="line"
                size="md"
                onClick={() => setDigits((value) => value.slice(0, -1))}
                disabled={!digits}
              >
                Delete
              </Button>
              <Button
                variant="call"
                size="md"
                onClick={() => store.startCall(digits)}
                disabled={!digits.trim() || busy}
              >
                <Phone className="size-4" />
                Call
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full text-xs text-muted hover:text-white"
              onClick={store.ring}
              disabled={busy}
            >
              Simulate Inbound Ring
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
      const outcomes = ["Human Connected · 18s", "Machine Detected · Skipped", "No Answer · Logged"];
      setResult(outcomes[index % outcomes.length] ?? "No answer");
    }, 700);
    const next = window.setTimeout(() => {
      setIndex((value) => (value + 1) % LEADS.length);
    }, 1800);
    return () => {
      window.clearTimeout(ring);
      window.clearTimeout(next);
    };
  }, [running, index]);

  if (!allowed) {
    return (
      <div className="mt-8 text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <p className="text-sm font-medium text-white">Predictive dialer starts on Lattice</p>
        <p className="mt-1 text-xs text-muted">Relay tier is limited to manual keypad dialing.</p>
        <Link to="/pricing" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-volt hover:underline">
          Upgrade to Lattice
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col justify-between flex-1">
      <div className="rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-muted font-medium">Predictive Queue</p>
        <p className="mt-2 text-xl font-semibold text-white">{lead.name}</p>
        <p className="mt-1 font-mono text-sm text-volt">{lead.number}</p>
        <div className="mt-3 inline-block rounded-full bg-white/[0.08] px-3 py-1 text-xs text-fg">
          Status: <span className="font-semibold text-white">{result}</span>
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        variant={running ? "line" : "primary"}
        onClick={() => setRunning((value) => !value)}
      >
        {running ? "Pause Dialing Queue" : "Start Automated Campaign"}
      </Button>
    </div>
  );
}
