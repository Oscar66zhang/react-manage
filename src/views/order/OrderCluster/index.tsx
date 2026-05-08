import { Select } from 'antd'
import { useEffect, useState, useRef } from 'react'
import api from '@/api/orderApi'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
})

const OrderCluster = () => {
  const [cityId, setCityId] = useState(10001)
  const mapRef = useRef<L.Map | null>(null)
  const clusterGroupRef = useRef<any>(null)

  // 城市坐标配置
  const cityCenterMap: any = {
    10001: [28.2282, 112.9388], // 长沙
    10002: [30.5928, 114.3055], // 武汉
    10003: [30.2795, 120.1538], // 杭州
    10004: [23.1292, 114.4161], // 惠州
    10005: [25.0458, 102.7095], // 昆明
  }

  useEffect(() => {
    renderMap()
    getCityData()
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // 切换 cityId 重新加载 + 飞过去
  useEffect(() => {
    if (mapRef.current) {
      getCityData()

      // 切换后地图飞到当前城市坐标
      const center = cityCenterMap[cityId]
      if (center) {
        mapRef.current.setView(center, 12)
      }
    }
  }, [cityId])

  const getCityData = async () => {
    const res: any = await api.getCityData(cityId)

    const clusters = res.data?.clusters || []

    if (!clusterGroupRef.current || !mapRef.current) return

    clusterGroupRef.current.clearLayers()
    const markers: L.Marker[] = []

    clusters.forEach((cluster: any) => {
      cluster.points?.forEach((point: any) => {
        const lat = Number(point.lat)
        const lng = Number(point.lng)

        // 过滤非法坐标
        if (isNaN(lat) || isNaN(lng)) return

        const marker = L.marker([lat, lng])
          .bindPopup(`
            <div style="line-height: 1.8">
              <b style="color: #1677ff">订单号:</b> ${point.orderId}<br/>
              <b>用户名:</b> ${point.userName}<br/>
              <b>地址:</b> ${point.address}
            </div>
          `)
        markers.push(marker)
        clusterGroupRef.current.addLayer(marker)
      })
    })

    if (markers.length > 0) {
      const group = L.featureGroup(markers)
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] })
    }
  }

  const renderMap = () => {
    if (mapRef.current) return
    const map = L.map('clusterMap').setView([30.5728, 114.2986], 5)
    mapRef.current = map

    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      attribution: '© 高德地图',
      subdomains: '1234',
      maxZoom: 18
    }).addTo(map)

    const clusterGroup = (L as any).markerClusterGroup()
    map.addLayer(clusterGroup)
    clusterGroupRef.current = clusterGroup
  }

  const handleChange = (val: number) => {
    setCityId(val)
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>选择城市：</span>
        <Select
          style={{ width: 150 }}
          value={cityId}
          onChange={handleChange}
          options={[
            { label: '长沙', value: 10001 },
            { label: '武汉', value: 10002 },
            { label: '杭州', value: 10003 },
            { label: '惠州', value: 10004 },
            { label: '昆明', value: 10005 }
          ]}
        />
      </div>
      <div id='clusterMap' style={{ height: 'calc(100vh - 280px)', borderRadius: 8 }}></div>
    </div>
  )
}

export default OrderCluster