import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data} from "../dummyData/data";    
const PieChart = () => {
    // const chartColors = ["#1554ad","#1668dc","#3c89e8"];
    const chartColors = ["#3c9ae8","#65b7f3","#8dcff8"];

  return (
    <div style={{ height: "400px" }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
      sortByValue={true}
      innerRadius={0.4}
      cornerRadius={4}
      activeOuterRadiusOffset={4}
    //   colors={{ scheme: "blues" }}
      colors={chartColors}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={10}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={8}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 53,
          translateY: 4,
          itemsSpacing: 12,
          itemWidth: 109,
          itemHeight: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 16,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
    
  );
};

export default PieChart;
