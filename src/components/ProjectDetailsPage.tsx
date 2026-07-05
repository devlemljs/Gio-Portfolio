import React, { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Shield,
  Activity,
  CheckSquare,
  Package,
  BarChart2,
  FileText,
  Layout,
  Instagram,
  Facebook,
  MapPin,
  Sparkles,
  Share2,
  PlayCircle,
  TrendingUp,
  Search,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Award,
  Eye,
  Plus,
  Tv,
  CheckCircle2,
  FileSpreadsheet,
  Grid,
  Heart,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "motion/react";

const amazon = 'projects/amazon.webp';
const helium = 'projects/helium.webp';
const IP1 = 'projects/IP1.webp';
const IP2 = 'projects/IP2.webp';
const IP3 = 'projects/IP3.webp';
const IP4 = 'projects/IP4.webp';
const IP5 = 'projects/IP5.webp';
const IP6 = 'projects/IP6.webp';
const IP7 = 'projects/IP7.webp';

const imagePlannings = [IP1, IP2, IP3, IP4, IP5, IP6, IP7];

// Project 2 Placeholders
const tracker1 = 'projects/tracker1.webp';
const tracker2 = 'projects/tracker2.webp';

// Project 3 Placeholders
const design = 'projects/design.webp';
const social1 = 'projects/social1.webp';
const social2 = 'projects/social2.webp';
const social3 = 'projects/social3.webp';
const social4 = 'projects/social4.webp';
const socials = [social1, social2, social3, social4];

const poster1 = 'projects/poster1.webp';
const poster2 = 'projects/poster2.webp';
const poster3 = 'projects/poster3.webp';
const poster4 = 'projects/poster4.webp';
const posters = [poster1, poster2, poster3, poster4];

const signage1 = 'projects/signage1.webp';
const signage2 = 'projects/signage2.webp';
const signage3 = 'projects/signage3.webp';
const signage4 = 'projects/signage4.webp';
const signages = [signage1, signage2, signage3, signage4];

const merch1 = 'projects/merch1.webp';
const merch2 = 'projects/merch2.webp';
const merch3 = 'projects/merch3.webp';
const merch4 = 'projects/merch4.webp';
const merchandises = [merch1, merch2, merch3, merch4];

const logo1 = 'projects/logo1.webp';
const logo2 = 'projects/logo2.webp';
const logo3 = 'projects/logo3.webp';
const logos = [logo1, logo2, logo3];

const touchpoint = 'projects/touchpoint.webp';

const OptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  [key: string]: any;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      // Hero/above-the-fold images (priority=true) load eagerly with high
      // fetch priority so they don't get deprioritized behind other
      // requests, which is what was inflating LCP. Everything else stays
      // lazy since it's below the fold.
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      className={`${className || ""} transition-opacity duration-500 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      {...props}
    />
  );
};

interface ProjectDetailsPageProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetailsPage({
  projectId,
  onBack,
}: ProjectDetailsPageProps) {
  // Navigation helper to scroll top on load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Handle Project 1 (Efficient Amazon Listing Creation System) active tabs if any
  const [activeTabP1, setActiveTabP1] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-24 relative overflow-hidden">
      {/* Background organic stars and gradients */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] rounded-full bg-indigo-900/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* --- FLOATING HEADER FOR QUICK NAVIGATION --- */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            id="back-to-portfolio-header-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold font-mono text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 py-2 px-3.5 rounded-lg active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2"></div>
        </div>
      </header>

      {/* --- COMPONENT BODY CONTAINER --- */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-10 sm:pt-16 space-y-8">
        {/* PROJECT 1: AMAZON LISTING CREATION SYSTEM */}
        {projectId === "project-1" && (
          <div className="space-y-10">
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Efficient Amazon Listing Creation System
              </h1>
            </div>

            <div className="w-full bg-slate-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 relative">
              <OptimizedImage
                src={amazon}
                alt="Amazon Listing Creation System Overview"
                className="absolute inset-0 w-full h-full object-cover z-10"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <Layout size={48} className="text-indigo-400 mb-3 animate-pulse" />
                <p className="font-sans text-lg font-black text-slate-800 uppercase tracking-wider">Amazon System Overview</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-8 text-left">
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                I’ve summarized my featured project based on the workflow I
                built in my Efficient Amazon Listing Creation System. This breakdown
                reflects exactly how I handled each stage of the process to get
                this Resistance Bands Set ready for launch.
              </p>

              <h2 className="text-xl font-bold text-slate-900 border-b border-indigo-100 pb-2">
                My Project Workflow: Resistance Bands Set
              </h2>

              {/* Step 1: Product Research */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 1: Product Research 🧠
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I started by diving deep into the market. I analyzed
                  competitors priced between ₱499 – ₱650 and identified a solid
                  ₱300 margin per unit. By studying review insights, I found
                  that customers hated weak handles and snapping bands. I used
                  this data to define my Unique Selling Point (USP): superior
                  durability with natural latex and upgraded grips. I also
                  spotted a "Listing Gap"—competitors had terrible visuals—which
                  became my biggest opportunity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      🛍 Competitors
                    </h5>
                    <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                      <li>Product A – ₱499</li>
                      <li>Product B – ₱650</li>
                      <li>Product C – ₱550</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      💲 Pricing Range
                    </h5>
                    <p className="text-sm text-slate-700">₱499 – ₱650</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      💰 Profitability
                    </h5>
                    <p className="text-sm text-slate-700">
                      ₱500 selling – ₱200 estimated cost = ₱300 margin
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      📦 Size & Weight
                    </h5>
                    <p className="text-sm text-slate-700">
                      Lightweight, easy shipping, low storage space
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      ⭐ Review Insights
                    </h5>
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold text-slate-800">
                        Common Complaints:
                      </p>
                      <ol className="list-decimal list-inside mb-2">
                        <li>Weak resistance</li>
                        <li>Poor handles</li>
                      </ol>
                      <p className="font-semibold text-slate-800">
                        Common Praise:
                      </p>
                      <ol className="list-decimal list-inside">
                        <li>Affordable</li>
                        <li>Good for beginners</li>
                      </ol>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      📉 Competition
                    </h5>
                    <p className="text-sm text-slate-700">
                      High number of reviews, but many listings are poorly
                      optimized (weak content & visuals)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      🔎 Demand
                    </h5>
                    <p className="text-sm text-slate-700">
                      High search volume for: “resistance bands set”
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      🎯 UNIQUE SELLING POINT (USP)
                    </h5>
                    <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                      <li>Stronger resistance bands</li>
                      <li>Better grip handles</li>
                      <li>More durable materials</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">
                      🚫 Risks
                    </h5>
                    <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                      <li>Durability issues may lead to returns</li>
                      <li>High competition in fitness category</li>
                    </ol>
                  </div>
                  <div className="space-y-2 lg:col-span-3">
                    <h5 className="font-bold text-slate-900 text-sm">
                      📸 Listing Gaps (BIG OPPORTUNITY)
                    </h5>
                    <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                      <li>Poor quality images</li>
                      <li>Unclear product benefits</li>
                      <li>Weak or generic descriptions</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 2: Keyword Research */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 2: Keyword Research 🔍
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I didn't just guess what buyers want; I pulled the data. I
                  identified high-volume terms like "resistance bands set" and
                  combined them with specific long-tail keywords such as
                  "resistance bands for home workout." I compiled a Top list and
                  a broader set of niche keywords (like "rehab" and "physical
                  therapy") to ensure the listing captures maximum traffic
                  across different customer needs.
                </p>
                <div className="w-full bg-slate-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 relative">
                  <OptimizedImage
                    src={helium}
                    alt="Helium 10 Keyword Research & SEO"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                    <Search size={48} className="text-indigo-400 mb-3 animate-pulse" />
                    <p className="font-sans text-lg font-black text-slate-800 uppercase tracking-wider">Helium 10 &amp; SEO Tools</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-8 md:gap-16 text-sm mb-8 w-full">
                  <div className="text-center">
                    <h5 className="font-bold text-slate-900 mb-2">
                      Main Keywords:
                    </h5>
                    <ol className="list-inside text-slate-700 space-y-1 inline-block text-left">
                      <li>1. resistance bands set</li>
                      <li>2. workout bands</li>
                      <li>3. exercise bands</li>
                    </ol>
                  </div>
                  <div className="text-center">
                    <h5 className="font-bold text-slate-900 mb-2">
                      Long-tail Keywords:
                    </h5>
                    <ol className="list-inside text-slate-700 space-y-1 inline-block text-left">
                      <li>1. resistance bands for home workout</li>
                      <li>2. resistance bands for beginners</li>
                    </ol>
                  </div>
                </div>

                <div className="text-sm">
                  <h5 className="font-bold text-slate-900 mb-4 text-center md:text-left">
                    Top Keywords:
                  </h5>
                  <ol className="list-decimal list-inside text-slate-700 columns-1 sm:columns-2 md:columns-4 gap-x-4 space-y-1 text-xs md:text-sm">
                    <li>resistance bands set</li>
                    <li>resistance bands for workout</li>
                    <li>fitness resistance bands</li>
                    <li>exercise bands with handles</li>
                    <li>stackable resistance bands</li>
                    <li>workout resistance bands set</li>
                    <li>home gym resistance bands</li>
                    <li>home gym equipment set</li>
                    <li>strength training resistance bands</li>
                    <li>resistance bands for men</li>
                    <li>resistance bands for women</li>
                    <li>resistance bands for home workout</li>
                    <li>resistance bands for weight training</li>
                    <li>resistance bands with door anchor</li>
                    <li>resistance bands with ankle straps</li>
                    <li>portable home gym bands</li>
                    <li>full body workout bands</li>
                    <li>resistance bands for yoga</li>
                    <li>resistance bands for physical therapy</li>
                    <li>rehab resistance bands set</li>
                    <li>elastic resistance bands</li>
                    <li>durable resistance bands set</li>
                    <li>multi level resistance bands</li>
                    <li>adjustable resistance bands</li>
                    <li>training bands set</li>
                    <li>exercise equipment for home gym</li>
                    <li>compact gym equipment</li>
                    <li>all in one workout bands</li>
                  </ol>
                </div>
              </div>

              {/* Step 3: Listing Draft */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 3: Listing Draft ✍️
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I wrote the copy to be both SEO-friendly and persuasive.
                  <br />• <strong>Title:</strong> I packed it with high-value
                  keywords while keeping it readable.
                  <br />• <strong>Bullet Points:</strong> I focused on
                  benefits—highlighting that it's a "full body workout" and
                  "stackable up to 150 lbs."
                  <br />• <strong>Description:</strong> I kept the tone
                  professional and motivating, positioning the set as a "simple,
                  effective, and proven" alternative to expensive gyms.
                </p>

                <div className="bg-slate-50 p-6 rounded-xl space-y-6 border border-slate-200">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm mb-1">
                      Title:
                    </h5>
                    <p className="text-sm text-indigo-900 font-medium">
                      Resistance Bands Set for Workout & Fitness – 5 Stackable
                      Exercise Bands with Handles, Door Anchor & Ankle Straps –
                      Home Gym Equipment for Men & Women, Strength Training,
                      Yoga & Physical Therapy
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm mb-2">
                      Bullet Points:
                    </h5>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li>
                        <strong>✔️ FULL BODY WORKOUT ANYTIME, ANYWHERE</strong>
                        <br />
                        Train at home, office, or outdoors. Perfect for strength
                        training, weight loss, stretching, and rehab.
                      </li>
                      <li>
                        <strong>✔️ 5 LEVELS OF RESISTANCE (STACKABLE)</strong>
                        <br />
                        Customize your workout from beginner to advanced.
                        Combine bands for up to 150 lbs of resistance.
                      </li>
                      <li>
                        <strong>✔️ COMPLETE SET – READY TO USE</strong>
                        <br />
                        Includes 5 bands, 2 cushioned handles, 2 ankle straps, 1
                        door anchor, and a carrying bag.
                      </li>
                      <li>
                        <strong>✔️ STRONG, DURABLE & SAFE MATERIAL</strong>
                        <br />
                        Made from high-quality natural latex—elastic,
                        long-lasting, and built for daily use.
                      </li>
                      <li>
                        <strong>✔️ IDEAL FOR ALL FITNESS LEVELS</strong>
                        <br />
                        Whether you’re a beginner or experienced, this set helps
                        improve strength, flexibility, and mobility.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm mb-2">
                      Description:
                    </h5>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p>
                        Take your training back to basics—the way it’s always
                        worked.
                      </p>
                      <p>
                        This Resistance Bands Set is built for people who want
                        real results without expensive gym memberships. Whether
                        you're building muscle, recovering from injury, or
                        staying active, this set gives you the flexibility to
                        train your way.
                      </p>
                      <p>
                        Each band is designed with durable natural latex,
                        providing smooth resistance that mimics real weights
                        without putting stress on your joints. Stack them
                        together to increase intensity or use them individually
                        for lighter workouts.
                      </p>
                      <p>
                        With the included handles, ankle straps, and door
                        anchor, you can perform a full range of exercises—from
                        chest presses and squats to glute kickbacks and arm
                        curls.
                      </p>
                      <p>
                        Simple. Effective. Proven.
                        <br />
                        No excuses—just results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Image Planning */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 4: Image Planning 🎨
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I storyboarded a 7-image gallery to sell the product visually.
                  I planned a professional "Hero" shot of the 11-piece set,
                  followed by lifestyle action shots (chest presses and glute
                  kickbacks) to show versatility. I also designed an infographic
                  to explain the resistance levels and a "What's in the Box"
                  image to set clear expectations and reduce returns.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePlannings.map((src, i) => (
                    <div
                      key={i}
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200 relative group"
                    >
                      <OptimizedImage
                        src={src}
                        alt={`Image Planning ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          IP {i + 1}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 mt-0.5 truncate max-w-full px-1">
                          Image Planning {i + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 5: Upload & Optimization */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 5: Upload & Optimization 📤
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  To wrap it up, I went through my final checklist. I placed the
                  product in the Sports & Outdoors category and mapped out my
                  "Backend Keywords"—the hidden SEO terms that help with ranking
                  behind the scenes. I did a final sweep to ensure the title was
                  clear, the bullets were benefit-driven, and every image
                  perfectly matched the product features.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900">
                  Project Status (As shown in my Portfolio)
                </h4>
                <p className="text-sm text-slate-700">
                  As you can see in my Efficient Amazon Listing Creation System board,
                  this project has successfully moved through every column—from
                  initial Product Research to Upload & Optimization. The
                  Resistance Bands Set is now marked as Completed, serving as a
                  live example of my end-to-end listing management process.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 py-3 px-6 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>BACK TO PORTFOLIO CENTRAL</span>
              </button>
            </div>
          </div>
        )}

        {/* PROJECT 2: AUTOMATED MERCHANDISE INVENTORY TRACKER */}
        {projectId === "project-2" && (
          <div className="space-y-16">
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AUTOMATED MERCHANDISE INVENTORY TRACKER
              </h1>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 relative">
                <OptimizedImage
                  src={tracker1}
                  alt="Automated Merchandise Inventory Tracker System"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                  <FileSpreadsheet size={48} className="text-indigo-400 mb-3 animate-pulse" />
                  <p className="font-sans text-lg font-black text-slate-800 uppercase tracking-wider">Inventory System Overview</p>
                </div>
              </div>
              <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 relative">
                <OptimizedImage
                  src={tracker2}
                  alt="Inventory Stock Movement & Analysis"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                  <BarChart2 size={48} className="text-indigo-400 mb-3 animate-pulse" />
                  <p className="font-sans text-lg font-black text-slate-800 uppercase tracking-wider">Stock &amp; SRP Movement Log</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-10 text-left">
              <h2 className="text-xl font-bold text-slate-900 border-b border-indigo-100 pb-2">
                My Project Workflow: Automated Merchandise Inventory Tracker
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                In this project, I developed a real-time inventory monitoring
                system to track department merchandise and marketing
                collaterals. My goal was to streamline coordination between our
                marketing and showroom teams while ensuring we never faced
                shortages during critical promotions.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">
                  1. Building a Structured Digital Warehouse
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I started by moving away from messy lists and creating a
                  professional, structured database.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Categorization & Architecture:</strong> I organized
                    every item—from GMC umbrellas to MG-branded caps—by brand,
                    item type, and specific description.
                  </li>
                  <li>
                    <strong>Geographic Mapping:</strong> I assigned clear
                    storage locations (like "3F Marketing," "2F Archives," or
                    "CMD Showroom") so that finding an item is now a matter of
                    checking a screen rather than searching through boxes.
                  </li>
                </ul>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Implementing Real-Time Monitoring & Automation
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  To make the system work for me, I built in features that track
                  stock levels and pricing automatically.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Live Stock & SRP Tracking:</strong> I centralized
                    our Suggested Retail Prices and current "On Hand Stocks."
                    Whether it was silver keychains or EV-branded T-shirts, the
                    data is always live.
                  </li>
                  <li>
                    <strong>Visual Alert System:</strong> I used automated
                    visual cues (red highlighting) for "Out of Stock" or "Low
                    Stock" items. This acts as a built-in alarm, allowing me to
                    spot potential shortages in seconds before they disrupt our
                    events.
                  </li>
                </ul>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Streamlining Team Coordination & Reporting
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  The final step was ensuring this data served the entire
                  department effectively.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Showroom Integration:</strong> I added a "Remarks"
                    section to track the movement of specific samples. If a unit
                    is pulled for a display at the ASF or CMD showroom, it’s
                    recorded immediately, bridging the gap between our office
                    and retail floors.
                  </li>
                  <li>
                    <strong>Holistic Data Management:</strong> I structured the
                    workbook into specialized tabs like "Merchandise Movement"
                    and "Collateral Monitoring," providing a high-level summary
                    of our inventory health for the entire year.
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-8">
                <h4 className="font-bold text-slate-900">Project Status</h4>
                <p className="text-sm text-slate-700">
                  This tracker is currently fully operational and serves as the
                  primary tool for maintaining department organization,
                  preventing stockouts, and ensuring high-efficiency operations
                  during marketing launches.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 py-3 px-6 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>BACK TO PORTFOLIO CENTRAL</span>
              </button>
            </div>
          </div>
        )}

        {/* PROJECT 3: ALL-IN-ONE BRAND DESIGN & MARKETING */}
        {projectId === "project-3" && (
          <div className="space-y-16">
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                ALL-IN-ONE BRAND DESIGN & MARKETING
              </h1>
            </div>

            <div className="w-full bg-slate-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 relative">
              <OptimizedImage
                src={design}
                alt="All-in-One Brand Design & Marketing Overview"
                className="absolute inset-0 w-full h-full object-cover z-10"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <Layers size={48} className="text-indigo-400 mb-3 animate-pulse" />
                <p className="font-sans text-lg font-black text-slate-800 uppercase tracking-wider">Brand Design Overview</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-12 text-left">
              <h2 className="text-xl font-bold text-slate-900 border-b border-indigo-100 pb-2">
                My Project Workflow: Integrated Brand Management
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                In this project, I created a consistent visual identity that
                works across both digital platforms and physical stores. My goal
                was to ensure the brand looked professional and trustworthy at
                every single touchpoint.
              </p>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">
                  1. Driving Online Sales through Digital Strategy
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I started by building a high-impact digital presence designed
                  to convert.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Facebook Page Management:</strong> I am the lead for
                    the Hino Cebu Official page, where I manage day-to-day
                    content, engagement, and brand storytelling.
                  </li>
                  <li>
                    <strong>High-Quality Digital Assets:</strong> I designed
                    e-commerce-ready graphics and social posts for key events,
                    such as the Labor Day post, Hino Dropside Facebook posts and
                    seasonal content like the Valentine's Menu and Mother's Day
                    ads.
                  </li>
                  <li>
                    <strong>Strategic Content Tools:</strong> I created
                    promotional videos like HINO REELS and the Fun Run Video to
                    maintain a dynamic and modern online persona.
                  </li>
                </ul>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {socials.map((src, i) => (
                    <a
                      key={i}
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={src}
                        alt={`Social Design ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <Facebook size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Social {i + 1}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Supporting the Physical Customer Experience
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  To ensure the brand felt just as professional in person, I
                  developed a wide range of showroom and retail assets.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Professional Showroom Displays:</strong> I designed
                    large-format visuals to guide customers, including the
                    Captiva Specs Stand, the Global One Pull-up Banner, and
                    various billboard layouts like the G50 PLUS and Chevy
                    billboards.
                  </li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column: Stacked Landscape Posters 1 and 2 */}
                  <div className="flex flex-col gap-4 md:h-full">
                    <a
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-[3/2] md:aspect-auto md:flex-1 md:min-h-0 flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={poster1}
                        alt="Poster 1"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Poster 1
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>

                    <a
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-[3/2] md:aspect-auto md:flex-1 md:min-h-0 flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={poster2}
                        alt="Poster 2"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Poster 2
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Middle Column: Portrait Poster 3 */}
                  <a
                    href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 rounded-xl overflow-hidden aspect-[2/3] flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <OptimizedImage
                      src={poster3}
                      alt="Poster 3"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                      <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                      <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                        Poster 3
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={24} className="text-white mb-2" />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <span className="font-mono text-[10px] text-indigo-200 mt-1">
                        Open in Google Drive
                      </span>
                    </div>
                  </a>

                  {/* Right Column: Portrait Poster 4 */}
                  <a
                    href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 rounded-xl overflow-hidden aspect-[2/3] flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <OptimizedImage
                      src={poster4}
                      alt="Poster 4"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                      <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                      <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                        Poster 4
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={24} className="text-white mb-2" />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <span className="font-mono text-[10px] text-indigo-200 mt-1">
                        Open in Google Drive
                      </span>
                    </div>
                  </a>
                </div>

                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 mt-6">
                  <li>
                    <strong>Mall & Retail Signage:</strong> I created
                    high-visibility retail signage for events, such as the Side
                    Walk Sale Poster, Piso Deal flyers, and specialized store
                    signage like Authorized Personnel Only and Danger safety
                    signs.
                  </li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column: Portrait Signage 1 */}
                  <a
                    href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 rounded-xl overflow-hidden aspect-[2/3] flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <OptimizedImage
                      src={signage1}
                      alt="Signage 1"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                      <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                      <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                        Signage 1
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={24} className="text-white mb-2" />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <span className="font-mono text-[10px] text-indigo-200 mt-1">
                        Open in Google Drive
                      </span>
                    </div>
                  </a>

                  {/* Middle Column: Portrait Signage 2 */}
                  <a
                    href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 rounded-xl overflow-hidden aspect-[2/3] flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <OptimizedImage
                      src={signage2}
                      alt="Signage 2"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                      <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                      <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                        Signage 2
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={24} className="text-white mb-2" />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <span className="font-mono text-[10px] text-indigo-200 mt-1">
                        Open in Google Drive
                      </span>
                    </div>
                  </a>

                  {/* Right Column: Stacked Landscape Signages 3 and 4 */}
                  <div className="flex flex-col gap-4 md:h-full">
                    <a
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-[3/2] md:aspect-auto md:flex-1 md:min-h-0 flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={signage3}
                        alt="Signage 3"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Signage 3
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>

                    <a
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-[3/2] md:aspect-auto md:flex-1 md:min-h-0 flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={signage4}
                        alt="Signage 4"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Signage 4
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mt-6 mt-6">
                  <strong>Print & Merchandising:</strong> I handled all the
                  tangible touchpoints, from the Brochure Front/Back to custom
                  T-Shirt designs, Suki Cards (loyalty cards), and even Birthday
                  Tarp Designs for internal/client celebrations.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {merchandises.map((src, i) => (
                    <a
                      key={i}
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={src}
                        alt={`Merch ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <ImageIcon size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Merch {i + 1}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Unifying the Brand Identity for Trust
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  The final—and most important—step was ensuring that our online
                  visuals matched our in-store branding perfectly.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Visual Consistency:</strong> By matching the logos
                    (like the Force Logo or Barangay Sabang enhancements) and
                    the color schemes across our Facebook page and our physical
                    posters, I created a seamless brand world.
                  </li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {logos.map((src, i) => (
                    <a
                      key={i}
                      href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                      <OptimizedImage
                        src={src}
                        alt={`Logo Design ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                        <Award size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                        <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                          Logo {i + 1}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={24} className="text-white mb-2" />
                        <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                          View Project
                        </span>
                        <span className="font-mono text-[10px] text-indigo-200 mt-1">
                          Open in Google Drive
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 mt-6">
                  <li>
                    <strong>Trust at Every Touchpoint:</strong> Whether a
                    customer first saw a New Release Post on the Hino Cebu page
                    or when walking past our showroom billboards, the identity
                    remained identical. This professional alignment builds
                    immediate credibility and ensures the customer feels they
                    are dealing with a top-tier brand, no matter where they find
                    us.
                  </li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="https://drive.google.com/drive/folders/1jdvOln3D26fgyyZglPBbrFK4_U-KNfhS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200 sm:col-start-2 relative group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <OptimizedImage
                      src={touchpoint}
                      alt="Final Brand Touchpoint"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
                      <Sparkles size={24} className="text-indigo-400 mb-1.5 animate-pulse" />
                      <span className="font-sans text-xs font-black text-slate-850 uppercase tracking-wider">
                        Touchpoint
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/85 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={24} className="text-white mb-2" />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <span className="font-mono text-[10px] text-indigo-200 mt-1">
                        Open in Google Drive
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-8">
                <h4 className="font-bold text-slate-900">Project Status</h4>
                <p className="text-sm text-slate-700">
                  These projects serve as a complete demonstration of my ability
                  to manage a brand's total identity—bridging the gap between
                  digital marketing and real-world retail operations.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 py-3 px-6 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>BACK TO PORTFOLIO CENTRAL</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}