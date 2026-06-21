import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Capabilities from './sections/Capabilities'
import InTheField from './sections/InTheField'
import StrategyDelivered from './sections/StrategyDelivered'
import ProgramsThatLast from './sections/ProgramsThatLast'
import Works from './sections/Works'
import Resources from './sections/Resources'
import MethodInMotion from './sections/MethodInMotion'
import CapabilityPartners from './sections/CapabilityPartners'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start)

      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            )
            if (!inPinned) return value

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      })
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Preloader />
            <Header scrollRef={scrollRef} />
            <main>
              {/* Section 1: Shutter Hero - z: 10 */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <Spatial />
              </div>
              {/* Section 2: Manifesto - z: 20 */}
              <div style={{ position: 'relative', zIndex: 20 }}>
                <Philosophy />
              </div>
              {/* Section 3: Services - z: 30 */}
              <div style={{ position: 'relative', zIndex: 30 }}>
                <Capabilities />
              </div>
              {/* Section 4: In the Field (Video) - z: 40 */}
              <div style={{ position: 'relative', zIndex: 40 }}>
                <InTheField />
              </div>
              {/* Section 5: Strategy Delivered - z: 50 */}
              <div style={{ position: 'relative', zIndex: 50 }}>
                <StrategyDelivered />
              </div>
              {/* Section 6: Programs That Last - z: 60 */}
              <div style={{ position: 'relative', zIndex: 60 }}>
                <ProgramsThatLast />
              </div>
              {/* Section 7: Case Studies (flowing) - z: 70 */}
              <div style={{ position: 'relative', zIndex: 70 }}>
                <Works />
              </div>
              {/* Section 8: Research & Insights - z: 80 */}
              <div style={{ position: 'relative', zIndex: 80 }}>
                <Resources />
              </div>
              {/* Section 9: Method in Motion (Video) - z: 90 */}
              <div style={{ position: 'relative', zIndex: 90 }}>
                <MethodInMotion />
              </div>
              {/* Section 10: Capability Partners - z: 100 */}
              <div style={{ position: 'relative', zIndex: 100 }}>
                <CapabilityPartners />
              </div>
              {/* Section 11: Contact + Community (flowing) - z: 110 */}
              <div style={{ position: 'relative', zIndex: 110 }}>
                <Contact />
              </div>
              {/* Section 12: Footer (flowing) - z: 120 */}
              <div style={{ position: 'relative', zIndex: 120 }}>
                <Footer />
              </div>
            </main>
          </>
        }
      />
    </Routes>
  )
}

export default App
