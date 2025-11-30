const memories = [
    {
        image: 'https://images.pexels.com/photos/14660383/pexels-photo-14660383.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Cliffs of Moher',
    },
    {
        image: 'https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Traditional Irish music',
    },
    {
        image: 'https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Irish monument',
    },
    {
        image: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Green countryside',
    },
];

export default function Memories() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Create Unforgettable Memories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {memories.map((memory, index) => (
                        <div
                            key={index}
                            className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <img
                                src={memory.image}
                                alt={memory.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
