'use client';

import { Heart, Users, Globe, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UrgentCampaign } from "@/components/campaigns/urgentCampaign";
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
      
      <Navbar />
      
      <main className="container mx-auto px-4 relative z-10">
        {/* Hero Section - Redesigned */}
        <section className="py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 backdrop-blur-md bg-white/30 p-10 rounded-[2rem] shadow-xl border border-white/40 transform hover:scale-[1.02] transition duration-500">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
              Empower Change
            </h1>
            <p className="text-xl text-purple-800 mb-8 leading-relaxed">
              Join our community of givers and make a lasting impact on lives
              around the world.
            </p>
            <Link
              href="/campaign"
              className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-pink-300/30 transition-all duration-300"
            >
              Start Giving Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[2rem] transform rotate-2 opacity-80"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-[2rem] transform -rotate-2 opacity-60"></div>
              <Image
                src="/pamoja1.jpeg"
                alt="People helping each other"
                width={600}
                height={450}
                className="rounded-[2rem] shadow-2xl relative z-10 object-cover w-full"
              />
            </div>
          </div>
        </section>

        {/* Statistics - Moved Up */}
        <section className="my-20 backdrop-blur-md bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-tl from-blue-200 to-purple-200 opacity-70"></div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-purple-900">10+</h2>
              <p className="text-xl text-purple-700">Generous Souls</p>
            </div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-pink-600">100%</h2>
              <p className="text-xl text-purple-700">Transparency</p>
            </div>
            
            <div className="text-center relative z-10 transform hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold mb-2 text-blue-600">24/7</h2>
              <p className="text-xl text-purple-700">Support</p>
            </div>
          </div>
        </section>

        {/* Features - Redesigned */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-pink-100/50 hover:to-purple-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Immediate Impact
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Your generosity creates instant positive change in someone&apos;s
                life.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-blue-100/50 hover:to-purple-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Community Power
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Unite with others to amplify your impact and reach.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 group hover:bg-gradient-to-br hover:from-purple-100/50 hover:to-blue-100/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-purple-200 to-purple-100 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">
                Global Reach
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Support causes and individuals across the world.
              </p>
            </div>
          </div>
        </section>

        {/* Urgent campaigns - Redesigned */}
        <section className="mb-20">
          <div className="relative">
            <div className="relative -inset-1 bg-gradient-to-r from-blue-200 to-pink-200 rounded-[2rem] blur-sm"></div>
            <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-[2rem] border border-white/40 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                Urgent Campaigns
              </h2>
              <UrgentCampaign />
            </div>
          </div>
        </section>

        {/* FAQ Section - Redesigned */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>What Is An Urgent Campaign?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  An urgent campaign is one that is close to its deadline and has not yet met its target amount. These campaigns need immediate attention and support.
                </p>
              </div>
            </details>
            
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>How Will My Donation Be Used?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  Your donation goes directly to the campaign you choose, helping to fulfill the specific needs outlined in the campaign description.
                </p>
              </div>
            </details>
            
            <details className="group backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden">
              <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                <span>How Can I Set Up A Campaign?</span>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-purple-700">
                <p className="leading-relaxed">
                  Visit the "How It Works" page and follow the instructions. Once your address is verified, you'll be permitted to create a campaign and start raising funds.
                </p>
              </div>
            </details>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="mb-20">
          <div className="backdrop-blur-md bg-gradient-to-r from-pink-100/40 to-purple-100/40 p-10 rounded-[2rem] shadow-xl border border-white/40 text-center">
            <h2 className="text-3xl font-bold mb-4 text-purple-900">Ready to Make a Difference?</h2>
            <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">Join our community today and be part of something bigger than yourself.</p>
            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-pink-300/30 transition-all duration-300 transform hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/20 border-t border-white/30 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-purple-700">
          <p>© 2025 Pamoja. Making a difference together.</p>
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
      `}</style>
    </div>
  );
}