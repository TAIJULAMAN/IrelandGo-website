export default function ByTheHourEnglishSpeakingDriver() {
  const cities = [
    {
      name: "Dublin",
      desc: "Ireland's vibrant capital",
      image:
        "https://images.pexels.com/photos/3634379/pexels-photo-3634379.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Galway",
      desc: "Cultural heart of Ireland",
      image:
        "https://images.pexels.com/photos/11880886/pexels-photo-11880886.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Cork",
      desc: "Rebel county charm",
      image:
        "https://images.pexels.com/photos/15092338/pexels-photo-15092338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Killarney",
      desc: "Gateway to natural beauty",
      image:
        "https://images.pexels.com/photos/11880886/pexels-photo-11880886.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-slate-900">
          Plan your own private car transfer with English-speaking driver
        </h2>
        <p className="text-center text-slate-500 mt-2">
          Available in 100+ destinations across Ireland
        </p>

        {/* Map Card */}
        <div className="mt-8 rounded-lg overflow-hidden ring-1 ring-black/5 p-5 bg-blue-50">
          <img
            src="/ireland.png"
            alt="Ireland map"
            className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Cities list */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5"
            >
              <div className="h-36">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{c.name}</h3>
                <p className="text-slate-600 text-sm">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
