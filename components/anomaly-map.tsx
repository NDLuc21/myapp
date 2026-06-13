"use client"

import dynamic from "next/dynamic"
import { Crosshair, Plus, Minus } from "lucide-react"
import type { AnomalyEvent } from "@/lib/events-types"

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Đang tải bản đồ…
    </div>
  ),
})

export function AnomalyMap({ events }: { events: AnomalyEvent[] }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <LeafletMap events={events} />

      {/* map controls (visual only) */}
      <div className="pointer-events-none absolute bottom-6 right-4 z-[1000] flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label="Vị trí của tôi"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-md"
        >
          <Crosshair className="h-5 w-5" />
        </button>
        <div className="pointer-events-auto flex flex-col overflow-hidden rounded-xl bg-card shadow-md">
          <button
            type="button"
            aria-label="Phóng to"
            className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-muted"
          >
            <Plus className="h-5 w-5" />
          </button>
          <span className="h-px w-full bg-border" />
          <button
            type="button"
            aria-label="Thu nhỏ"
            className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-muted"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
