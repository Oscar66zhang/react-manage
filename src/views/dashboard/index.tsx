import { Descriptions, Card, Button } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect } from 'react'

export default function DashBoard() {
  useEffect(() => {
    const lineChartDom = document.getElementById('lineChart')
    const chartInstance = echarts.init(lineChartDom)
    chartInstance.setOption({
      title: {
        text: '订单流水走势图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['PM2.5', 'PM10', 'O3'],
        right: '5%'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value',
        name: 'AQI'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 50, 60, 70, 80, 90, 100, 110, 120]
        },
        {
          name: '流水',
          type: 'line',
          data: [1000, 2000, 3000, 5000, 600, 800, 2000, 3200, 1100, 1200, 1300, 1400]
        }
      ]
    })
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt=''
          className={styles.userImg}
        />
        <Descriptions title='欢迎新同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>100001</Descriptions.Item>
          <Descriptions.Item label='邮箱'>test@mars.com</Descriptions.Item>
          <Descriptions.Item label='状态'>在职</Descriptions.Item>
          <Descriptions.Item label='手机号'>17600001111</Descriptions.Item>
          <Descriptions.Item label='岗位'>前端工程师</Descriptions.Item>
          <Descriptions.Item label='部门'>大前端</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>

      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div id='pieChartCity' className={styles.itemChart}></div>
          <div id='pieChartAge' className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div id='radarChart' className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
