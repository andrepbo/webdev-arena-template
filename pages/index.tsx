import { useState, useEffect } from 'react';
import { Search, Filter, Heart, Share2, MessageSquare, X, MapPin, Bookmark, User, ChevronRight, Home } from 'lucide-react';

// Mock data - in a real app this would come from your backend API
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechVision Inc.",
    location: "San Francisco, CA",
    category: "Engineering",
    tools: ["React", "TypeScript", "Next.js"],
    keySkills: ["UI/UX", "Performance Optimization", "Accessibility"],
    matchScore: 92,
    description: "We're looking for a senior frontend engineer to lead our web application development. You'll be responsible for architecting scalable UI components, improving performance, and mentoring junior developers.",
    postedDate: "2025-04-10",
    companyLogo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateTech",
    location: "New York, NY",
    category: "Product",
    tools: ["Jira", "Figma", "SQL"],
    keySkills: ["Product Strategy", "User Research", "Data Analysis"],
    matchScore: 85,
    description: "Join our dynamic product team as a manager where you'll define product roadmaps, conduct user research, and collaborate with engineering to bring innovative solutions to market.",
    postedDate: "2025-04-08",
    companyLogo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    title: "UX Designer",
    company: "CreativeSolutions",
    location: "Remote",
    category: "Design",
    tools: ["Figma", "Adobe XD", "Sketch"],
    keySkills: ["User Research", "Wireframing", "Prototyping"],
    matchScore: 78,
    description: "We're seeking a talented UX designer to create user-centered designs that drive engagement and conversion. You'll collaborate closely with product and engineering teams to bring your designs to life.",
    postedDate: "2025-04-05",
    companyLogo: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataPro Analytics",
    location: "Boston, MA",
    category: "Data Science",
    tools: ["Python", "R", "TensorFlow"],
    keySkills: ["Machine Learning", "Statistical Analysis", "Data Visualization"],
    matchScore: 88,
    description: "Join our data science team to build predictive models, analyze complex datasets, and develop insights that drive business decisions. Experience with big data technologies is a plus.",
    postedDate: "2025-04-12",
    companyLogo: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudServe",
    location: "Austin, TX",
    category: "Engineering",
    tools: ["Kubernetes", "Docker", "AWS"],
    keySkills: ["CI/CD", "Cloud Infrastructure", "Monitoring"],
    matchScore: 76,
    description: "We're looking for a DevOps engineer to build and maintain our cloud infrastructure, implement CI/CD pipelines, and improve system reliability and scalability.",
    postedDate: "2025-04-09",
    companyLogo: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

const categories = [...new Set(jobListings.map(job => job.category))];
const allTools = [...new Set(jobListings.flatMap(job => job.tools))];
const allKeySkills = [...new Set(jobListings.flatMap(job => job.keySkills))];

// Component for displaying a single job card in grid view
const JobCard = ({ job, onSelect, isSaved, onToggleSave }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 flex flex-col md:flex-row">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">{job.company}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
              {job.category}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.tools.map((tool, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {tool}
            </span>
          ))}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.keySkills.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {skill}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img src={job.companyLogo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-gray-500">Posted {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-600">{job.matchScore}% Match</span>
          </div>
        </div>
      </div>
      
      <div className="md:w-40 bg-indigo-50 p-4 flex flex-col justify-between items-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(job.id);
          }} 
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSaved 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-white text-indigo-600 hover:bg-indigo-100'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(job);
          }} 
          className="w-full flex items-center justify-center gap-2 mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Job details sidebar component
const JobDetailsSidebar = ({ job, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md h-full animate-slide-in-right overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {job && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={job.companyLogo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                  {job.category}
                </span>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {job.tools.map((tool, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.keySkills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-green-600 font-medium">{job.matchScore}% Match</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onSave(job.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters, onApplyFilters }) => {
  // State for filter toggles
  const [showCategories, setShowCategories] = useState(true);
  const [showTools, setShowTools] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  
  // Handle checkbox changes
  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    setFilters({...filters, categories: updatedCategories});
  };
  
  const handleToolChange = (tool) => {
    const updatedTools = filters.tools.includes(tool)
      ? filters.tools.filter(t => t !== tool)
      : [...filters.tools, tool];
    
    setFilters({...filters, tools: updatedTools});
  };
  
  const handleSkillChange = (skill) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    setFilters({...filters, skills: updatedSkills});
  };
  
  const handleMatchScoreChange = (e) => {
    setFilters({...filters, minMatchScore: parseInt(e.target.value)});
  };
  
  const resetFilters = () => {
    setFilters({
      categories: [],
      tools: [],
      skills: [],
      minMatchScore: 0
    });
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={resetFilters}
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>
      
      {/* Match Score Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowCategories(!showCategories)}
        >
          <h4 className="font-medium text-gray-900">Match Score</h4>
          <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${showCategories ? 'transform rotate-90' : ''}`} />
        </div>
        
        {showCategories && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Minimum Score: {filters.minMatchScore}%</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={filters.minMatchScore}
                onChange={handleMatchScoreChange}
                className="w-2/3"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[70, 75, 80, 85, 90].map(score => (
                <button
                  key={score}
                  onClick={() => setFilters({...filters, minMatchScore: score})}
                  className={`px-2 py-1 text-sm rounded-full ${
                    filters.minMatchScore === score
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {score}%
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowCategories(!showCategories)}
        >
          <h4 className="font-medium text-gray-900">Categories</h4>
          <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${showCategories ? 'transform rotate-90' : ''}`} />
        </div>
        
        {showCategories && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-3 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`category-${category}`} className="text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tools Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowTools(!showTools)}
        >
          <h4 className="font-medium text-gray-900">Tools</h4>
          <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${showTools ? 'transform rotate-90' : ''}`} />
        </div>
        
        {showTools && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            {allTools.map((tool) => (
              <div key={tool} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`tool-${tool}`}
                  checked={filters.tools.includes(tool)}
                  onChange={() => handleToolChange(tool)}
                  className="mr-3 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`tool-${tool}`} className="text-gray-700">{tool}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowSkills(!showSkills)}
        >
          <h4 className="font-medium text-gray-900">Key Skills</h4>
          <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${showSkills ? 'transform rotate-90' : ''}`} />
        </div>
        
        {showSkills && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            {allKeySkills.map((skill) => (
              <div key={skill} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`skill-${skill}`}
                  checked={filters.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                  className="mr-3 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`skill-${skill}`} className="text-gray-700">{skill}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onApplyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

// Main JobSearchApp Component
export default function JobSearchApp() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    tools: [],
    skills: [],
    minMatchScore: 0
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [view, setView] = useState('grid');
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // Simulate fetching jobs from API
  useEffect(() => {
    setJobs(jobListings);
    setFilteredJobs(jobListings);
  }, []);

  // Apply filters whenever they change or jobs update
  useEffect(() => {
    let result = [...jobs];
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(job => filters.categories.includes(job.category));
    }
    
    // Filter by tools
    if (filters.tools.length > 0) {
      result = result.filter(job => 
        job.tools.some(tool => filters.tools.includes(tool))
      );
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(job => 
        job.keySkills.some(skill => filters.skills.includes(skill))
      );
    }
    
    // Filter by minimum match score
    result = result.filter(job => job.matchScore >= filters.minMatchScore);
    
    setFilteredJobs(result);
  }, [searchQuery, filters, jobs]);

  // Toggle save/unsave job
  const toggleSaveJob = (jobId) => {
    const isSaved = savedJobs.includes(jobId);
    
    if (isSaved) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApplyFilters = () => {
    // Filters are already applied by the useEffect hook
    setShowFilterSidebar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main sidebar */}
      <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-30">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">JobMatch</h1>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setShowSavedJobs(false)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${!showSavedJobs ? 'bg-indigo-50 text-indigo-700' : ''}`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Discover Jobs</span>
            </button>
            <button 
              onClick={() => setShowSavedJobs(true)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${showSavedJobs ? 'bg-indigo-50 text-indigo-700' : ''}`}
            >
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">Saved Jobs</span>
              {savedJobs.length > 0 && (
                <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                  {savedJobs.length}
                </span>
              )}
            </button>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Alex Johnson</p>
                <p className="text-sm text-gray-500">alex.j@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {showSavedJobs ? 'Saved Jobs' : 'Discover Jobs'}
              </h2>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                {!showSavedJobs && (
                  <button 
                    onClick={() => setShowFilterSidebar(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showSavedJobs ? (
            savedJobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.filter(job => savedJobs.includes(job.id)).map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onSelect={setSelectedJob} 
                    isSaved={true}
                    onToggleSave={toggleSaveJob}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Saved Jobs Yet</h3>
                <p className="text-gray-600 mb-6">Start saving jobs you're interested in to view them here.</p>
                <button 
                  onClick={() => setShowSavedJobs(false)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            )
          ) : (
            filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onSelect={setSelectedJob} 
                    isSaved={savedJobs.includes(job.id)}
                    onToggleSave={toggleSaveJob}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      categories: [],
                      tools: [],
                      skills: [],
                      minMatchScore: 0
                    });
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )
          )}
        </main>
      </div>

      {/* Filter sidebar */}
      {showFilterSidebar && (
        <div className="fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setShowFilterSidebar(false)}
          ></div>
          <div className="bg-white w-80 h-full ml-auto animate-slide-in-right p-6 overflow-y-auto">
            <FilterSidebar 
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </div>
      )}

      {/* Job details sidebar */}
      {selectedJob && (
        <JobDetailsSidebar 
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={toggleSaveJob}
        />
      )}
    </div>
  );
}
// Zod Schema
export const Schema = {
    "commentary": "I'm building a job search web app where users can filter and sort job listings by category, tools, and key skills. The interface will highlight ideal job matches, allow users to browse, save, or hide jobs, and display details for each job with an easy \"Apply\" action. There will be a sidebar for navigation between main sections like profile, history, messages, and discovery.",
    "template": "nextjs-developer",
    "title": "Job Search",
    "description": "A job search web app with filtering and sorting capabilities.",
    "additional_dependencies": [],
    "has_additional_dependencies": false,
    "install_dependencies_command": "",
    "port": 3000,
    "file_path": "pages/index.tsx",
    "code": "<see code above>"
}