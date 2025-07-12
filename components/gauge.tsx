import { DetoxColor, ToxColor, type ToxData, type ToxType } from "~core";
import GaugeComponent, { type SubArc } from 'react-gauge-component';
import { Card } from "@/components/ui/card";

// number = sec
export interface GaugeProps {
  data: ToxData[]
}

const TOTAL = 24

export default function Gauge({ data }: GaugeProps) {
  const colorArray: string[] = []
  const subArcs: SubArc[] = []

  data.sort((a, b) => a.s - b.s)

  let limit = 0
  for (let { type, s } of data) {
    const hours = Math.round(s / 360) / 10 // sec -> hour
    limit += hours
    subArcs.push({
      limit,
      showTick: true,
      tooltip: {
        text: `${type}: ${hours}h`,
      }
    })
    colorArray.push(ToxColor[type])
  }

  subArcs.push({
    limit: TOTAL,
    tooltip: {
      text: '디톡스',
    }
  })
  colorArray.push(DetoxColor)

  return (
    <>
      <style>
        {`
          .gauge-component-arc-tooltip {
            border: 0!important;
            background-color: hsl(var(--background))!important;
            color: hsl(var(--foreground))!important;
            font-weight: 500!important;
            font-size: 0.75rem!important;
            line-height: 1rem!important;
            --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)!important;
            text-shadow: none!important;
            padding: 0.5rem!important;
          }
      `}
      </style>
      <Card>
        <GaugeComponent
          value={TOTAL - limit}
          type="semicircle"
          labels={{
            valueLabel: {
              formatTextValue: value => value + 'h',
              style: { fontSize: "36px", fill: "#27272a", textShadow: 'none', fontWeight: '600' }
            },
            tickLabels: {
              type: 'outer',
              defaultTickValueConfig: {
                formatTextValue: (value: any) => value + 'h',
              }
            }
          }}
          arc={{
            colorArray,
            subArcs,
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            hide: true,
          }}
          minValue={0}
          maxValue={TOTAL}
        />
      </Card>
    </>
  )
}