'use client'

export function DroneVideoSection() {
  return (
    <section className="relative overflow-hidden h-[420px] flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source
          src="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#003087] opacity-70" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8A020] mb-3">13 Locations · Coast to Coast</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Operations Built for Scale</h2>
        <p className="text-blue-100 text-lg">
          From our Riverside headquarters to field service teams in Texas, Arizona, and beyond — CCW brings full remanufacturing capacity to every agency we serve.
        </p>
      </div>
    </section>
  )
}
