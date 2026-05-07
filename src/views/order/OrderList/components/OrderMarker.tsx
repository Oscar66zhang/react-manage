import { IDetailProp } from '@/types/modal'
import { Modal } from 'antd'
import { useImperativeHandle, useRef, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'
import L from 'leaflet'

// 修复 Vite 打包时 Leaflet 默认图标路径丢失问题
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
})

const OrderMarker = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const detailRef = useRef<Order.OrderItem | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useImperativeHandle(props.mRef, () => ({ open }))

  const open = async (orderId: string) => {
    const detail = await api.getOrderDetail(orderId)
    detailRef.current = detail
    setVisible(true)
  }

  // Modal 动画完全结束后初始化地图，此时 #markerMap 已确实挂载到 DOM
  const handleAfterOpenChange = (isOpen: boolean) => {
    if (!isOpen || !detailRef.current) return

    const detail = detailRef.current
    const route = detail.route ?? []

    const defaultCenter: L.LatLngTuple =
      route.length > 0
        ? [parseFloat(route[0].lat), parseFloat(route[0].lng)]
        : [39.9042, 116.4074]

    const map = L.map('markerMap').setView(defaultCenter, 13)
    mapRef.current = map

    // 高德地图瓦片
    L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      { attribution: '© 高德地图', subdomains: '1234', maxZoom: 18 }
    ).addTo(map)

    // 起点标记
    if (route.length > 0) {
      const start = route[0]
      L.marker([parseFloat(start.lat), parseFloat(start.lng)])
        .addTo(map)
        .bindPopup(`起点：${detail.startAddress}`)
        .openPopup()
    }

    // 终点标记
    if (route.length > 1) {
      const end = route[route.length - 1]
      L.marker([parseFloat(end.lat), parseFloat(end.lng)])
        .addTo(map)
        .bindPopup(`终点：${detail.endAddress}`)
    }

    // 绘制轨迹线并自适应视野
    if (route.length > 1) {
      const latlngs: L.LatLngTuple[] = route.map(p => [
        parseFloat(p.lat),
        parseFloat(p.lng)
      ])
      L.polyline(latlngs, { color: '#1677ff', weight: 4 }).addTo(map)
      map.fitBounds(L.polyline(latlngs).getBounds(), { padding: [30, 30] })
    }

    map.invalidateSize()
  }

  const handleClose = () => {
    // 关闭时销毁地图实例，避免下次打开时容器已被 destroyOnHide 移除而报错
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }
    setVisible(false)
  }

  return (
    <Modal
      title='地图打点'
      width={1100}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleClose}
      onCancel={handleClose}
      afterOpenChange={handleAfterOpenChange}
    >
      <div id='markerMap' style={{ height: 500 }} />
    </Modal>
  )
}

export default OrderMarker
