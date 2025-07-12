import Chart from "~components/chart"
import Gauge from "~components/gauge"

export default function Stat() {
  return (
    <div className="flex flex-col gap-4">
      <Gauge data={[
        { type: 'Youtube', s: 3600 * 3.111 },
        { type: 'Twitter', s: 3600 * 2.2222 },
        { type: 'Instagram', s: 3600 * 2.5555 },
      ]} />
      <Chart data={[
        [1750809600000,
          [
            { type: 'Youtube', s: 3600 * 3.111 },
            { type: 'Twitter', s: 3600 * 1.2222 },
            { type: 'Instagram', s: 3600 * 1.5555 },
          ]
        ],
        [1750896000000,
          [
            { type: 'Youtube', s: 3600 * 2.111 },
            { type: 'Twitter', s: 3600 * 4.2222 },
            { type: 'Instagram', s: 3600 * 3.5555 },
          ]
        ],
        [1750982400000,
          [
            { type: 'Youtube', s: 3600 * 2.111 },
            { type: 'Twitter', s: 3600 * 1.2222 },
            { type: 'Instagram', s: 3600 * 1.5555 },
          ]
        ],
      ]} />
    </div>
  )
}