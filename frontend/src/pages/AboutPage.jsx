function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-[#333]">
      
      <h1 className="text-3xl md:text-4xl text-black mb-8 font-normal">
        About
      </h1>
      
      <div className="text-lg leading-relaxed space-y-6">
        <p>
          Maharaja Prabhu's Blog is a sample project blog platform built with the MERN stack (MongoDB, Express, React, Node.js) that combines design with functionality. This platform offers writers a clean environment to share their insights.
        </p>
        
        <h2 className="text-2xl text-black mt-10 mb-2 font-normal">For Writers</h2>
        <p>
          Create, edit, and manage your posts with the editor. Focus on your content and let it handle the presentation.
        </p>
        
        <h2 className="text-2xl text-black mt-10 mb-2 font-normal">For Readers</h2>
        <p>
          Enjoy a clean reading experience with optimal typography and layout designed for maximum readability.
        </p>

        <div className="mt-12 pt-6 border-t text-base text-gray-600">
          <p>
            Developed by <strong>Maharaja Prabhu</strong>.<br />
            Built with ❤️ using the MERN stack.
          </p>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;