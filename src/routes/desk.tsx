import { createFileRoute } from "@tanstack/react-router";
import { DeskPanel } from "@/components/desk-panel";
import { Wrap } from "@/components/shell";

export const Route = createFileRoute("/desk")({
  head: () => ({
    meta: [
      { title: "Desk — Vela" },
      {
        name: "description",
        content: "Windows workstations on a locked gateway. Wiped when the term ends. No KYC.",
      },
    ],
  }),
  component: DeskPage,
});

function DeskPage() {
  return (
    <>
      <header className="border-b border-line">
        <Wrap className="py-14 md:py-20">
          <p className="text-xs uppercase tracking-widest text-volt">Desk</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
            A Windows machine with no account manager attached.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Connect to a desk sized for the plan. The session in this preview is local — notes and the terminal
            never leave the browser. On cancel, a real volume would be wiped.
          </p>
        </Wrap>
      </header>
      <Wrap className="py-10 md:py-14">
        <DeskPanel />
      </Wrap>
    </>
  );
}
