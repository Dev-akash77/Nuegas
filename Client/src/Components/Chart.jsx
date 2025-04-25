import React from "react";
import CustomTooltip from "./../UI/CustomTooltip";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  // !data for line chart
  const data = [
    { name: "Sun", activity: 5 },
    { name: "Mon", activity: 27 },
    { name: "Tue", activity: 6 },
    { name: "Wed", activity: 25 },
    { name: "Thu", activity: 15 },
    { name: "Fri", activity: 10 },
    { name: "Sat", activity: 12 },
  ];

  const today = new Date();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayName = weekDays[today.getDay()];

  const customYAxisTicks = [0, 10, 20, 30];

  // !data for Pi chart
  const dataPi = [
    { name: "Pending", value: 13 },
    { name: "Progress", value: 5 },
    { name: "Compleate", value: 3 },
  ];

  const COLORS = ["#546FFF", "#FFC73A", "#9CD323"]; 

  return (
    <div className="w-full bg-gray h-full flex md:flex-row flex-col items-center justify-between gap-4 p-4 rounded-md">
      {/* Weekly chart */}
      <div className="md:w-[60%] w-full h-full">
        <div className="w-full flex items-center justify-between mb-2">
          <p className="text-lg font-medium">Activity</p>
          <p className="text-md text-black">This Week</p>
        </div>

        {/* Line Chart */}
        <div className="w-full h-[10rem] bg-white rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
            >
              <XAxis
                dataKey="name"
                strokeWidth={0}
                stroke="black"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fontSize: 15, fill: "#000", fontWeight: "400" }}
              />

              <YAxis
                strokeWidth={0}
                stroke="black"
                axisLine={false}
                tickLine={false}
                ticks={customYAxisTicks}
                domain={[0, 30]}
                interval={0}
                tickMargin={10}
                tick={{ fontSize: 13, fill: "#000", fontWeight: "400" }}
              />

              <Tooltip content={CustomTooltip} />
              <CartesianGrid horizontal={false} stroke="#f1f1f1" />

              {/* Shadow line */}
              <Line
                type="monotone"
                dataKey="activity"
                stroke="rgba(149, 157, 165, 0.2)"
                strokeWidth={6}
                dot={false}
                style={{
                  transform: "translate(4px, 4px)",
                  borderRadius: "4rem",
                }}
                strokeLinecap="round"
              />

              {/* Main line with custom dot for today */}
              <Line
                type="monotone"
                dataKey="activity"
                stroke="black"
                strokeWidth={3}
                strokeLinecap="round"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (payload.name === todayName) {
                    return (
                      <g key={payload.name}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill="black"
                          stroke="white"
                          strokeWidth={2}
                        />
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          fill="black"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {payload.activity}
                        </text>
                      </g>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart status - can be used for stats/-progress,-pending,-compleate */}
      <div className="md:w-[40%] w-full h-full bg-white rounded-md flex flex-col items-center justify-center p-4">
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie
              data={dataPi}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={50}
              dataKey="value"
            >
              {dataPi.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-around w-full mt-4 text-sm">
          {dataPi.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
