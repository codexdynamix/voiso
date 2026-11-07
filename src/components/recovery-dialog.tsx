import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { KeyRound, Copy, Check, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVela } from "@/lib/store";

export function RecoveryDialog() {
  const recovery = useVela((state) => state.recovery);
  const seen = useVela((state) => state.recoverySeen);
  const active = useVela((state) => state.active);
  const ack = useVela((state) => state.ackRecovery);
  const [copied, setCopied] = useState(false);
  const open = Boolean(active && recovery && !seen);

  async function copy() {
    if (!recovery) return;
    try {
      await navigator.clipboard.writeText(recovery.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/15 bg-[#0e1118]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-volt/15 border border-volt/30 flex items-center justify-center text-volt">
              <KeyRound className="size-5" />
            </div>
            <div>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Store Your Workspace Phrase
              </Dialog.Title>
              <span className="text-xs text-ios-green font-medium">Cryptographic Seed Key</span>
            </div>
          </div>

          <Dialog.Description className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            These twelve words restore access to your private phone lines, WireGuard tunnels, and virtual desktops. We do not store this key and cannot recover it if lost.
          </Dialog.Description>

          <ol className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(recovery ?? []).map((word, index) => (
              <li
                key={word}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-mono"
              >
                <span className="tabular-nums text-muted/60 text-[10px] w-4">{index + 1}.</span>
                <span className="text-white font-medium">{word}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-muted">
            <ShieldAlert className="size-3.5 text-volt shrink-0" />
            <span>Never share this seed phrase with anyone.</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <Button size="sm" onClick={() => void copy()}>
              {copied ? <Check className="size-3.5 text-ios-green" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copied" : "Copy Seed Phrase"}</span>
            </Button>
            <Button variant="line" size="sm" onClick={ack}>
              I have safely backed it up
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
