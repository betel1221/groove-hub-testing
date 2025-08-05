// src/components/SkeletonLoader.js
export default function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gray-800 rounded-2xl h-48"></div>

      {/* Cards Grid Skeleton */}
      <div>
        <div className="bg-gray-800 h-8 w-48 rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="bg-gray-800 aspect-square rounded-lg"></div>
              <div className="bg-gray-800 h-4 rounded"></div>
              <div className="bg-gray-800 h-3 w-3/4 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Track List Skeleton */}
      <div>
        <div className="bg-gray-800 h-8 w-48 rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="bg-gray-800 w-15 h-15 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-800 h-4 rounded"></div>
                <div className="bg-gray-800 h-3 w-3/4 rounded"></div>
              </div>
              <div className="bg-gray-800 h-3 w-12 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}