import { IDetailProp } from '@/types/modal'
import { Modal } from 'antd'
import { useImperativeHandle, useRef, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'
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

const OrderMarker = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const detailRef = useRef<Order.OrderItem | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(props.mRef, () => ({ open }))

  const open = async (orderId: string) => {
    const detail = await api.getOrderDetail(orderId)
    detailRef.current = detail
    setVisible(true)
  }

  const initMap = () => {
    if (!mapContainerRef.current || !detailRef.current) return
    if (mapRef.current) return

    const detail = detailRef.current
    const route = detail.route ?? []

    const defaultCenter: L.LatLngTuple =
      route.length > 0
        ? [parseFloat(route[0].lat), parseFloat(route[0].lng)]
        : [39.9042, 116.4074]

    const map = L.map(mapContainerRef.current).setView(defaultCenter, 13)
    mapRef.current = map

    L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      { attribution: '© 高德地图', subdomains: '1234', maxZoom: 18 }
    ).addTo(map)

    const markers = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    })

    if (route.length > 0) {
      const start = route[0]
      const startMarker = L.marker([parseFloat(start.lat), parseFloat(start.lng)])
        .bindPopup(`起点：${detail.startAddress}`)
      markers.addLayer(startMarker)
    }

    if (route.length > 1) {
      const end = route[route.length - 1]
      const endMarker = L.marker([parseFloat(end.lat), parseFloat(end.lng)])
        .bindPopup(`终点：${detail.endAddress}`)
      markers.addLayer(endMarker)
    }

    map.addLayer(markers)

    if (route.length > 1) {
      const latlngs: L.LatLngTuple[] = route.map(p => [
        parseFloat(p.lat),
        parseFloat(p.lng)
      ])
      const line = L.polyline(latlngs, { color: '#1677ff', weight: 4 })
      line.addTo(map)
      map.fitBounds(line.getBounds(), { padding: [30, 30] })
    }

    map.invalidateSize()
  }

  const destroyMap = () => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }
  }

  const handleAfterOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      initMap()
    } else {
      destroyMap()
    }
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <Modal
      title="地图打点"
      width={1100}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleClose}
      onCancel={handleClose}
      afterOpenChange={handleAfterOpenChange}
    >
      <div ref={mapContainerRef} style={{ height: 500 }} />
    </Modal>
  )
}

export default OrderMarker