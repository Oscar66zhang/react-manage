import { useEffect, useRef, useState, RefObject } from 'react'
import * as echarts from 'echarts'

export const useCharts = (): [RefObject<HTMLDivElement | null>, echarts.EChartsType | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)
  }, [])
  return [chartRef, chartInstance]
}
