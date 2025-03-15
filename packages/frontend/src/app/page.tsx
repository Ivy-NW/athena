'use client';

import { Heart, Users, Globe, ChevronDown, ArrowRight, BookOpen, Award, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UrgentCampaign } from "@/components/campaigns/urgentCampaign";
import EduAssistant from "@/components/edu-assistant";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f2ff] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white to-blue-100 opacity-90"></div>
        <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-gradient-to-tl from-blue-300 to-blue-200 opacity-90"></div>
        <div className="absolute top-[10%] right-[20%] w-[200px] h-[100px] rounded-[60%] bg-gradient-to-bl from-purple-300 to-purple-200 opacity-90 transform rotate-45"></div>
        <div className="absolute bottom-[30%] left-[25%] w-[80px] h-[80px] rounded-full bg-gradient-to-r from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[120px] h-[120px] rounded-full bg-gradient-to-l from-blue-200 to-purple-100 opacity-90"></div>
        <div className="absolute top-[5%] left-[10%] w-[150px] h-[100px] rounded-[40%_60%_60%_40%] bg-gradient-to-r from-purple-200 to-blue-200 opacity-90 transform rotate-12"></div>
        <div className="absolute bottom-[10%] left-[40%] w-[180px] h-[90px] rounded-[60%_40%_50%_50%] bg-gradient-to-tr from-pink-200 to-purple-200 opacity-90 transform -rotate-15"></div>
      </div>
      <EduAssistant />
      
      <Navbar />
      
      <main className="container mx-auto px-4 relative z-10">
      {/* Hero Section - With Swirly 3D Effect */}
      <section className="py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 backdrop-blur-md bg-white/30 p-10 rounded-[2rem] shadow-xl border border-white/40 transform hover:scale-[1.02] transition duration-500">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
            Fund Your Future
          </h1>
          <p className="text-xl text-purple-800 mb-8 leading-relaxed">
            Connect with sponsors to finance your education and achieve your academic dreams.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/campaign"
              className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-pink-300/30 transition-all duration-300"
            >
              Create Scholarship Campaign
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="group flex items-center gap-2 bg-white/50 text-purple-700 border border-purple-200 px-6 py-3 rounded-full text-lg font-medium hover:bg-white/80 transition-all duration-300"
            >
              How It Works
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="swirly-container">
            <div className="swirly-effect">
              <div className="swirly-spiral"></div>
            </div>
            
            {/* Stats Floating Near Swirl */}
            <div className="stat-bubble stat-1">
              <div className="stat-value">95%</div>
              <div className="stat-label">Funding Success</div>
            </div>
            
            <div className="stat-bubble stat-2">
              <div className="stat-value">30%</div>
              <div className="stat-label">Higher Finding Sponsors</div>
            </div>
            
            <div className="stat-bubble stat-3">
              <div className="stat-value">10k+</div>
              <div className="stat-label">Students Funded</div>
            </div>
          </div>
        </div>
      </section>

        {/* Quick Search Section */}
        <section className="mb-16 backdrop-blur-md bg-white/40 p-8 rounded-[2rem] shadow-xl border border-white/40">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-900">Find Opportunities Quickly</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex-1 max-w-xs">
              <div className="bg-white/70 rounded-xl p-4 text-center hover:bg-white/90 transition-all cursor-pointer shadow-md">
                <BookOpen className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">Undergraduate</p>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="bg-white/70 rounded-xl p-4 text-center hover:bg-white/90 transition-all cursor-pointer shadow-md">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">Graduate</p>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="bg-white/70 rounded-xl p-4 text-center hover:bg-white/90 transition-all cursor-pointer shadow-md">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">International</p>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="bg-white/70 rounded-xl p-4 text-center hover:bg-white/90 transition-all cursor-pointer shadow-md">
                <Search className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">All Opportunities</p>
              </div>
            </div>
          </div>
        </section>

                {/* Urgent campaigns */}
                <section className="mb-20">
          <div className="relative">
            <div className="relative -inset-1 bg-gradient-to-r from-blue-200 to-pink-200 rounded-[2rem] blur-sm"></div>
            <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-[2rem] border border-white/40 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                Deadline Approaching
              </h2>
              <UrgentCampaign />
              <div className="text-center mt-8">
                <Link href="/campaign" className="text-purple-900 font-medium bg-gradient-to-br from-white/80 to-purple-100/50 rounded-xl py-3 px-4 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] border border-purple-100/50 hover:border-pink-200/70 hover:text-pink-600 hover:bg-gradient-to-br hover:from-white/90 hover:to-pink-100/50 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)] transition-all duration-300">
                  View All Opportunities
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="my-20 backdrop-blur-md bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200 to-purple-200 opacity-70"></div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-purple-900">500+</h2>
              <p className="text-xl text-purple-700">Scholarships</p>
            </div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-pink-600">$2M+</h2>
              <p className="text-xl text-purple-700">Funding Awarded</p>
            </div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-blue-600">1000+</h2>
              <p className="text-xl text-purple-700">Students Helped</p>
            </div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-purple-600">50+</h2>
              <p className="text-xl text-purple-700">Partner Institutions</p>
            </div>
          </div>
        </section>

        {/* Featured Opportunities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Featured Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-pink-100/50 hover:to-purple-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Merit Scholarships
              </h3>
              <p className="text-purple-700 leading-relaxed mb-4">
                Rewards for academic excellence and outstanding achievements.
              </p>
              <Link href="/merit-scholarships" className="text-pink-600 font-medium hover:underline">Learn more →</Link>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-blue-100/50 hover:to-purple-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Need-Based Aid
              </h3>
              <p className="text-purple-700 leading-relaxed mb-4">
                Financial assistance based on demonstrated financial need.
              </p>
              <Link href="/need-based-aid" className="text-blue-600 font-medium hover:underline">Learn more →</Link>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-purple-100/50 hover:to-blue-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-purple-200 to-purple-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Study Abroad Grants
              </h3>
              <p className="text-purple-700 leading-relaxed mb-4">
                Funding for international educational experiences.
              </p>
              <Link href="/study-abroad" className="text-purple-600 font-medium hover:underline">Learn more →</Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/70">
                <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-900">Sarah J.</h3>
                <p className="text-purple-700 italic mb-3">"The STEM Excellence Scholarship allowed me to focus on my studies without financial worry. Now I'm working as a research scientist!"</p>
                <p className="text-sm text-purple-600">Computer Science, Class of 2024</p>
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/70">
                <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-300"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-900">Michael T.</h3>
                <p className="text-purple-700 italic mb-3">"The International Student Grant made my dream of studying abroad possible. The experience changed my life forever."</p>
                <p className="text-sm text-purple-600">Business Administration, Class of 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-4 text-purple-900 mt-4">Create Your Profile</h3>
              <p className="text-purple-700">Sign up and build your academic profile with your achievements, goals, and financial needs.</p>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-4 text-purple-900 mt-4">Discover Opportunities</h3>
              <p className="text-purple-700">Browse scholarships, grants, and sponsorships that match your profile and interests.</p>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-4 text-purple-900 mt-4">Apply & Get Funded</h3>
              <p className="text-purple-700">Submit applications through our streamlined process and receive funding directly to your educational institution.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>What types of funding are available?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  We offer various types of educational funding including merit-based scholarships, need-based financial aid, research grants, study abroad funding, and corporate sponsorships.
                </p>
              </div>
            </details>
            
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>How do I qualify for scholarships?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  Qualification criteria vary by opportunity. Most scholarships consider academic achievement, financial need, field of study, and personal background. Our matching system will help you find opportunities you're eligible for.
                </p>
              </div>
            </details>
            
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>Is there a fee to apply?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  No, our platform is completely free for students. We're committed to making education more accessible by connecting you with funding opportunities without any additional costs.
                </p>
              </div>
            </details>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="mb-20">
          <div className="backdrop-blur-md bg-gradient-to-r from-pink-100/40 to-purple-100/40 p-10 rounded-[2rem] shadow-xl border border-white/40 text-center">
            <h2 className="text-3xl font-bold mb-4 text-purple-900">Stay Updated</h2>
            <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">Get notified about new scholarships and funding opportunities that match your profile.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-pink-300/30 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/20 border-t border-white/30 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-purple-900 mb-4">About Us</h3>
              <ul className="space-y-2 text-purple-700">
                <li><Link href="/about" className="hover:text-purple-900">Our Mission</Link></li>
                <li><Link href="/team" className="hover:text-purple-900">Team</Link></li>
                <li><Link href="/partners" className="hover:text-purple-900">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-900 mb-4">For Students</h3>
              <ul className="space-y-2 text-purple-700">
                <li><Link href="/scholarships" className="hover:text-purple-900">Find Scholarships</Link></li>
                <li><Link href="/resources" className="hover:text-purple-900">Resources</Link></li>
                <li><Link href="/success-stories" className="hover:text-purple-900">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-900 mb-4">For Sponsors</h3>
              <ul className="space-y-2 text-purple-700">
                <li><Link href="/create-scholarship" className="hover:text-purple-900">Create a Scholarship</Link></li>
                <li><Link href="/sponsor-benefits" className="hover:text-purple-900">Benefits</Link></li>
                <li><Link href="/sponsor-faq" className="hover:text-purple-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-900 mb-4">Connect</h3>
              <ul className="space-y-2 text-purple-700">
                <li><Link href="/contact" className="hover:text-purple-900">Contact Us</Link></li>
                <li><Link href="/support" className="hover:text-purple-900">Support</Link></li>
                <li><Link href="/blog" className="hover:text-purple-900">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-purple-700 border-t border-purple-100/30 pt-6">
            <p>© 2025 Athena. Empowering education through accessible funding.</p>
          </div>
        </div>
      </footer>
      
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-reverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .absolute {
          animation: float 8s ease-in-out infinite;
        }
        
        .absolute:nth-child(2n) {
          animation: float-reverse 9s ease-in-out infinite;
        }
        
        .absolute:nth-child(3n) {
          animation: float 10s ease-in-out infinite;
        }
        
        .absolute:nth-child(4n) {
          animation: float-reverse 11s ease-in-out infinite;
        }
        
        /* Hover effects */
        .rounded-[2rem] {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .rounded-[2rem]:hover {
          box-shadow: 0 10px 30px -5px rgba(156, 39, 176, 0.2);
        }
        /* Swirly 3D Effect */
  .swirly-container {
    position: relative;
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }
  
  .swirly-effect {
    position: relative;
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    animation: rotate-swirl 20s linear infinite;
  }
  
  @keyframes rotate-swirl {
    0% {
      transform: rotateY(0deg) rotateX(20deg);
    }
    100% {
      transform: rotateY(360deg) rotateX(20deg);
    }
  }
  
  .swirly-spiral {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }
  
  .swirly-spiral::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      rgba(233, 30, 99, 0.8) 20%,
      rgba(156, 39, 176, 0.8) 40%,
      rgba(63, 81, 181, 0.8) 60%,
      rgba(33, 150, 243, 0.8) 80%,
      transparent 100%
    );
    border-radius: 50%;
    animation: pulse-glow 4s ease-in-out infinite;
    filter: blur(8px);
  }
  
  /* Create the 3D spiral effect with multiple elements */
  ${[...Array(20)].map((_, i) => {
    const rotation = i * 18; // 360 / 20 = 18 degrees per segment
    const translateZ = i * 5 - 50; // Vary the Z position
    const scale = 1 - (i * 0.03); // Gradually reduce size
    const opacity = 1 - (i * 0.04); // Gradually reduce opacity
    
    return `
      .swirly-spiral::after:nth-of-type(${i + 1}) {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(233, 30, 99, ${opacity}),
          rgba(156, 39, 176, ${opacity}),
          rgba(63, 81, 181, ${opacity}),
          rgba(33, 150, 243, ${opacity})
        );
        border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
        transform: rotateZ(${rotation}deg) translateZ(${translateZ}px) scale(${scale});
        filter: blur(3px);
        animation: morph-shape 8s ease-in-out infinite;
        animation-delay: ${i * 0.2}s;
      }
    `;
  }).join('')}
  
  /* Create the actual 3D spiral with individual elements */
  ${[...Array(12)].map((_, i) => {
    const index = i + 1;
    const rotateY = i * 30; // 360 / 12 = 30 degrees per segment
    const translateZ = 20 + i * 15; // Increasing Z distance
    const delay = i * 0.5; // Staggered animation delay
    
    return `
      .swirly-spiral::before:nth-of-type(${index}) {
        content: '';
        position: absolute;
        width: ${90 - i * 5}%;
        height: ${90 - i * 5}%;
        top: ${i * 2.5}%;
        left: ${i * 2.5}%;
        background: linear-gradient(
          135deg,
          rgba(233, 30, 99, 0.8),
          rgba(156, 39, 176, 0.8),
          rgba(63, 81, 181, 0.8),
          rgba(33, 150, 243, 0.8)
        );
        border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
        transform: rotateY(${rotateY}deg) translateZ(${translateZ}px);
        filter: blur(${i * 0.5 + 1}px);
        opacity: ${1 - i * 0.07};
        animation: morph-shape 8s ease-in-out infinite;
        animation-delay: ${delay}s;
      }
    `;
  }).join('')}
  
  /* Create the actual spiral with div elements */
  .swirly-effect::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(233, 30, 99, 0.5) 20%,
      rgba(156, 39, 176, 0.5) 40%,
      rgba(63, 81, 181, 0.5) 60%,
      rgba(33, 150, 243, 0.5) 80%,
      transparent 100%
    );
    filter: blur(15px);
    opacity: 0.7;
    transform: translateZ(30px);
  }
  
  /* Add the actual 3D spiral elements */
  ${[...Array(8)].map((_, i) => `
    .swirly-effect .spiral-segment-${i + 1} {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
      background: linear-gradient(
        135deg,
        rgba(233, 30, 99, ${0.8 - i * 0.1}),
        rgba(156, 39, 176, ${0.8 - i * 0.1}),
        rgba(63, 81, 181, ${0.8 - i * 0.1}),
        rgba(33, 150, 243, ${0.8 - i * 0.1})
      );
      transform: rotateY(${i * 45}deg) translateZ(${20 + i * 15}px) scale(${1 - i * 0.1});
      filter: blur(${i * 0.5 + 2}px);
      animation: morph-shape 8s ease-in-out infinite;
      animation-delay: ${i * 0.5}s;
    }
  `).join('')}
  
  @keyframes morph-shape {
    0%, 100% {
      border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
    }
    25% {
      border-radius: 55% 45% 40% 60% / 50% 65% 35% 50%;
    }
    50% {
      border-radius: 65% 35% 50% 50% / 35% 60% 40% 65%;
    }
    75% {
      border-radius: 35% 65% 60% 40% / 60% 35% 65% 40%;
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.05);
    }
  }
  
  /* Stat Bubbles */
  .stat-bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
    z-index: 10;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-bubble:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 36px rgba(31, 38, 135, 0.3);
  }
  
  .stat-1 {
    top: 15%;
    left: 15%;
    animation: float 8s ease-in-out infinite;
  }
  
  .stat-2 {
    top: 60%;
    left: 20%;
    animation: float-reverse 9s ease-in-out infinite;
  }
  
  .stat-3 {
    top: 40%;
    right: 15%;
    animation: float 10s ease-in-out infinite;
  }
  
  .stat-value {
    font-size: 1.8rem;
    font-weight: bold;
    background: linear-gradient(to right, #e91e63, #9c27b0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #a78bfa;
    text-align: center;
  }
        
      `}</style>
    </div>
  );
}