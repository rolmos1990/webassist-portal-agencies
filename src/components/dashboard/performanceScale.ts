import type { AgentPerformanceData } from './AgentPerformanceSection';

/** Escala del eje: un 10% sobre el valor máximo, en 5 pasos */
export function performanceScale(items: AgentPerformanceData[]) {
  const max = Math.max(0, ...items.map((i) => i.value));
  const maxValue = max > 0 ? Math.ceil(max * 1.1) : 10000;
  return { maxValue, stepSize: Math.ceil(maxValue / 5) };
}
