import { ResponsiveLine } from "@nivo/line";
// import { mockLineData as data} from "../dummyData/data";    
const AreaChart = ({data}) => {
    // const chartColors = ["#1554ad","#1668dc","#3c89e8"];
    const chartColors = ["#3c9ae8","#65b7f3","#8dcff8"];

  return (
    <div style={{ height: "400px" }}>
     <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 45 }}
        xScale={{ type: 'point' }}
        xFormat=" >-"
        yScale={{
            type: 'linear',
            min: '15',
            max: '65',
            stacked: false,
            reverse: true
        }}
        yFormat=" >-.2f"
        colors={chartColors}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Days',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={true}
        enableGridY={true}
        lineWidth={2}
        enablePoints={false}
        // pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={65}
        areaOpacity={0.45}
        isInteractive={true}
        useMesh={true}
        enableTouchCrosshair={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: -100,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 55,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  </div>
    
  );
};

export default AreaChart;
