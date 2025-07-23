function AboutPage() {
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
    <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-8 sm:p-10">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gray-100 rounded-xl opacity-60"></div>
            <h1 className="relative text-4xl sm:text-5xl font-bold text-gray-800">
              About StoryLine
            </h1>
          </div>
        </div>
        
        <div className="space-y-6 text-gray-600">
          <p className="text-lg leading-relaxed">
            StoryLine is a modern blog platform built with the MERN stack (MongoDB, Express, React, Node.js) that combines elegant design with powerful functionality. Our platform offers writers a clean, distraction-free environment to share their stories.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-sm">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">For Writers</h3>
              <p className="text-gray-600">
                Create, edit, and manage your posts with our intuitive editor. Focus on your content while we handle the presentation.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-sm">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">For Readers</h3>
              <p className="text-gray-600">
                Enjoy a clean reading experience with optimal typography and layout designed for maximum readability.
              </p>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center border border-indigo-200">
                  <span className="text-indigo-600 text-lg font-bold">M</span>
                </div>
                <span className="text-gray-500">Maharaja Prabhu</span>
              </div>
              
              <div className="text-gray-400 text-sm">
                Built with ❤️ using the MERN stack
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default AboutPage;
