import React from 'react'
import Hero from '../components/homepage/hero'
import Products from '../components/homepage/products'
import LatestRelease from '../components/homepage/latestRelease'
import MusicCatalog from '../components/homepage/MusicCatalog'
import StatsSection from '../components/homepage/StatsSection'
import Join from '../components/homepage/join'
import StreamEverywhere from '../components/homepage/stream'

const page = () => {
  return (
    <div>
      <Hero />
      <LatestRelease />
      <StreamEverywhere />
      <MusicCatalog />
      <Products />
      <Join />
      <StatsSection></StatsSection>
    </div>
  )
}

export default page