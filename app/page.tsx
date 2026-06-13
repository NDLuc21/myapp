import { Menu, SlidersHorizontal, ChevronDown, Calendar, Info } from "lucide-react"
import { PhoneShell, StatusBar } from "@/components/phone-shell"
import { BottomNav } from "@/components/bottom-nav"
import { AnomalyMap } from "@/components/anomaly-map"
import { getEvents } from "@/lib/events"

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>
}) {
  const events = await getEvents()
  const { focus } = await searchParams

  return (
    <PhoneShell>
      <StatusBar />

      {/* header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button type="button" aria-label="Menu" className="p-1 text-foreground">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Vị trí bất thường</h1>
        <button type="button" aria-label="Bộ lọc" className="p-1 text-foreground">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* stats card */}
        <div className="px-4 pb-3">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="pr-3">
                <p className="text-xs text-muted-foreground">Tổng điểm bất thường</p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-destructive">{events.length}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                    Hôm nay
                  </span>
                </div>
              </div>
              <div className="px-3">
                <p className="text-xs text-muted-foreground">Tuyến đường</p>
                <button
                  type="button"
                  className="mt-1 flex items-center gap-1 text-sm font-semibold text-foreground"
                >
                  Tất cả <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="pl-3">
                <p className="text-xs text-muted-foreground">Ngày</p>
                <button
                  type="button"
                  className="mt-1 flex items-center gap-1 text-sm font-semibold text-foreground"
                >
                  20/05/2024
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 shrink-0" />
              Dữ liệu từ sự kiện gửi bởi thiết bị, không theo dõi liên tục.
            </p>
          </div>
        </div>

        {/* map */}
        <div className="relative flex-1 overflow-hidden">
          <AnomalyMap events={events} focusId={focus} />
        </div>
      </div>

      <BottomNav />
    </PhoneShell>
  )
}
