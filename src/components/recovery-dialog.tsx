import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/80" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-raised p-6">
          <Dialog.Title className="font-display text-3xl font-medium">Store this phrase</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted">
            Twelve words restore the workspace. This is not a wallet seed. It will not be shown again.
          </Dialog.Description>
          <ol className="mt-5 grid grid-cols-2 gap-2">
            {(recovery ?? []).map((word, index) => (
              <li key={word} className="flex min-h-11 items-center gap-2 rounded-md border border-line bg-bg px-3 text-sm">
                <span className="tabular-nums text-faint">{index + 1}</span>
                <span>{word}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={() => void copy()}>{copied ? "Copied" : "Copy phrase"}</Button>
            <Button variant="line" onClick={ack}>
              I've stored it
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
