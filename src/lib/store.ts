import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DIDS,
  type PlanId,
  type ProtocolId,
  type Term,
} from "@/lib/catalog";

export type CallStatus = "idle" | "dialing" | "live";

export type RecentCall = {
  id: string;
  peer: string;
  direction: "out" | "in";
  seconds: number;
  at: number;
};

export type Sms = {
  id: string;
  to: string;
  body: string;
  at: number;
};

type VelaState = {
  callsign: string;
  planId: PlanId | null;
  term: Term;
  recovery: string[] | null;
  recoverySeen: boolean;
  active: boolean;
  did: string;
  ownedDids: string[];
  includedDids: string[];
  callStatus: CallStatus;
  callPeer: string;
  callDirection: "out" | "in";
  callStarted: number | null;
  muted: boolean;
  held: boolean;
  recents: RecentCall[];
  messages: Sms[];
  regionId: string;
  protocol: ProtocolId;
  vpnOn: boolean;
  killSwitch: boolean;
  machineId: string;
  machineIds: string[];
  selectedVpsId: string | null;
  selectedDedicatedId: string | null;
  deskOpen: boolean;
  setDid: (id: string) => void;
  attachDid: (id: string) => void;
  setRegion: (id: string) => void;
  setProtocol: (id: ProtocolId) => void;
  setKillSwitch: (on: boolean) => void;
  setMachine: (id: string) => void;
  setDeskOpen: (open: boolean) => void;
  toggleMute: () => void;
  toggleHold: () => void;
  startCall: (peer: string) => void;
  ring: () => void;
  answer: () => void;
  hangup: () => void;
  sendSms: (to: string, body: string) => void;
  connectVpn: () => void;
  disconnectVpn: () => void;
  ackRecovery: () => void;
  resetWorkspace: () => void;
};

let dialTimer: ReturnType<typeof setTimeout> | null = null;

function rid() {
  return Math.random().toString(36).slice(2, 10);
}

function clearDial() {
  if (dialTimer) {
    clearTimeout(dialTimer);
    dialTimer = null;
  }
}

export const useVela = create<VelaState>()(
  persist(
    (set, get) => ({
      callsign: "",
      planId: null,
      term: "month",
      recovery: null,
      recoverySeen: false,
      active: false,
      did: DIDS[0].id,
      ownedDids: [],
      includedDids: [],
      callStatus: "idle",
      callPeer: "",
      callDirection: "out",
      callStarted: null,
      muted: false,
      held: false,
      recents: [],
      messages: [],
      regionId: "fra",
      protocol: "wg",
      vpnOn: false,
      killSwitch: true,
      machineId: "dx-04",
      machineIds: [],
      selectedVpsId: null,
      selectedDedicatedId: null,
      deskOpen: false,
      setDid: (id) => set({ did: id }),
      attachDid: (id) => {
        const owned = get().ownedDids;
        set({
          ownedDids: owned.includes(id) ? owned : [...owned, id],
          did: id,
        });
      },
      setRegion: (id) => set({ regionId: id }),
      setProtocol: (id) => set({ protocol: id }),
      setKillSwitch: (on) => set({ killSwitch: on }),
      setMachine: (id) => set({ machineId: id }),
      setDeskOpen: (open) => set({ deskOpen: open }),
      toggleMute: () => set({ muted: !get().muted }),
      toggleHold: () => set({ held: !get().held }),
      startCall: (peer) => {
        const trimmed = peer.trim();
        if (!trimmed) return;
        clearDial();
        set({
          callStatus: "dialing",
          callPeer: trimmed,
          callDirection: "out",
          callStarted: null,
          muted: false,
          held: false,
        });
        dialTimer = setTimeout(() => {
          const current = get();
          if (current.callStatus === "dialing" && current.callPeer === trimmed) {
            set({ callStatus: "live", callStarted: Date.now() });
          }
        }, 850);
      },
      ring: () => {
        clearDial();
        const from = "+1 415 555 0136";
        set({
          callStatus: "dialing",
          callPeer: from,
          callDirection: "in",
          callStarted: null,
          muted: false,
          held: false,
        });
        dialTimer = setTimeout(() => {
          const current = get();
          if (current.callStatus === "dialing" && current.callDirection === "in") {
            set({ callStatus: "live", callStarted: Date.now() });
          }
        }, 4000);
      },
      answer: () => {
        clearDial();
        if (get().callStatus === "idle") return;
        set({ callStatus: "live", callStarted: Date.now() });
      },
      hangup: () => {
        clearDial();
        const current = get();
        if (current.callStatus === "idle") return;
        const seconds =
          current.callStatus === "live" && current.callStarted
            ? Math.max(1, Math.round((Date.now() - current.callStarted) / 1000))
            : 0;
        const recent: RecentCall = {
          id: rid(),
          peer: current.callPeer,
          direction: current.callDirection,
          seconds,
          at: Date.now(),
        };
        set({
          callStatus: "idle",
          callStarted: null,
          muted: false,
          held: false,
          recents: [recent, ...current.recents].slice(0, 8),
        });
      },
      sendSms: (to, body) => {
        const trimmedTo = to.trim();
        const trimmedBody = body.trim();
        if (!trimmedTo || !trimmedBody) return;
        const message: Sms = {
          id: rid(),
          to: trimmedTo,
          body: trimmedBody.slice(0, 160),
          at: Date.now(),
        };
        set({ messages: [message, ...get().messages].slice(0, 12) });
      },
      connectVpn: () => set({ vpnOn: true }),
      disconnectVpn: () => set({ vpnOn: false }),
      ackRecovery: () => set({ recoverySeen: true }),
      resetWorkspace: () => {
        clearDial();
        set({
          callsign: "",
          planId: null,
          active: false,
          recovery: null,
          recoverySeen: false,
          ownedDids: [],
          includedDids: [],
          did: DIDS[0].id,
          vpnOn: false,
          deskOpen: false,
          callStatus: "idle",
          callPeer: "",
          callStarted: null,
          recents: [],
          messages: [],
          machineId: "dx-04",
          machineIds: [],
          selectedVpsId: null,
          selectedDedicatedId: null,
        });
      },
    }),
    {
      name: "vela-workspace",
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1 && persistedState && typeof persistedState === "object") {
          return {
            ...(persistedState as Partial<VelaState>),
            active: false,
            recovery: null,
            recoverySeen: false,
            did: DIDS[0].id,
            ownedDids: [],
            includedDids: [],
            vpnOn: false,
            deskOpen: false,
            recents: [],
            messages: [],
          } as VelaState;
        }
        return persistedState as VelaState;
      },
      skipHydration: true,
      partialize: (state) => ({
        callsign: state.callsign,
        planId: state.planId,
        term: state.term,
        recovery: state.recovery,
        recoverySeen: state.recoverySeen,
        active: false,
        did: state.did,
        ownedDids: state.ownedDids,
        includedDids: state.includedDids,
        recents: state.recents,
        messages: state.messages,
        regionId: state.regionId,
        protocol: state.protocol,
        vpnOn: state.vpnOn,
        killSwitch: state.killSwitch,
        machineId: state.machineId,
        machineIds: state.machineIds,
        selectedVpsId: state.selectedVpsId,
        selectedDedicatedId: state.selectedDedicatedId,
      }),
    },
  ),
);

export function useHydrateVela() {
  useEffect(() => {
    void useVela.persist.rehydrate();
  }, []);
}

export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
