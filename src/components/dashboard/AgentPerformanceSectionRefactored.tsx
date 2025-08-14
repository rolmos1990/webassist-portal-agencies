import HorizontalBarChart from '../common/HorizontalBarChart';

interface AgentPerformanceSectionProps {
  data?: {
    data: Array<{
      name: string;
      subtitle: string;
      value: number;
    }>;
  };
}

export default function AgentPerformanceSection({ data }: AgentPerformanceSectionProps) {
  // Use provided data or fallback to default data
  const chartData = data?.data || [
    { name: "John Smith", subtitle: "Senior Agent", value: 8500 },
    { name: "Sarah Johnson", subtitle: "Lead Agent", value: 7200 },
    { name: "Mike Davis", subtitle: "Agent", value: 6800 },
    { name: "Lisa Wilson", subtitle: "Junior Agent", value: 5400 },
    { name: "Tom Brown", subtitle: "Agent", value: 4900 },
  ];

  const chartConfig = {
    id: 'agent-performance',
    title: 'Agent Performance',
    data: chartData,
    backgroundColor: '#7ac142',
    height: 450,
    maxValue: 10000,
    stepSize: 2000,
  };

  return (
    <div className="p-3 bg-white rounded-2 flex-fill" style={{ minWidth: 0, overflow: 'hidden' }}>
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Agent Performance
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Top performing agents this month
          </p>
        </div>
      </div>
      
      <div className="mt-3" style={{ height: '450px' }}>
        <HorizontalBarChart config={chartConfig} />
        
        {/* Custom labels for agents */}
        <div className="mt-3">
          {chartData.map((agent, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div style={{ color: "#21272a", fontSize: "13px", fontWeight: "600" }}>
                  {agent.name}
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  {agent.subtitle}
                </div>
              </div>
              <div style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}>
                ${(agent.value / 1000).toFixed(1)}K
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
