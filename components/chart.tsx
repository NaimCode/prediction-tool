"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Data } from "@/app/dashboard/page";
import { Card, CardContent, CardFooter } from "@/components//ui/card";
import { ChartContainer } from "@/components//ui/chart";
import { Separator } from "@/components//ui/separator";

export default function ComponentChart({ data }: { data: Data }) {
  const getConfig = () => {
    const obj = {};
    for (let i = 0; i < (data?.data.trucks ?? []).length; i++) {
      const d = data?.data.trucks[i];
      if (!d) {
        continue;
      }
      if (data?.model == "company") {
        Object.assign(obj, {
          [d.company]: {
            label: d.company,
            color: `hsl(var(--chart-${i}))`,
          },
        });
      }
    }
    return obj;
  };
  return (
    <Card className="w-full">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer config={getConfig()} className="h-[200px] w-full">
          <BarChart
            margin={{
              left: 50,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={
              //</ChartContainer>[
              // {
              //   activity: "stand",
              //   value: (8 / 12) * 100,
              //   label: "8/12 hr",
              //   fill: "var(--color-stand)",
              // },
              // {
              //   activity: "exercise",
              //   value: (46 / 60) * 100,
              //   label: "46/60 min",
              //   fill: "var(--color-exercise)",
              // },
              // {
              //   activity: "move",
              //   value: (245 / 360) * 100,
              //   label: "245/360 kcal",
              //   fill: "var(--color-move)",
              // },
              // ]
              data?.data.trucks.map((d, i) => ({
                activity: data?.model == "company" ? d.company : d.truck_name,
                value: d.percentage,
                label: `${d.percentage}%`,
                fill: "var(--color-stand)",
              }))
            }
            layout="vertical"
            barSize={102}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Model</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none uppercase">
              {data?.model}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Date</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {data?.date}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
        </div>
      </CardFooter>
    </Card>
  );
}
