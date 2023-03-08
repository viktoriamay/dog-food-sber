import * as echarts from 'echarts'
import { useEffect } from 'react'

export const Chart = () => {
  const text = 'Заказы за месяц';
  useEffect(() => {
    const option = {
      title: {
        text: text,
        textStyle: {
          fontFamily: 'Nunito',
          fontSize: '22px'
        }
        // link: 'https://echarts.apache.org/en/option.html#title.link' 
        //setOption из доки все значения поля тайтл можно подставлять сюда
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          fontFamily: 'Nunito',
          fontSize: '16px',
        },
        top: '3px'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        data: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь']
      },
      series: [
        {
          name: 'Начало',
          type: 'bar',
          data: [8203, 3489, 9034, 4970, 1744, 3230],
          color: '#747474'
        },
        {
          name: 'Конец',
          type: 'bar',
          data: [9325, 3438, 3000, 2594, 3141, 8807],
          color: '#fed700'
        }
      ],
      /* полоска увеличения
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 150
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          bottom: 200,
          start: 0,
          end: 150
        }
      ], */
    };
    
    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)
    option && myChart.setOption(option)
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: 500 }} id="chartsId"></div>
    </>
  )
}
