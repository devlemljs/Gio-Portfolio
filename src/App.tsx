import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Mail,
  Phone,
  FileText,
  Download,
  Check,
  Sparkles,
  X,
  ArrowUpRight,
  LineChart,
  Layers,
  Palette,
  CheckSquare,
  ShoppingBag,
  Bot,
  Code2,
  ClipboardList,
  Award,
  CheckCircle2,
  Video,
  Laptop,
  Eye,
  Search,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  PERSONAL_INFO,
  STATISTICS,
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION,
  TOOLS_CATEGORIES,
  PROJECTS,
  STACK_ICONS,
  LANGUAGES,
  ROW1_LOGOS,
  ROW2_LOGOS,
  ROW3_LOGOS,
} from "./data";
import { Project } from "./types";
import Lightfall from "./components/Lightfall";
import ProjectDetailsPage from "./components/ProjectDetailsPage";

const profile = 'images/gio_profile.webp';
const facebook = "/tools/facebook.svg";
const instagram = "/tools/instagram.svg";
const linkedin = "/tools/linkedin.svg";

const page1 = 'files/Gio Anthony Sabucido Resume1.webp';
const page2 = 'files/Gio Anthony Sabucido Resume2.webp';
const page3 = 'files/Gio Anthony Sabucido Resume3.webp';
const resume = 'files/Gio Anthony Sabucido Resume.pdf';

const amazon = 'projects/amazon.webp';
const tracker = 'projects/tracker.webp';
const design = 'projects/design.webp';

const FadedGridBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Subtle grid lines - made more visible */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Dynamic fading black grid boxes */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.08]">
        {[...Array(12)].map((_, i) => {
          // Semi-random position and animation timing using index
          const colSpan = (i % 3) + 1;
          const rowSpan = ((i + 1) % 2) + 1;
          const startCol = (i * 2) % 6;
          const startRow = (i * 3 + 1) % 6;

          return (
            <motion.div
              key={i}
              className="bg-indigo-900/10 rounded-sm border border-indigo-500/10"
              style={{
                gridColumnStart: startCol + 1,
                gridColumnEnd: `span ${colSpan}`,
                gridRowStart: startRow + 1,
                gridRowEnd: `span ${rowSpan}`,
                margin: "2px",
              }}
              animate={{
                opacity: [0.12, 0.55, 0.12],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  // UI state
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  // CV modal states
  const [showCvModal, setShowCvModal] = useState<boolean>(false);
  const isCVModalOpen = showCvModal;
  const setIsCVModalOpen = (open: boolean) => {
    setShowCvModal(open);
    if (!open) {
      setCvZoom(isMobile ? 0.7 : 1.0);
    }
  };
  const isDarkMode = false;
  const [cvPage, setCvPage] = useState<number>(1);
  const [cvZoom, setCvZoom] = useState<number>(1.0); // 1.0 represents the standard fit visual layout (100% fits page)
  const [fitScale, setFitScale] = useState<number>(1.0);
  const zoomViewerRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (showCvModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCvModal]);

  // Auto-calculate zoom factor to perfectly fit standard A4 paper size inside the modal's available height / width
  useEffect(() => {
    if (!showCvModal) return;

    // Reset zoom back to the clean 100% standard fit when opening
    setCvZoom(isMobile ? 0.7 : 1.0);

    const calculateFitZoom = () => {
      if (zoomViewerRef.current) {
        const { clientWidth, clientHeight } = zoomViewerRef.current;
        // Padding for elegant aesthetic spacing
        const padding = 32;
        const availableWidth = clientWidth - padding;
        const availableHeight = clientHeight - padding;

        const scaleX = availableWidth / 595;
        const scaleY = availableHeight / 842;

        // Ideal scale to fit the whole page in 100% view without zooming in or showing double scroll bars
        const calculatedScale = Math.max(
          0.3,
          Math.min(1.2, Math.min(scaleX, scaleY)),
        );
        setFitScale(Number(calculatedScale.toFixed(2)));
      }
    };

    // Delay slightly to allow the modal element to fully render/transition
    const timer = setTimeout(calculateFitZoom, 100);

    window.addEventListener("resize", calculateFitZoom);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateFitZoom);
    };
  }, [showCvModal]);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Force Light mode and clear any previous theme setting
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  // Track isMobile and isLaptop for responsive central elements
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
      setIsLaptop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Track scrolling for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resume download trigger
  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerToast("📥 Starting download for Gio Anthony Sabucido Resume...");
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Gio Anthony Sabucido Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to trigger custom toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  // Realistic email submission using Google Apps Script
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      triggerToast("⚠️ Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);

    // TODO: Paste your Google Apps Script Web App URL here
    const appScriptUrl = ""; // Example: "https://script.google.com/macros/s/AKfyc.../exec"

    if (!appScriptUrl || appScriptUrl === "") {
      // Fallback if no URL is provided in .env (simulate success)
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        triggerToast(
          "✉️ Simulated message sent successfully! (No App Script URL configured)",
        );
      }, 1200);
      return;
    }

    try {
      // Using standard form-urlencoded to ensure App Script accepts the payload easily with no-cors
      const searchParams = new URLSearchParams();
      searchParams.append("name", formData.name);
      searchParams.append("email", formData.email);
      searchParams.append("message", formData.message);

      await fetch(appScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });

      // no-cors fetch doesn't return a readable response body/status, but if it doesn't throw we assume success
      setIsSubmitting(false);
      setSubmitSuccess(true);
      triggerToast("✉️ Message sent successfully to Google Sheets!");
    } catch (error) {
      setIsSubmitting(false);
      triggerToast("❌ Failed to send message. Please try again later.");
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setSubmitSuccess(false);
    setCopiedDraft(false);
  };

  // Copy sample draft email
  const copyFormattedDraft = () => {
    const text = `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    triggerToast("📋 Copied message payload format to clipboard!");
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  // Helper to look up simple color palette backgrounds for tool tags
  const getToolMetadata = (toolName: string) => {
    const matched = STACK_ICONS.find(
      (i) => i.name.toLowerCase() === toolName.toLowerCase(),
    );
    return (
      matched || {
        name: toolName,
        color: "text-slate-500 bg-slate-500/10 border-slate-500/15",
      }
    );
  };

  // Map tool name to specific lucide icons dynamically
  const renderToolIcon = (name: string, size = 16) => {
    const low = name.toLowerCase();
    if (low.includes("photoshop")) return <Layers size={size} />;
    if (low.includes("canva")) return <Palette size={size} />;
    if (low.includes("capcut") || low.includes("video"))
      return <Video size={size} />;
    if (low.includes("notion")) return <FileText size={size} />;
    if (low.includes("asana")) return <CheckSquare size={size} />;
    if (low.includes("amazon") || low.includes("central"))
      return <ShoppingBag size={size} />;
    if (low.includes("helium") || low.includes("10"))
      return <LineChart size={size} />;
    if (low.includes("chatgpt") || low.includes("claude"))
      return <Bot size={size} />;
    if (low.includes("gemini")) return <Sparkles size={size} />;
    if (low.includes("excel") || low.includes("sheets"))
      return <Code2 size={size} />;
    if (low.includes("word") || low.includes("document"))
      return <FileText size={size} />;
    if (low.includes("powerpoint") || low.includes("presentation"))
      return <Award size={size} />;
    return <Laptop size={size} />;
  };

  // Render sliding marquee row
  const renderMarqueeRow = (
    items: typeof ROW1_LOGOS,
    direction: "left" | "right",
  ) => {
    const animationClass =
      direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

    return (
      <div className="relative w-full overflow-hidden py-2 flex select-none">
        <div
          className={`flex gap-4 flex-nowrap shrink-0 min-w-full ${animationClass} hover:[animation-play-state:paused]`}
        >
          {/* First group of 7 */}
          {items.map((item, idx) => (
            <div
              key={`first-${item.id}-${idx}`}
              className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              {item.imgSrc ? (
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center h-full w-full">
                  <span className="text-slate-400 group-hover:text-indigo-600 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-image"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </span>
                  <span className="mt-1 text-[10px] font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                    {item.label}
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 select-none opacity-80 mt-0.5">
                    Insert Image
                  </span>
                </div>
              )}
            </div>
          ))}
          {/* Second group of 7 to make scroll completely seamless */}
          {items.map((item, idx) => (
            <div
              key={`second-${item.id}-${idx}`}
              className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              {item.imgSrc ? (
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center h-full w-full">
                  <span className="text-slate-400 group-hover:text-indigo-600 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-image"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </span>
                  <span className="mt-1 text-[10px] font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                    {item.label}
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 select-none opacity-80 mt-0.5">
                    Insert Image
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const heroPositions = [
    { x: -280, y: -110, delay: 0.05, floatDist: 11, duration: 5.2 },
    { x: -240, y: -220, delay: 0.12, floatDist: 14, duration: 6.5 },
    { x: -190, y: -140, delay: 0.08, floatDist: 9, duration: 7.4 },
    { x: -140, y: -260, delay: 0.22, floatDist: 12, duration: 5.8 },
    { x: -125, y: -90, delay: 0.15, floatDist: 15, duration: 7.1 }, // Notion moved outward
    { x: -60, y: -250, delay: 0.28, floatDist: 8, duration: 6.3 },   // Asana moved outward
    { x: 20, y: -270, delay: 0.18, floatDist: 13, duration: 8.2 },
    { x: 130, y: -110, delay: 0.31, floatDist: 10, duration: 6.0 },   // LinkedIn moved outward again
    { x: 120, y: -230, delay: 0.09, floatDist: 14, duration: 7.7 },
    { x: 265, y: -150, delay: 0.35, floatDist: 11, duration: 6.9 },  // Gemini moved outward again
    { x: 220, y: -260, delay: 0.24, floatDist: 13, duration: 7.3 },
    { x: 270, y: -110, delay: 0.17, floatDist: 9, duration: 5.5 },
    { x: -110, y: -170, delay: 0.41, floatDist: 14, duration: 8.0 },
    { x: -35, y: -230, delay: 0.44, floatDist: 10, duration: 6.4 },  // Outlook moved outward again
    { x: 100, y: -170, delay: 0.47, floatDist: 12, duration: 6.8 },
    { x: 190, y: -190, delay: 0.5, floatDist: 11, duration: 7.2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {selectedProjectId ? (
        <ProjectDetailsPage
          projectId={selectedProjectId}
          onBack={() => setSelectedProjectId(null)}
        />
      ) : (
        <>
          {/* --- HERO SECTION --- */}
          <section
            id="hero-section"
            className="relative pt-16 lg:pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col items-center text-center overflow-visible rounded-3xl bg-gradient-to-tr from-blue-50/20 via-white to-purple-50/20 border border-slate-100 shadow-xl mb-12"
          >
            {/* Soft blue & purple gradient accents in the background */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none select-none">
              <div
                className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-200/25 blur-3xl animate-pulse"
                style={{ animationDuration: "12s" }}
              />
              <div
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-200/25 blur-3xl animate-pulse"
                style={{ animationDuration: "16s" }}
              />
              <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full bg-indigo-50/40 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.15)_0%,_transparent_70%)] blur-3xl" />
              
              {/* Halftone dot texture */}
              <div 
                className="absolute inset-0 opacity-25 mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle at center, rgba(15, 23, 42, 0.45) 1px, transparent 1.6px)",
                  backgroundSize: "9px 9px",
                  WebkitMaskImage: "radial-gradient(circle at top left, black 0%, transparent 35%), radial-gradient(circle at top right, black 0%, transparent 35%)",
                  maskImage: "radial-gradient(circle at top left, black 0%, transparent 35%), radial-gradient(circle at top right, black 0%, transparent 35%)",
                }}
              />
            </div>

            {/* Profile Image & Surrounding 14 Randomly Scattered Upper-Halo Tool Placeholders */}
            <div className="relative w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[360px] lg:h-[360px] z-20 flex items-center justify-center select-none overflow-visible">
              {/* Centered Bigger Profile Image without Outline border (no overflow-hidden, no rounded-full to support clean transparent cutouts) */}
              <div className="relative w-full h-full shrink-0 hover:scale-[1.01] transition-transform duration-300 z-30">
                <img
                  src={profile}
                  alt="Gio Anthony S. Sabucido (Yong)"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Render 16 Snug Mathematically Positioned Floating Tool Boxes */}
              {heroPositions.map((pos, idx) => {
                const toolInfo = STACK_ICONS[idx % STACK_ICONS.length];
                const floatOffset = pos.floatDist;
                // Distribute widely horizontally on laptop/desktop to spread outward and avoid overlap,
                // while scaling down the vertical multiplier to keep all tool elements fully visible on screen.
                // Adjust scale slightly and offset upwards to make sure they are placed beautifully up, but not overlap.
                
                const isMobile = window.innerWidth < 640;
                const isLaptop = window.innerWidth >= 640 && window.innerWidth < 1024;
                
                let laptopScaleX = isLaptop
                  ? idx % 2 === 0
                    ? 1.58
                    : 1.36
                  : 1.0;
                let laptopScaleY = isLaptop
                  ? idx % 2 === 0
                    ? 1.08
                    : 0.96
                  : 1.0;

                // Move some items closer on laptop view
                if (isLaptop && (idx === 0 || idx === 8)) {
                  laptopScaleX = 1.02;
                  laptopScaleY = 0.92;
                }

                const finalX =
                  pos.x * (isMobile ? 0.74 : laptopScaleX) +
                  (isMobile ? (idx % 2 === 0 ? 10 : -10) : 0);
                const finalY =
                  pos.y * (isMobile ? 0.88 : laptopScaleY) +
                  (isMobile ? (idx % 3 === 0 ? -12 : 8) : 0) +
                  (isMobile ? 35 : isLaptop ? 30 : 55);

                const boxSize = isMobile ? 56 : isLaptop ? 64 : 80;
                const halfBoxSize = boxSize / 2;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: 0.9,
                      scale: 0.95,
                      y: [0, -floatOffset, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.4, delay: pos.delay },
                      scale: { duration: 0.4, delay: pos.delay },
                      y: {
                        repeat: Infinity,
                        duration: pos.duration,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      scale: 1.25,
                      // Floating push-away effect when hovered to change position
                      x: finalX * 1.14 + (idx % 2 === 0 ? 8 : -8),
                      y: finalY * 1.14 - 10,
                      rotate: idx % 2 === 0 ? 15 : -15,
                      opacity: 1.0,
                      zIndex: 50,
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 13,
                      },
                    }}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${finalX}px)`,
                      top: `calc(50% + ${finalY}px)`,
                      marginLeft: `-${halfBoxSize}px`,
                      marginTop: `-${halfBoxSize}px`,
                    }}
                    className={`z-10 w-14 h-14 sm:w-20 sm:h-20 lg:w-16 lg:h-16 bg-white hover:bg-white/95 border border-slate-200/80 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-slate-300`}
                  >
                    <div className={`w-full h-full overflow-hidden rounded-xl sm:rounded-2xl p-2.5 sm:p-3 ${toolInfo.color}`}>
                      <img
                        src={toolInfo.imgSrc || "https://via.placeholder.com/150x150?text=Tool"}
                        alt={toolInfo.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Name in professional indigo styling and subtitle role line */}
            <div className="z-30 mt-6 sm:mt-8 select-text text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-indigo-600">
                Gio Sabucido
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-800 tracking-wide max-w-2xl mx-auto leading-relaxed">
                Amazon Virtual Assistant | Social Media Marketer | Graphic Designer | Administrative Support
              </p>
            </div>
          </section>

          {/* --- ABOUT & BIO SECTION --- */}
          <section id="about-section" className="py-16 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Bio Text Column */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  About &amp; Objective
                </span>

                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  E-commerce visual design and operational specialist
                </h2>

                <p
                  style={isMobile ? undefined : { height: "232px", fontSize: "17px", lineHeight: "27.25px" }}
                  className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed text-left font-normal"
                >
                  An experienced, detail-driven marketing and administrative 
                  specialist supporting business growth through Amazon Virtual Assistance, 
                  social media marketing, graphic design, and administrative support. 
                  With over 3 years of experience in marketing, customer service, 
                  business administration, and creative design, skilled in optimizing 
                  product listings, creating conversion-focused visuals, managing daily operations, 
                  and strengthening brand presence with accuracy and efficiency.
                </p>

                {/* Languages, Location and Resume Download Box (precisely 10px below the tags) */}
                <div className="flex flex-col gap-[10px]">
                  <div>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {LANGUAGES.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-slate-100 rounded-full text-[10px] font-medium text-slate-600"
                        >
                          {lang}
                        </span>
                      ))}
                      <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-semibold flex items-center gap-1">
                        <MapPin size={10} /> Live in {PERSONAL_INFO.location}
                      </span>
                    </div>
                  </div>

                  {/* CV Preview & Download Box */}
                  <div
                    style={
                      isMobile
                        ? undefined
                        : {
                            paddingLeft: "49px",
                            paddingRight: "48px",
                            paddingTop: "28px",
                            paddingBottom: "28px",
                            marginRight: "-275px",
                            marginLeft: "125px",
                            marginTop: "12px",
                            marginBottom: "-14px",
                          }
                    }
                    className="p-5 sm:p-8 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 rounded-2xl border border-indigo-500/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-white relative overflow-hidden"
                  >
                    {/* Subtle background glow effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none select-none z-0" />
                    <div className="absolute -left-16 -top-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />
                    
                    {/* Halftone dot texture faded on the resume box */}
                    <div 
                      className="absolute inset-0 opacity-30 pointer-events-none select-none z-0"
                      style={{
                        backgroundImage: "radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 1px, transparent 1.6px)",
                        backgroundSize: "9px 9px",
                        WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
                        maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
                      }}
                    />

                    <div className="space-y-1 text-center sm:text-left z-10 relative">
                      <h3
                        style={
                          isMobile
                            ? undefined
                            : { fontSize: "18px", lineHeight: "22px" }
                        }
                        className="text-xs sm:text-sm font-bold tracking-tight"
                      >
                        Official Resume &amp; Profile Credits
                      </h3>
                      <p
                        style={
                          isMobile
                            ? undefined
                            : { fontSize: "13px", lineHeight: "16.5px" }
                        }
                        className="text-slate-300 text-[10.5px] sm:text-xs leading-relaxed max-w-sm"
                      >
                        I'd love for you to get a clear picture of my
                        background. Please preview my updated CV right here in
                        your browser, or quickly grab the printable PDF copy for
                        your files!
                      </p>
                    </div>

                    <div
                      className={`flex flex-col xs:flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0 z-10 relative ${isMobile ? "" : "sm:ml-auto items-end"}`}
                    >
                      <button
                        id="view-cv-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCvModal(true);
                        }}
                        className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[10.5px] font-semibold rounded-xl tracking-wide flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all duration-150 cursor-pointer border border-indigo-500/40 w-full xs:flex-1 sm:flex-initial sm:w-[175px]"
                      >
                        <Search size={12} /> Preview CV
                      </button>

                      <button
                        id="download-cv-btn"
                        onClick={handleDownloadResume}
                        className="py-2.5 px-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[10.5px] font-semibold rounded-xl tracking-wide flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition-all duration-150 cursor-pointer w-full xs:flex-1 sm:flex-initial sm:w-[175px]"
                      >
                        <Download size={12} /> Download CV (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Qualifications Checklist Column */}
              <div
                style={isMobile ? undefined : { width: "380px", height: "298px" }}
                className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden"
              >
                <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Award size={14} className="text-indigo-600" /> Qualifications
                </h3>

                <ul className="space-y-2.5">
                  {[
                    "Experienced visual design practitioner with strong marketing asset and branding skills.",
                    "E-commerce background removal, product enhancement, and Canva design layouts.",
                    "Formulates SEO-inspired, conversion-targeted e-commerce listing copywriting.",
                    "Experienced in customer ticketing, transaction logging, and order issue handling.",
                    "Proficient with MS Excel and cloud spreadsheets for record keeping.",
                  ].map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <div className="mt-0.5 text-indigo-600 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* --- REVOLUTIONARY SKILLS GRID SECTION --- */}
          <section
            id="skills-section"
            className="py-20 bg-white border-y border-slate-200 transition-colors duration-200 relative overflow-hidden"
          >
            <FadedGridBackground />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Service Blueprints
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Core E-Commerce &amp; Administrative Competencies
                </h2>
                <p className="text-slate-505 text-xs sm:text-sm max-w-md mx-auto">
                  Combining design aesthetics, operational logic, and e-commerce
                  structure.
                </p>
              </div>

              {/* Service cards / skill matrices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_CATEGORIES.map((cat, catIdx) => (
                  <div
                    key={catIdx}
                    className="p-5 bg-white rounded-xl border border-slate-150 flex flex-col justify-between shadow-[0_10px_30px_rgba(99,102,241,0.06)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          {catIdx === 0 && <ShoppingBag size={16} />}
                          {catIdx === 1 && <Palette size={16} />}
                          {catIdx === 2 && <ClipboardList size={16} />}
                          {catIdx === 3 && <LineChart size={16} />}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">
                          {cat.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-xs text-slate-500 leading-relaxed text-left">
                        {cat.description}
                      </p>

                      {/* Skills checkmarks tag layout */}
                      <div className="mt-3.5 space-y-1.5">
                        {cat.skills.map((skill, sIdx) => {
                          return (
                            <div
                              key={sIdx}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <CheckCircle2
                                size={12}
                                className="text-indigo-600 shrink-0"
                              />
                              <span>{skill}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FEATURED SERVICES & INTERACTIVE PORTFOLIO PROJECT CARDS --- */}
          <section
            id="portfolio-section"
            className="py-16 px-6 max-w-5xl mx-auto"
          >
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                Hands-On Projects
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Simulated &amp; Transferable Workflows
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                Click on "View Details" below to view complete interactive case
                studies, dynamic project graphics, and styled workflow
                blueprints.
              </p>
            </div>

            {/* Project Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-xl border border-slate-150 p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:border-indigo-150 transition-all duration-300"
                >
                  <div>
                    {/* High-fidelity generated imagery from model */}
                    <div className="relative h-36 w-full rounded-lg mb-3.5 overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center">
                      <img
                        src={
                          proj.id === "project-1"
                            ? amazon
                            : proj.id === "project-2"
                              ? tracker
                              : design
                        }
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-550"
                      />
                      {/* Subtle Floating category label overlay */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono font-bold rounded shadow-xs">
                        {proj.id === "project-1"
                          ? "SELLER CENTRAL SEO"
                          : proj.id === "project-2"
                            ? "INVENTORY CONTROL"
                            : "CREATIVE DESIGN"}
                      </span>
                    </div>


                    <h3 className="text-base font-bold text-slate-900 mt-1.5 mb-1 leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-3 text-left">
                      {proj.description}
                    </p>

                    {/* Tags mapping */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.skills.slice(0, 3).map((st, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic view details trigger */}
                  <button
                    id={`project-summary-btn-${proj.id}`}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-transparent transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
                  >
                    <Eye size={12} className="shrink-0" />
                    <span>View Details</span>
                    <ArrowUpRight size={11} className="shrink-0 opacity-85" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* --- SOP LIGHTBOX MODAL --- */}
          <AnimatePresence>
            {activeProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveProject(null)}
                  className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"
                />

                {/* Slide up modal body */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative bg-white border border-slate-100 p-6 rounded-2xl shadow-2xl max-w-lg w-full z-10 max-h-[85vh] overflow-y-auto"
                >
                  {/* Close Button */}
                  <button
                    id="close-modal-btn"
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 p-1.5 text-slate-450 hover:text-slate-900 cursor-pointer"
                    title="Close"
                  >
                    <X size={16} />
                  </button>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">
                    Detailed Strategy SOP Blueprint
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3">
                    {activeProject.title}
                  </h3>

                  {/* Large Image inside lightbox */}
                  <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-slate-150/40 mb-4 bg-slate-50 shadow-inner">
                    <img
                      src={
                        activeProject.id === "project-1"
                          ? amazon
                          : activeProject.id === "project-2"
                            ? tracker
                            : design
                      }
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  <div className="space-y-4">
                    {/* Challenge Block */}
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-red-500 uppercase font-mono text-[10px] font-semibold tracking-wider block mb-1">
                        Challenge:
                      </span>
                      <div className="text-slate-650 text-xs leading-relaxed text-left font-sans">
                        {activeProject.challenge}
                      </div>
                    </div>

                    {/* Solution Block */}
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-emerald-600 uppercase font-mono text-[10px] font-semibold tracking-wider block mb-1">
                        Solution:
                      </span>
                      <div className="text-slate-650 text-xs leading-relaxed text-left font-sans">
                        {activeProject.solution}
                      </div>
                    </div>

                    {/* Impact Block */}
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-indigo-600 uppercase font-mono text-[10px] font-semibold tracking-wider block mb-1">
                        Real Impact:
                      </span>
                      <div className="text-slate-650 text-xs italic leading-relaxed text-left font-sans">
                        {activeProject.impact}
                      </div>
                    </div>

                    {/* SOP Steps */}
                    {activeProject.sopSteps && (
                      <div>
                        <h4 className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-2">
                          Step-by-Step Delivery SOP:
                        </h4>
                        <div className="space-y-1.5">
                          {activeProject.sopSteps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-2.5 bg-slate-50 rounded-lg flex items-start gap-2.5 border border-slate-100/80"
                            >
                              <span className="w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] font-mono shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <p className="text-xs text-slate-700 text-left">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Close Bottom Button */}
                  <div className="mt-6 pt-3 border-t border-slate-105 flex justify-end">
                    <button
                      id="close-modal-bottom-btn"
                      onClick={() => setActiveProject(null)}
                      className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer animate-none"
                    >
                      Close Case Summary
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <section
            id="experience-section"
            className="py-12 bg-slate-50/40 border-t border-slate-100 transition-colors duration-200 relative overflow-hidden"
          >
            <FadedGridBackground />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-1 mb-8">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Work Chronology
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Professional Journey
                </h2>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  Symmetrical single-page chronology combining design,
                  copywriting, database, and admin support.
                </p>
              </div>

              {/* High-Density Side-by-Side Chronology Grid but with bigger font as requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {EXPERIENCES.map((exp, expIdx) => (
                  <div
                    key={expIdx}
                    className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between relative hover:border-indigo-150 hover:shadow transition-all duration-150"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1 pb-2 mb-2.5 border-b border-slate-50">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium font-mono mt-1">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono mb-3">
                        {exp.period}
                      </span>

                      {/* Achievements bullets with bigger font */}
                      <ul className="space-y-2 text-xs text-slate-650 leading-relaxed">
                        {exp.achievements.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-1.5 text-left"
                          >
                            <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0 mt-2" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Amazon skills tag matching */}
                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {exp.amazonSkills.map((ask, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded"
                        >
                          {ask}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FORMAL ACADEMIC CREDITS SECTION --- */}
          <section
            id="education-section"
            className="py-16 px-6 max-w-4xl mx-auto"
          >
            <div className="p-6 bg-white rounded-xl border border-slate-150 flex flex-col md:flex-row gap-6 items-start shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:border-indigo-100 transition-all duration-300">
              <div className="md:w-1/3">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase block mb-1">
                  Academic Track
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  Education &amp; Studies
                </h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Groundwork in communication, systems design, and visual
                  graphics.
                </p>
              </div>

              <div className="md:w-2/3 space-y-3 w-full">
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50/40 rounded-lg border border-slate-150 shadow-sm hover:shadow-md hover:border-indigo-100/40 hover:bg-slate-50/70 transition-all duration-200"
                  >
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                      {edu.degree}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">
                      {edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- TOOLS PROFICIENCY & MASTER STRIP --- */}
          <section
            id="tools-section"
            className="py-16 bg-slate-50/40 border-y border-slate-150/80"
          >
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Technology Stack
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Tools &amp; Stack Expertise
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                  Categorized proficiency index showcasing core systems.
                </p>
              </div>

              {/* 3 infinite sliding marquee rows with edge shading */}
              <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-4 space-y-4">
                {/* Soft gradient masks on both sides for premium transition */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

                {/* Row 1: Right to left (medium speed) */}
                {renderMarqueeRow(ROW1_LOGOS, "left")}

                {/* Row 2: Left to right (medium speed) */}
                {renderMarqueeRow(ROW2_LOGOS, "right")}

                {/* Row 3: Right to left (medium speed) */}
                {renderMarqueeRow(ROW3_LOGOS, "left")}
              </div>
            </div>
          </section>

          {/* --- CLOSING / CONTACT / SIMULATED MESSAGE CONSOLE --- */}
          <section
            id="contact-section"
            className="py-16 px-6 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Header text and explicit labels */}
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Get In Touch
                </span>

                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  Let's partner to scale your business operations &amp; elevate
                  your online presence
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-left">
                  Send a quick message. Whether your project needs product
                  graphics, keyword targeting, or spreadsheet tracking — I am
                  ready to start.
                </p>

                {/* Direct details cards */}
                <div className="space-y-2 pt-2">
                  {/* Email card */}
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Mail size={14} />
                    </span>
                    <div>
                      <span className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">
                        Email
                      </span>
                      <span className="text-slate-800 text-xs font-bold">
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </div>

                  {/* Phone card */}
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Phone size={14} />
                    </span>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-mono">
                        WhatsApp
                      </span>
                      <span className="text-slate-800 text-xs font-bold font-mono">
                        {PERSONAL_INFO.phone}
                      </span>
                    </div>
                  </div>

                  {/* Location card */}
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <MapPin size={14} />
                    </span>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="text-slate-855 text-xs font-bold">
                        {PERSONAL_INFO.location}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Social Links */}
                  <div className="grid grid-cols-3 gap-2 pt-4 md:hidden">
                    <a
                      href="https://www.linkedin.com/in/gioanthony03/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-1 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-1.5 group transition-colors hover:border-indigo-200 shadow-sm text-center"
                    >
                      <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          className="w-[14px] h-[14px] object-contain rounded-sm"
                        />
                      </span>
                      <span className="text-slate-800 text-[9px] font-bold uppercase tracking-wider">
                        LinkedIn
                      </span>
                    </a>
                    <a
                      href="https://www.facebook.com/yong.sabucido"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-1 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-1.5 group transition-colors hover:border-indigo-200 shadow-sm text-center"
                    >
                      <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <img
                          src={facebook}
                          alt="Facebook"
                          className="w-[14px] h-[14px] object-contain rounded-sm"
                        />
                      </span>
                      <span className="text-slate-800 text-[9px] font-bold uppercase tracking-wider">
                        Facebook
                      </span>
                    </a>
                    <a
                      href="https://www.instagram.com/gioanthony03"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-1 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-1.5 group transition-colors hover:border-indigo-200 shadow-sm text-center"
                    >
                      <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <img
                          src={instagram}
                          alt="Instagram"
                          className="w-[14px] h-[14px] object-contain rounded-sm"
                        />
                      </span>
                      <span className="text-slate-800 text-[9px] font-bold uppercase tracking-wider">
                        Instagram
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Sub-Grid for Form and Social Links */}
              <div className="md:col-span-7 flex flex-col">
                {/* Interactive Simulated Email Console Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
                  <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Send a Message
                  </h3>

                  {submitSuccess ? (
                    <div className="space-y-4 text-center py-6">
                      <span className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl mx-auto">
                        ✓
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          Message Sent!
                        </h4>
                        <p className="text-xs text-slate-505 max-w-sm mx-auto leading-relaxed">
                          Thank you! Your message has been sent successfully.
                          Below is a copy of your message:
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-left max-h-40 overflow-y-auto">
                        <p className="text-[9px] uppercase font-mono font-bold text-slate-400 mb-1">
                          Message Details:
                        </p>
                        <pre className="text-[11px] text-slate-705 font-mono whitespace-pre-wrap leading-relaxed">
                          {`From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`}
                        </pre>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-1 font-sans">
                        <button
                          id="copy-payload-btn"
                          onClick={copyFormattedDraft}
                          className={`py-1.5 px-4 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors duration-150 ${copiedDraft ? "bg-emerald-55 bg-emerald-50 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                        >
                          {copiedDraft ? "Message Copied!" : "Copy Message"}
                        </button>
                        <button
                          id="reset-form-btn"
                          onClick={resetForm}
                          className="py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Name field */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="form-name-input"
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-slate-50/50 border border-slate-100 focus:border-indigo-600 focus:bg-white px-3 py-2 rounded-xl text-xs text-slate-805 outline-none transition-all duration-150"
                          />
                        </div>

                        {/* Email field */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="form-email-input"
                            type="email"
                            required
                            placeholder="e.g. jdoe@store.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-slate-50/50 border border-slate-100 focus:border-indigo-600 focus:bg-white px-3 py-2 rounded-xl text-xs text-slate-805 outline-none transition-all duration-150"
                          />
                        </div>
                      </div>

                      {/* Message body input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="form-message-input"
                          rows={4}
                          required
                          placeholder="Enter your message here..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-slate-50/50 border border-slate-100 focus:border-indigo-600 focus:bg-white px-3 py-2 rounded-xl text-xs text-slate-805 outline-none transition-all duration-150 block resize-none"
                        />
                      </div>

                      {/* Simulated send action button */}
                      <button
                        id="form-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 mt-1 bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-indigo-700 shadow-sm active:scale-95 disabled:opacity-50 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Laptop Social Links - placed 12px below the form card */}
                <div
                  className="hidden md:grid grid-cols-3 gap-3"
                  style={{ marginTop: "12px" }}
                >
                  <a
                    href="https://www.linkedin.com/in/gioanthony03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-center gap-3 group transition-colors hover:border-indigo-200 shadow-sm"
                  >
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <img
                        src={linkedin}
                        alt="LinkedIn"
                        className="w-[14px] h-[14px] object-contain rounded-sm"
                      />
                    </span>
                    <span className="text-slate-800 text-xs font-bold">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/yong.sabucido"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-center gap-3 group transition-colors hover:border-indigo-200 shadow-sm"
                  >
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <img
                        src={facebook}
                        alt="Facebook"
                        className="w-[14px] h-[14px] object-contain rounded-sm"
                      />
                    </span>
                    <span className="text-slate-800 text-xs font-bold">
                      Facebook
                    </span>
                  </a>
                  <a
                    href="https://www.instagram.com/gioanthony03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-center gap-3 group transition-colors hover:border-indigo-200 shadow-sm"
                  >
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <img
                        src={instagram}
                        alt="Instagram"
                        className="w-[14px] h-[14px] object-contain rounded-sm"
                      />
                    </span>
                    <span className="text-slate-800 text-xs font-bold">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* --- FOOTER EXPLICIT SIGN OFF --- */}
          <footer className="relative overflow-hidden py-12 bg-slate-50 border-t border-slate-200 text-center transition-colors duration-200">
            {/* Halftone dot texture faded to center same as on hero */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none select-none z-0"
              style={{
                backgroundImage: "radial-gradient(circle at center, rgba(15, 23, 42, 0.45) 1px, transparent 1.6px)",
                backgroundSize: "9px 9px",
                WebkitMaskImage: "radial-gradient(circle at top left, black 0%, transparent 35%), radial-gradient(circle at top right, black 0%, transparent 35%)",
                maskImage: "radial-gradient(circle at top left, black 0%, transparent 35%), radial-gradient(circle at top right, black 0%, transparent 35%)",
              }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4 text-slate-500 text-xs">
              <div className="flex justify-center items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-slate-800 font-bold font-display uppercase tracking-widest text-xs">
                  Gio Anthony S. Sabucido (Yong)
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              </div>

              <p className="max-w-md mx-auto leading-relaxed">
                Thank you for taking the time to visit my portfolio.
              </p>

              <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row justify-center items-center text-[10px] font-mono text-slate-400">
                <p>© 2026 Yong Sabucido. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* --- REUSABLE POPUP TOAST SYSTEM --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-800 text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3 max-w-[90vw] text-xs font-mono"
          >
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping shrink-0" />
            <p className="leading-snug">{toastMessage}</p>
          </motion.div>
        )}

        {showCvModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsCVModalOpen(false)}
            ></div>
            
            <div className={`relative w-full max-w-[610px] h-[88vh] border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 ${isDarkMode ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-black/10'}`}>
              {/* Header */}
              <div className={`px-4 py-2.5 flex items-center justify-between border-b shrink-0 ${isDarkMode ? 'bg-[#141414] border-white/5' : 'bg-gray-100/80 border-black/5'}`}>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => setIsCVModalOpen(false)}
                    className={`flex items-center gap-1.5 transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest py-1 cursor-pointer ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    <span>Back</span>
                  </button>
                  <div className={`h-4 w-px ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>
                  <h3 className={`font-bold text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hidden xs:block`}>CV</h3>
                </div>

                {/* Pages Navigation and Zoom Controls aligned side-by-side */}
                <div className="flex items-center gap-2 select-none shrink-0">
                  {/* Portrait Page Selector */}
                  <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5 gap-0.5 shrink-0">
                    {[1, 2, 3].map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => setCvPage(pNum)}
                        className={`px-2.5 h-6 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center whitespace-nowrap ${
                          cvPage === pNum
                            ? "bg-indigo-600 text-white shadow-sm"
                            : isDarkMode 
                              ? "text-white/60 hover:text-white hover:bg-white/5" 
                              : "text-black/60 hover:text-black hover:bg-black/5"
                        }`}
                        title={`Go to Page ${pNum}`}
                      >
                        Page {pNum}
                      </button>
                    ))}
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5 gap-0.5 shrink-0">
                    <button
                      onClick={() => setCvZoom(Math.max(0.6, cvZoom - 0.15))}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-black/10 text-black/60 hover:text-black'}`}
                      title="Zoom Out"
                    >
                      <ZoomOut size={13} />
                    </button>
                    <span className={`text-[9px] font-mono font-bold px-1 min-w-[36px] text-center select-none ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      {Math.round((isMobile ? cvZoom / 0.7 : cvZoom) * 100)}%
                    </span>
                    <button
                      onClick={() => setCvZoom(Math.min(2.0, cvZoom + 0.15))}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-black/10 text-black/60 hover:text-black'}`}
                      title="Zoom In"
                    >
                      <ZoomIn size={13} />
                    </button>
                    <button
                      onClick={() => setCvZoom(isMobile ? 0.7 : 1.0)}
                      className={`px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase font-mono rounded transition-colors cursor-pointer hidden sm:block ${isDarkMode ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/10 text-black/50 hover:text-black'}`}
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content Area: Pure Portrait Canvas (Centered) */}
              <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-50/50">
                <div className="flex-1 flex flex-col relative overflow-hidden">
                  {/* Zoom stage viewer */}
                  <div
                    ref={zoomViewerRef}
                    className="flex-1 overflow-auto p-10 flex items-start justify-center relative"
                  >
                    <div
                      style={{
                        width: `${595 * (fitScale * cvZoom * 1.75)}px`,
                        height: `${842 * (fitScale * cvZoom * 1.75)}px`,
                      }}
                      className="relative transition-all duration-150 ease-out shrink-0"
                    >
                      <div
                        style={{
                          transform: `scale(${fitScale * cvZoom * 1.75})`,
                          transformOrigin: "top left",
                          width: "595px",
                          height: "842px",
                        }}
                        className="absolute top-0 left-0 bg-white rounded-lg shadow-xl border border-slate-200/80 flex flex-col items-center justify-center shrink-0 overflow-hidden"
                      >
                        {cvPage === 1 && (
                          <div className="w-full h-full relative bg-slate-50 flex items-center justify-center">
                            <img
                              src={page1}
                              alt="Gio Anthony Sabucido Resume Page 1"
                              className="absolute inset-0 w-full h-full object-contain z-10 bg-white"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                              <ImageIcon size={40} className="text-indigo-400 mb-3 animate-pulse" />
                              <p className="font-sans text-sm font-black text-slate-800 uppercase tracking-wider">Resume Page 1</p>
                              <p className="font-sans text-xs text-slate-500 mt-1">A4 PNG Image Placeholder</p>
                              <div className="mt-4 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs max-w-[280px]">
                                <p className="font-mono text-[9px] text-slate-400 truncate">Source: {page1}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {cvPage === 2 && (
                          <div className="w-full h-full relative bg-slate-50 flex items-center justify-center">
                            <img
                              src={page2}
                              alt="Gio Anthony Sabucido Resume Page 2"
                              className="absolute inset-0 w-full h-full object-contain z-10 bg-white"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                              <ImageIcon size={40} className="text-indigo-400 mb-3 animate-pulse" />
                              <p className="font-sans text-sm font-black text-slate-800 uppercase tracking-wider">Resume Page 2</p>
                              <p className="font-sans text-xs text-slate-500 mt-1">A4 PNG Image Placeholder</p>
                              <div className="mt-4 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs max-w-[280px]">
                                <p className="font-mono text-[9px] text-slate-400 truncate">Source: {page2}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {cvPage === 3 && (
                          <div className="w-full h-full relative bg-slate-50 flex items-center justify-center">
                            <img
                              src={page3}
                              alt="Gio Anthony Sabucido Resume Page 3"
                              className="absolute inset-0 w-full h-full object-contain z-10 bg-white"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                              <ImageIcon size={40} className="text-indigo-400 mb-3 animate-pulse" />
                              <p className="font-sans text-sm font-black text-slate-800 uppercase tracking-wider">Resume Page 3</p>
                              <p className="font-sans text-xs text-slate-500 mt-1">A4 PNG Image Placeholder</p>
                              <div className="mt-4 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs max-w-[280px]">
                                <p className="font-mono text-[9px] text-slate-400 truncate">Source: {page3}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
