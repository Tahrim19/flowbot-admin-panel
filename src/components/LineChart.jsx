import { ResponsiveLine } from "@nivo/line";
// import { mockLineData as data } from "../dummyData/data";

const LineChart = ({data,legendX,legendY , minX , minY}) => {
  // const chartColors = ["#1554ad","#1668dc","#3c89e8"];
  const chartColors = ["#3c9ae8", "#65b7f3", "#8dcff8"];

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 8, right: 110, bottom: 135, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: minX,
          max: minY,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        colors={chartColors}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legendX,
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legendY,
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 78,
            translateY: 0,
            itemsSpacing: 8,
            itemDirection: "left-to-right",
            itemWidth: 65,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
