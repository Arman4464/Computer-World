export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">Loading Computer World</h2>
            <p className="text-gray-600">Preparing your IT solution...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
