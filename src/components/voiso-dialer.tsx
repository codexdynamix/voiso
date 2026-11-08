import React, { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Pause,
  Play,
  Share2,
  Grid,
  Users,
  UserPlus,
  Circle,
  Volume2,
  PhoneOff,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { playKeyTone, playRingbackTone } from "@/lib/dtmf";

export interface VoisoDarkDialerProps {
  contactName?: string;
  phoneNumber?: string;
  initialTime?: string;
  className?: string;
  isFloating?: boolean;
}

export function VoisoDarkDialer({
  contactName = "Sabrina Hawkins",
  phoneNumber = "+44 7874 484 817",
  _initialTime,
  className,
  isFloating = false,
}: VoisoDarkDialerProps & { _initialTime?: string }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [showKeypad, setShowKeypad] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [seconds, setSeconds] = useState(252); // 4m 12s

  useEffect(() => {
    if (!callActive || isOnHold) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callActive, isOnHold]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleKeypadPress = (digit: string) => {
    playKeyTone(digit);
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-[#1A2634] text-white shadow-2xl border border-white/10 select-none overflow-hidden",
        isFloating ? "w-72 sm:w-80" : "w-full max-w-sm",
        className,
      )}
    >
      {/* Top Bar with VOISO branding */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-[#141F2B]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">VELA · VOISO</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <span className="cursor-pointer hover:text-white">_</span>
          <span className="cursor-pointer hover:text-white">✕</span>
        </div>
      </div>

      {/* Caller Header */}
      <div className="px-5 py-4 text-center">
        <p className="text-base font-bold text-white tracking-tight">{contactName}</p>
        <p className="text-xs font-mono text-slate-400 mt-0.5">{phoneNumber}</p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10 text-xs font-mono text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span>{callActive ? (isOnHold ? "On Hold" : formatTimer(seconds)) : "Call Ended"}</span>
        </div>
      </div>

      {/* Dial Keypad Modal View when Toggled */}
      {showKeypad ? (
        <div className="p-4 bg-[#141F2B]/90 border-t border-white/10">
          <div className="grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleKeypadPress(d)}
                className="h-10 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold active:scale-95 transition-all text-white cursor-pointer"
              >
                {d}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowKeypad(false)}
            className="mt-3 w-full py-1 text-xs text-center text-slate-400 hover:text-white cursor-pointer"
          >
            Close Keypad
          </button>
        </div>
      ) : (
        /* Action Buttons Grid matching Screenshot 043536 */
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-center text-[10px] text-slate-300">
            {/* Hold */}
            <button
              type="button"
              onClick={() => setIsOnHold(!isOnHold)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center transition-colors",
                  isOnHold ? "bg-amber-500 text-white" : "bg-white/10 text-white group-hover:bg-white/20",
                )}
              >
                {isOnHold ? <Play className="size-4" /> : <Pause className="size-4" />}
              </div>
              <span className="group-hover:text-white">{isOnHold ? "Resume" : "Hold"}</span>
            </button>

            {/* Blind Transfer */}
            <button
              type="button"
              onClick={() => alert("Simulating Blind Transfer to queue...")}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Share2 className="size-4" />
              </div>
              <span className="group-hover:text-white">Blind transfer</span>
            </button>

            {/* Keypad */}
            <button
              type="button"
              onClick={() => setShowKeypad(true)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Grid className="size-4" />
              </div>
              <span className="group-hover:text-white">Keypad</span>
            </button>

            {/* Mute */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center transition-colors",
                  isMuted ? "bg-rose-500 text-white" : "bg-white/10 text-white group-hover:bg-white/20",
                )}
              >
                {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </div>
              <span className="group-hover:text-white">{isMuted ? "Unmute" : "Mute"}</span>
            </button>

            {/* Consultation */}
            <button
              type="button"
              onClick={() => alert("Initiating warm consultation with Tier-2 Supervisor...")}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Users className="size-4" />
              </div>
              <span className="group-hover:text-white">Consultation</span>
            </button>

            {/* Rec */}
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center transition-colors",
                  isRecording ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-white/10 text-white",
                )}
              >
                <Circle className={cn("size-3.5 fill-current", isRecording && "animate-pulse")} />
              </div>
              <span className="group-hover:text-white">Rec</span>
            </button>
          </div>

          {/* Conference Action Row */}
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => alert("Adding caller to 3-way conference...")}
              className="flex flex-col items-center gap-1 group cursor-pointer text-[10px] text-slate-300"
            >
              <div className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <UserPlus className="size-4" />
              </div>
              <span className="group-hover:text-white">Conference</span>
            </button>
          </div>
        </div>
      )}

      {/* Red Pill Hangup Button */}
      <div className="px-5 py-3 flex justify-center bg-[#141F2B]">
        <button
          type="button"
          onClick={() => {
            if (callActive) {
              setCallActive(false);
            } else {
              setCallActive(true);
              setSeconds(0);
              const stop = playRingbackTone();
              setTimeout(stop, 2000);
            }
          }}
          className={cn(
            "w-36 h-10 rounded-full flex items-center justify-center gap-2 font-bold text-xs text-white transition-all transform active:scale-95 cursor-pointer shadow-lg",
            callActive
              ? "bg-[#EA3943] hover:bg-[#D92A34] shadow-rose-900/40"
              : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40",
          )}
        >
          <PhoneOff className="size-4" />
          <span>{callActive ? "End Call" : "Reconnect"}</span>
        </button>
      </div>

      {/* Bottom Caller ID / Audio Device Bar */}
      <div className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-2 bg-[#0F1722] text-[10px] text-slate-400">
        <Volume2 className="size-3 text-slate-400" />
        <span className="font-mono">+44 20 3742 8876 — my CID</span>
      </div>
    </div>
  );
}
