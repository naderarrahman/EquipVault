"use client"

import { useSyncExternalStore } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { BarChart3 } from "lucide-react"

export interface MonthlyChartDatum {
  month: string
  primaryValue: number
  secondaryValue?: number
}

interface AnalyticsBarChartProps {
  title: string
  subtitle: string
  primaryLabel: string
  secondaryLabel?: string
  valuePrefix?: string
  data: MonthlyChartDatum[]
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    dataKey?: string
    color?: string
  }>
  label?: string
  valuePrefix: string
  primaryLabel: string
  secondaryLabel?: string
}

const emptySubscribe = () => () => {}

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  valuePrefix,
  primaryLabel,
  secondaryLabel,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="bg-popover border border-border rounded-xl px-3.5 py-2.5 shadow-lg text-xs space-y-1.5">
      <p className="font-bold text-foreground border-b border-border/60 pb-1">
        {label} 2026
      </p>
      {payload.map((entry, index) => {
        const isPrimary = entry.dataKey === "primaryValue"
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-4 font-medium"
          >
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: isPrimary
                    ? "hsl(var(--primary))"
                    : "#10b981",
                }}
              />
              {isPrimary ? primaryLabel : secondaryLabel || "Count"}
            </span>
            <span className="font-mono font-bold text-foreground">
              {isPrimary ? valuePrefix : ""}
              {entry.value ?? 0}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function AnalyticsBarChart({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  valuePrefix = "",
  data,
}: AnalyticsBarChartProps) {
  const isClient = useIsClient()
  const hasSecondary = Boolean(secondaryLabel)

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-6">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" />
            {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            <span className="size-2.5 rounded-full bg-primary" />
            {primaryLabel}
          </span>
          {secondaryLabel && (
            <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              {secondaryLabel}
            </span>
          )}
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-[270px] w-full min-w-0">
        {isClient ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
              barGap={6}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.6}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(val: number) => `${valuePrefix}${val}`}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.35 }}
                content={
                  <ChartTooltip
                    valuePrefix={valuePrefix}
                    primaryLabel={primaryLabel}
                    secondaryLabel={secondaryLabel}
                  />
                }
              />
              <Bar
                dataKey="primaryValue"
                name={primaryLabel}
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
                maxBarSize={38}
              />
              {hasSecondary && (
                <Bar
                  dataKey="secondaryValue"
                  name={secondaryLabel}
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={38}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-muted/40 animate-pulse" />
        )}
      </div>
    </div>
  )
}