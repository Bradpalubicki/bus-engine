import { Metadata } from 'next'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = {
  title: 'Photo & Video Gallery | Complete Coach Works',
  description: 'See CCW\'s fleet rehabilitation work — SFMTA, IndyGo, Long Beach Transit, and more. Photos and video from our facilities and field operations.',
}

const photos = [
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/SFMTA-scaled.jpg',
    alt: 'SFMTA fleet — 219 coach midlife overhaul contract, San Francisco',
    caption: 'SFMTA — 219 Coach Contract',
    category: 'Midlife Overhaul',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/Indy-Electric-Bus-scaled.jpg',
    alt: 'IndyGo ZEPS electric bus conversion, Indianapolis',
    caption: 'IndyGo ZEPS Electric Conversion',
    category: 'ZEPS Conversions',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/Bus-Rebuild-scaled.jpg',
    alt: 'Bus rebuild in progress at CCW facility',
    caption: 'Full Bus Rebuild Program',
    category: 'Midlife Overhaul',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/LBT-Repower-scaled.jpg',
    alt: 'Long Beach Transit CNG repower program',
    caption: 'Long Beach Transit — CNG Repower',
    category: 'Fleet',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/CCW-facility-1.jpg',
    alt: 'Complete Coach Works headquarters facility in Riverside, CA',
    caption: 'CCW Riverside HQ Facility',
    category: 'Facilities',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/CCW-shop-floor.jpg',
    alt: 'CCW shop floor — buses in various stages of rehabilitation',
    caption: 'Shop Floor Operations',
    category: 'Facilities',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/bus-paint-booth.jpg',
    alt: 'Bus in CCW paint booth — full exterior restoration',
    caption: 'Paint & Body Restoration',
    category: 'Midlife Overhaul',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/electric-bus-charging.jpg',
    alt: 'Electric bus charging — ZEPS zero-emission propulsion system',
    caption: 'ZEPS Electric Charging',
    category: 'ZEPS Conversions',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
    alt: 'TriMet bus refurbishment — Portland, OR',
    caption: 'TriMet — Portland, OR',
    category: 'Fleet',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg',
    alt: 'SF Muni bus rehabilitation project',
    caption: 'SF Muni Rehabilitation',
    category: 'Midlife Overhaul',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg',
    alt: 'CCW production floor — Riverside, CA',
    caption: 'Production Floor — Riverside',
    category: 'Facilities',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/07/zeps-chassis.jpg',
    alt: 'ZEPS electric chassis conversion in progress',
    caption: 'ZEPS Chassis Conversion',
    category: 'ZEPS Conversions',
  },
]

const videos = [
  {
    src: 'https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4',
    title: 'Murrieta Bus Yard — Aerial Drone Tour',
    description: 'Drone footage of our Murrieta bus yard — one of 13 CCW field service locations across the country.',
  },
]

export default function GalleryPage() {
  return <GalleryClient photos={photos} videos={videos} />
}
