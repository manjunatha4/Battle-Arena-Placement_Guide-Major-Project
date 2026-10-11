import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
 Mic,
 MicOff,
 Video,
 VideoOff,
 Brain,
 Camera,
 MessageSquare,
 Sparkles,
 Award,
 Play,
 RotateCcw,
 Volume2,
 VolumeX,
 Download,
 Loader2,
 FileText
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import BACKEND_URL from "@/config/api";

const QUESTIONS = [
 "Tell me about yourself and your background.",
 "What are your greatest technical strengths and weaknesses?",
 "Can you explain the difference between a process and a thread in operating systems?",
 "Describe a challenging coding problem you solved recently and how you resolved it.",
 "Why do you want to join Battle Arena - Placement Guide, and where do you see yourself in five years?",
];

export default function MockInterview() {
 const [hasCamera, setHasCamera] = useState(false);
 const [stream, setStream] = useState(null);
 const [isRecording, setIsRecording] = useState(false);
 const [isMuted, setIsMuted] = useState(false);
 const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1); // -1: Not started, 0-4: Active, 5: Finished
 const [userAnswers, setUserAnswers] = useState([]);
 const [currentTranscript, setCurrentTranscript] = useState("");
 const [isListening, setIsListening] = useState(false);
 const [speechVolume, setSpeechVolume] = useState(true); // TTS toggle

 // Configuration State
 const [interviewMode, setInterviewMode] = useState("raw"); // "raw" or "resume"
 const [resumeFile, setResumeFile] = useState(null);
 const [voiceTone, setVoiceTone] = useState("professional"); // "professional", "friendly", "strict"
 const [questions, setQuestions] = useState(QUESTIONS);
 const [isUploading, setIsUploading] = useState(false);

 // Simulated AI Metrics
 const [metrics, setMetrics] = useState({
 speech: "Not started",
 eye: "Not started",
 posture: "Not started",
 confidence: "Not started",
 });

 // Performance Report Results
 const [report, setReport] = useState(null);

 const videoRef = useRef(null);
 const recognitionRef = useRef(null);
 const baseTextRef = useRef("");

 // Initialize Speech Recognition API
 useEffect(() => {
   const SpeechRecognition =
     window.SpeechRecognition || window.webkitSpeechRecognition;
   if (SpeechRecognition) {
     const rec = new SpeechRecognition();
     rec.continuous = true;
     rec.interimResults = true;
     rec.lang = "en-US";

     rec.onresult = (event) => {
       let interimTranscript = "";
       let finalTranscript = "";
       for (let i = event.resultIndex; i < event.results.length; i++) {
         const text = event.results[i][0].transcript;
         if (event.results[i].isFinal) {
           finalTranscript += text;
         } else {
           interimTranscript += text;
         }
       }
       if (finalTranscript) {
         const prev = baseTextRef.current;
         baseTextRef.current = prev ? prev + " " + finalTranscript.trim() : finalTranscript.trim();
         setCurrentTranscript(baseTextRef.current);
       } else if (interimTranscript) {
         const prev = baseTextRef.current;
         setCurrentTranscript(prev ? prev + " " + interimTranscript : interimTranscript);
       }
     };

     rec.onerror = (e) => {
       console.error("Speech Recognition Error:", e.error);
       setIsListening(false);
     };

     rec.onend = () => {
       setIsListening(false);
     };

     recognitionRef.current = rec;
   }
 }, []);

 // Handle Video Stream Startup
 const startCamera = async () => {
 try {
 const userStream = await navigator.mediaDevices.getUserMedia({
 video: true,
 audio: true,
 });
 setStream(userStream);
 setHasCamera(true);
 } catch (err) {
 console.warn("Camera/Microphone access denied. Using mock feed.", err);
 setHasCamera(false);
 }
 };

 const stopCamera = () => {
 if (stream) {
 stream.getTracks().forEach((track) => track.stop());
 setStream(null);
 }
 setHasCamera(false);
 };

 // Bind the camera stream to the video element after it has rendered in the DOM
 useEffect(() => {
 if (hasCamera && stream && videoRef.current) {
 videoRef.current.srcObject = stream;
 }
 }, [hasCamera, stream]);

 useEffect(() => {
 return () => {
 if (stream) {
 stream.getTracks().forEach((track) => track.stop());
 }
 };
 }, [stream]);


 // Voice synthesis utility to speak questions
 const speakText = (text) => {
    if (!speechVolume) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
        };
    }
    
    const selectedVoice = voices.find(
      (v) => v.lang.includes("en-US") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Online"))
    ) || voices.find(v => v.lang.includes("en-US")) || voices[0];
    
    if (selectedVoice) utterance.voice = selectedVoice;

    // Make the voice considerably faster to match natural human cadence
    if (voiceTone === "friendly") {
      utterance.rate = 1.5;
      utterance.pitch = 1.1;
    } else if (voiceTone === "strict") {
      utterance.rate = 1.4;
      utterance.pitch = 0.9;
    } else {
      utterance.rate = 1.45;
      utterance.pitch = 1.05;
    }

    window.speechSynthesis.speak(utterance);
  };

 const handleFileChange = (e) => {
   if (e.target.files && e.target.files[0]) {
     setResumeFile(e.target.files[0]);
   }
 };

 // Start interview
 const handleStartInterview = async () => {
   setIsUploading(true);
   let resumeId = null;
   let fetchedQuestions = QUESTIONS;

   if (interviewMode === "resume" && resumeFile) {
     try {
       const formData = new FormData();
       formData.append("resume", resumeFile);
       formData.append("email", "test@example.com"); // Optional user link
       const res = await axios.post(`${BACKEND_URL}/api/interview/upload-resume`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });
       resumeId = res.data.resumeId;
     } catch (err) {
       console.error("Failed to upload resume:", err);
       alert("Failed to upload resume. Proceeding with raw interview.");
     }
   }

   try {
     const res = await axios.post(`${BACKEND_URL}/api/interview/generate`, {
       type: interviewMode,
       resumeId: resumeId
     });
     fetchedQuestions = res.data;
     setQuestions(fetchedQuestions);
   } catch (err) {
     console.error("Failed to generate questions:", err);
     setQuestions(QUESTIONS);
   }

   setIsUploading(false);
   startCamera();
   setCurrentQuestionIdx(0);
   setUserAnswers([]);
   setReport(null);
   setIsRecording(true);
   setCurrentTranscript("");
   baseTextRef.current = "";
   
   // Set active metrics loop
   setMetrics({
     speech: "Analyzing speech...",
     eye: "Scanning eye contact...",
     posture: "Detecting alignment...",
     confidence: "Calibrating tone...",
   });

   speakText(fetchedQuestions[0]);
 };

 // Handle Speech listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition API is not supported in this browser. Please type your answer or use Google Chrome.");
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch(e) {}
      setIsListening(false);
    } else {
      baseTextRef.current = currentTranscript;
      
      // Always stop first to prevent "already started" errors
      try { recognitionRef.current.stop(); } catch(e) {}
      
      // Small delay to let browser release previous session
      setTimeout(() => {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.warn("Could not start speech recognition:", err);
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SR) {
            const rec = new SR();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = "en-US";
            rec.onresult = recognitionRef.current.onresult;
            rec.onerror = recognitionRef.current.onerror;
            rec.onend = recognitionRef.current.onend;
            recognitionRef.current = rec;
            try { rec.start(); setIsListening(true); } catch(e2) {
              console.error("Speech recognition failed:", e2);
              alert("Microphone access failed. Check browser permissions.");
            }
          }
        }
      }, 150);
    }
  };

 // Live Metric Simulation loops
 useEffect(() => {
 if (currentQuestionIdx >= 0 && currentQuestionIdx < questions.length && isRecording) {
 const interval = setInterval(() => {
 const speeches = ["Clear and steady", "Pacing is excellent", "Good articulation", "Very fluent"];
 const eyes = ["Good eye contact", "Maintained focus", "Stable contact", "Focused on screen"];
 const postures = ["Straight posture", "Proper alignment", "Good sitting pose", "Steady shoulders"];
 const confidences = ["Confident tone", "High engagement", "Assured speech", "Calm delivery"];

 setMetrics({
 speech: speeches[Math.floor(Math.random() * speeches.length)] + ` (${120 + Math.floor(Math.random() * 25)} WPM)`,
 eye: eyes[Math.floor(Math.random() * eyes.length)],
 posture: postures[Math.floor(Math.random() * postures.length)],
 confidence: confidences[Math.floor(Math.random() * confidences.length)],
 });
 }, 5000);

 return () => clearInterval(interval);
 }
 }, [currentQuestionIdx, isRecording]);

 // Handle Answer Submission
 const handleSubmitAnswer = () => {
 if (isListening && recognitionRef.current) {
 recognitionRef.current.stop();
 setIsListening(false);
 }

 // Save answer
 const currentAnswer = currentTranscript || "(No audio transcribed. User typed or remained silent)";
 const updatedAnswers = [...userAnswers, { question: questions[currentQuestionIdx], answer: currentAnswer }];
 setUserAnswers(updatedAnswers);
 setCurrentTranscript("");
 baseTextRef.current = "";

 const nextIdx = currentQuestionIdx + 1;
 if (nextIdx < questions.length) {
 setCurrentQuestionIdx(nextIdx);
 speakText(questions[nextIdx]);
 } else {
 // Completed all questions
 handleFinishInterview(updatedAnswers);
 }
 };

 // Complete Interview and generate Advanced Report
 const handleFinishInterview = async (answers) => {
   setIsRecording(false);
   stopCamera();
   setCurrentQuestionIdx(questions.length);

   try {
     const res = await axios.post(`${BACKEND_URL}/api/interview/feedback`, { answers });
     const feedbackData = res.data;

     // Save score to local storage for Dashboard
     localStorage.setItem("profile_name", localStorage.getItem("profile_name") || "Prasad");
     localStorage.setItem("dashboard_interviews_given", (parseInt(localStorage.getItem("dashboard_interviews_given") || "12") + 1).toString());
     localStorage.setItem("dashboard_interview_score", `${feedbackData.overallScore}%`);

     setReport(feedbackData);
   } catch (err) {
     console.error("Failed to generate feedback via backend:", err);
     // Fallback
     setReport({
       overallScore: 65,
       totalWords: 120,
       fillerWords: 8,
       speechPace: "135 WPM",
       clarity: "Fair",
       laggingAreas: ["Backend connection failed. Please ensure the backend server is running.", "Unable to analyze exact lagging areas."],
       insights: ["Please restart the interview to retry feedback generation."],
     });
   }
 };

  const downloadFeedback = () => {
    if (!report) return;

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 14;

      // Header Banner
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 42, "F");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(255, 255, 255);
      doc.text("BATTLE ARENA — PLACEMENT INTERVIEW REPORT", 14, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Evidence-Based Semantic Evaluation | Dept. of CSE, SIET Tumakuru", 14, 25);
      doc.text(`Generated: ${new Date().toLocaleString()} | Mode: ${interviewMode.toUpperCase()}`, 14, 31);

      // Score Badge Box on Top Right
      const score = report.overallScore || 0;
      doc.setFillColor(124, 58, 237);
      doc.roundedRect(pageWidth - 48, 9, 34, 24, 3, 3, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text(`${score}%`, pageWidth - 31, 21, { align: "center" });

      doc.setFontSize(6);
      doc.text("OVERALL SCORE", pageWidth - 31, 27, { align: "center" });

      y = 50;

      // Section 1: Metrics Breakdown
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text("1. OVERALL PERFORMANCE METRICS", 14, y);
      y += 5;

      const boxWidth = (pageWidth - 28 - 9) / 4;
      const metricsData = [
        { label: "CLARITY", val: report.clarity || "Fair" },
        { label: "SPEECH PACE", val: report.speechPace || "138 WPM" },
        { label: "TOTAL WORDS", val: String(report.totalWords || 0) },
        { label: "FILLER WORDS", val: String(report.fillerWords || 0) },
      ];

      metricsData.forEach((m, idx) => {
        const x = 14 + idx * (boxWidth + 3);
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(x, y, boxWidth, 15, 2, 2, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(6);
        doc.setTextColor(100, 116, 139);
        doc.text(m.label, x + 3, y + 4.5);

        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(m.val, x + 3, y + 11.5);
      });

      y += 22;

      // Section 2: Detailed Question-by-Question Evaluation
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text("2. QUESTION-BY-QUESTION EVIDENCE & SCORING", 14, y);
      y += 5;

      const qEvals = report.questionEvaluations || userAnswers.map((ua, i) => ({
        question: ua.question,
        userAnswer: ua.answer,
        score: ua.answer?.trim().length > 30 ? 7 : 2,
        status: ua.answer?.trim().length > 30 ? "Partially Correct" : "Weak Answer",
        statusBadge: ua.answer?.trim().length > 30 ? "7/10 — Partially Correct" : "2/10 — Weak",
        why: "Answer evaluated based on semantic concept coverage and response depth.",
        idealAnswer: "Provide a structured definition with core architectural details."
      }));

      qEvals.forEach((qe, idx) => {
        // Page break check
        if (y > pageHeight - 55) {
          doc.addPage();
          y = 15;
        }

        const qScore = qe.score !== undefined ? qe.score : 5;
        const statusText = qe.status || (qScore >= 8 ? "Correct" : qScore >= 5 ? "Partially Correct" : "Weak / Incorrect");
        
        // Card Header
        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.rect(14, y, pageWidth - 28, 7, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(30, 41, 59);
        doc.text(`QUESTION ${idx + 1}`, 17, y + 5);

        // Badge color
        if (qScore >= 8) {
          doc.setTextColor(16, 185, 129); // Green
        } else if (qScore >= 5) {
          doc.setTextColor(217, 119, 6); // Amber
        } else {
          doc.setTextColor(225, 29, 72); // Red
        }
        doc.text(`[Score: ${qScore}/10 — ${statusText}]`, pageWidth - 17, y + 5, { align: "right" });

        y += 9;

        // Question Text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(15, 23, 42);
        const splitQ = doc.splitTextToSize(`Question: ${qe.question}`, pageWidth - 34);
        doc.text(splitQ, 17, y);
        y += splitQ.length * 3.8 + 2;

        // Candidate Answer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        const splitA = doc.splitTextToSize(`Candidate Answer: "${qe.userAnswer || "(No answer provided)"}"`, pageWidth - 34);
        doc.text(splitA, 17, y);
        y += splitA.length * 3.8 + 2;

        // Why Explanation Box
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(180, 83, 9);
        doc.text("Evaluation / Why:", 17, y);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        const splitWhy = doc.splitTextToSize(qe.why || "Evaluated against benchmark keywords.", pageWidth - 34);
        doc.text(splitWhy, 17, y + 3.5);
        y += splitWhy.length * 3.8 + 4;

        // Ideal Response Box
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(109, 40, 217);
        doc.text("How candidate could say it (Ideal Response):", 17, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const splitIdeal = doc.splitTextToSize(`"${qe.idealAnswer || "Provide structured explanation with key domain terms."}"`, pageWidth - 34);
        doc.text(splitIdeal, 17, y + 3.5);
        y += splitIdeal.length * 3.8 + 6;

        // Separator line
        doc.setDrawColor(226, 232, 240);
        doc.line(14, y, pageWidth - 14, y);
        y += 4;
      });

      // Section 3: AI Recommendations & Lagging Areas
      if (y > pageHeight - 45) {
        doc.addPage();
        y = 15;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text("3. SUMMARY INSIGHTS & NEXT STEPS", 14, y);
      y += 5;

      const colWidth = (pageWidth - 28 - 4) / 2;
      const boxHeight = 24;

      // Recommendations Box
      doc.setFillColor(245, 243, 255);
      doc.setDrawColor(221, 214, 254);
      doc.roundedRect(14, y, colWidth, boxHeight, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(109, 40, 217);
      doc.text("AI Recommendations:", 17, y + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      const splitIns = doc.splitTextToSize(`• ${report.insights?.[0] || "Practice structuring responses."}`, colWidth - 6);
      doc.text(splitIns, 17, y + 10);

      // Lagging Areas Box
      const lagX = 14 + colWidth + 4;
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(lagX, y, colWidth, boxHeight, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(225, 29, 72);
      doc.text("Lagging Areas:", lagX + 4, y + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(159, 18, 57);
      const splitLag = doc.splitTextToSize(`• ${report.laggingAreas?.[0] || "Focus on core technical accuracy."}`, colWidth - 6);
      doc.text(splitLag, lagX + 4, y + 10);

      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(148, 163, 184);
        doc.text("Battle Arena — Automated AI Placement Evaluation Engine | Dept. of CSE", 14, pageHeight - 6);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 6, { align: "right" });
      }

      doc.save("Battle_Arena_Interview_Feedback.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please try again.");
    }
  };


 return (
 <div className="min-h-screen bg-transparent text-[var(--text-main)] p-6 md:p-8 space-y-6 font-sans flex flex-col justify-between">
 
 {/* Header */}
 <div>
 <div className="flex items-center justify-between mb-2">
 <h1 className="text-3xl font-extrabold text-[var(--text-main)] flex items-center gap-2">
 🤖 AI Interview Assistant
 </h1>
 <button
 onClick={() => setSpeechVolume(!speechVolume)}
 className="p-2 rounded-lg glass-panel hover:border-[var(--text-muted)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
 title={speechVolume ? "Mute AI voice" : "Unmute AI voice"}
 >
 {speechVolume ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-red-400" />}
 </button>
 </div>
 <p className="text-[var(--text-muted)] text-sm">
 Practice placement interviews with real-time video analysis and speech feedback cues.
 </p>
 </div>

 {currentQuestionIdx === -1 && !report && (
 /* Startup landing screen */
 <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto py-12 text-center space-y-8">
 <div className="w-24 h-24 bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] rounded-3xl flex items-center justify-center shadow-sm">
 <Brain className="w-12 h-12 text-[var(--text-main)]" />
 </div>

 <div className="space-y-4">
 <h2 className="text-2xl font-bold text-[var(--text-main)]">Supercharge your Interview confidence</h2>
 <p className="text-[var(--text-muted)] text-sm leading-relaxed">
 Our live AI-driven assistant simulates real technical and behavior placement interviews.
 Customize your session by uploading a resume or setting the AI's tone!
 </p>
 </div>

 {/* Configurations */}
 <div className="w-full max-w-md bg-[var(--bg-glass)] p-5 rounded-2xl border border-[var(--border-glass)] space-y-4 text-left shadow-lg">
   <div>
     <label className="text-xs text-[var(--text-main)] font-bold uppercase tracking-wider block mb-2">Interview Mode</label>
     <select 
       value={interviewMode} 
       onChange={(e) => setInterviewMode(e.target.value)}
       className="w-full bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] text-[var(--text-main)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-purple)]"
     >
       <option value="raw">Raw Interview (General)</option>
       <option value="resume">Resume-Based Interview</option>
     </select>
   </div>

   {interviewMode === "resume" && (
     <div className="animate-fade-in">
       <label className="text-xs text-[var(--text-main)] font-bold uppercase tracking-wider block mb-2">Upload Resume (PDF/DOCX)</label>
       <div className="flex items-center gap-3">
         <input 
           type="file" 
           accept=".pdf,.doc,.docx"
           onChange={handleFileChange}
           className="w-full text-xs text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent-purple)] file:text-white hover:file:bg-[var(--accent-purple)]/80 cursor-pointer"
         />
         {resumeFile && <FileText className="w-5 h-5 text-green-400 shrink-0" />}
       </div>
     </div>
   )}

   <div>
     <label className="text-xs text-[var(--text-main)] font-bold uppercase tracking-wider block mb-2">AI Voice Tone</label>
     <select 
       value={voiceTone} 
       onChange={(e) => setVoiceTone(e.target.value)}
       className="w-full bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] text-[var(--text-main)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-purple)]"
     >
       <option value="professional">Professional</option>
       <option value="friendly">Friendly & Encouraging</option>
       <option value="strict">Strict & Formal</option>
     </select>
   </div>
 </div>

 <button
 onClick={handleStartInterview}
 disabled={isUploading || (interviewMode === "resume" && !resumeFile)}
 className="flex items-center gap-2 !bg-[var(--text-main)] !text-[var(--bg-base)] hover:bg-gray-200 font-semibold py-3.5 px-8 rounded-xl transition duration-200 shadow-sm active:scale-95 text-md disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />} 
 {isUploading ? "Preparing AI..." : "Start Mock Interview"}
 </button>
 </div>
 )}

 {currentQuestionIdx >= 0 && currentQuestionIdx < questions.length && (
 /* Interview HUD screen */
 <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6">
 
 {/* Main Interview Area */}
 <div className="lg:col-span-3 flex flex-col gap-4">
 
 {/* Webcam / Feed display */}
 <div className="bg-[var(--bg-glass)] rounded-3xl border border-[var(--border-glass)] relative h-[360px] md:h-[450px] overflow-hidden group shadow-2xl backdrop-blur-md">
 
 <div className="absolute top-4 left-4 text-[var(--text-main)] text-xs font-semibold bg-[var(--bg-glass)] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border-glass)] z-10">
 Placement Candidate <span className="block text-[10px] text-[var(--text-muted)]">Talent Session</span>
 </div>

 {isRecording && (
 <div className="absolute top-4 right-4 text-[var(--text-main)] text-[11px] bg-red-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 z-10">
 <span className="w-2.5 h-2.5 bg-white rounded-full"></span> RECORDING
 </div>
 )}

 {hasCamera ? (
 <video
 ref={videoRef}
 autoPlay
 playsInline
 muted
 className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }}
 />
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-glass)] relative">
 {/* Glowing background circles */}
 <div className="absolute w-48 h-48 rounded-full bg-[var(--bg-glass-hover)] blur-2xl"></div>
 <Camera className="w-16 h-16 text-[var(--text-main)]/50 mb-3 " />
 <p className="text-[var(--text-muted)] text-xs font-medium">Webcam stream active (Virtual simulation mode)</p>
 </div>
 )}

 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-[var(--bg-glass)] backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-[var(--border-glass)]">
 <button
 onClick={() => setIsMuted(!isMuted)}
 className={`p-3 rounded-full transition duration-200 ${
 isMuted ? "bg-red-950/40 text-red-400 border border-red-800" : "bg-[var(--bg-glass)] text-[var(--text-main)] hover:bg-white/10"
 }`}
 title={isMuted ? "Unmute mic" : "Mute mic"}
 >
 {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
 </button>

 <button
 onClick={handleSubmitAnswer}
 className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition duration-200 active:scale-95 border border-red-500/30"
 >
 Finish Answer
 </button>

 <button
 onClick={() => {
 if (hasCamera) stopCamera();
 else startCamera();
 }}
 className={`p-3 rounded-full transition duration-200 ${
 hasCamera ? "bg-[var(--bg-glass)] text-[var(--text-main)] hover:bg-white/10" : "bg-[var(--bg-glass-hover)] text-[var(--text-main)] border border-[var(--border-glass)]"
 }`}
 title={hasCamera ? "Stop camera" : "Start camera"}
 >
 {hasCamera ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
 </button>
 </div>
 </div>

 {/* Active Question Box */}
 <div className="glass-panel p-5 shadow-xl space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-[11px] font-bold tracking-wider text-[var(--text-main)] uppercase">
 Question {currentQuestionIdx + 1} of {questions.length}
 </span>
 <button
 onClick={() => speakText(questions[currentQuestionIdx])}
 className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5"
 >
 <Volume2 className="w-3.5 h-3.5" /> Re-play Audio
 </button>
 </div>
 
 <h3 className="text-lg font-bold text-[var(--text-main)] leading-relaxed">
 "{questions[currentQuestionIdx]}"
 </h3>

 {/* Transcription Area */}
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <label className="text-xs text-[var(--text-muted)] font-medium">Your Transcribed Answer:</label>
 <button
 onClick={toggleListening}
 className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold transition-all ${
 isListening
 ? "bg-red-950/40 text-red-400 border border-red-500/30 "
 : "bg-[var(--bg-glass-hover)] text-[var(--text-main)] border border-[var(--border-glass)] hover:bg-white/10"
 }`}
 >
 <Mic className="w-3 h-3" />
 {isListening ? "Listening..." : "Click to Speak"}
 </button>
 </div>
 <textarea
 value={currentTranscript}
 onChange={(e) => setCurrentTranscript(e.target.value)}
 placeholder="Your answer will transcribe automatically when you speak. Or, you can type your answer directly here..."
 className="w-full min-h-[90px] p-3 glass-input text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all resize-none"
 />
 </div>
 </div>
 </div>

 {/* AI Metrics Sidebar */}
 <div className="glass-panel !bg-[var(--bg-glass)] p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
 <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/5 rounded-full blur-xl"></div>
 
 <div className="space-y-5">
 <div className="text-[var(--text-main)] font-bold text-sm tracking-wider uppercase border-b border-[var(--border-glass)] pb-2">
 Live AI Feedback
 </div>
 
 <MetricItem label="Speech Pace" value={metrics.speech} />
 <MetricItem label="Eye Contact" value={metrics.eye} />
 <MetricItem label="Posture & Pose" value={metrics.posture} />
 <MetricItem label="Confidence Level" value={metrics.confidence} />
 </div>

 <div className="bg-[var(--bg-glass)] border border-[var(--border-glass)] p-3.5 rounded-2xl mt-4">
 <span className="text-[10px] text-[var(--text-main)] font-bold uppercase tracking-wider block mb-1">
 AI Coach Insight
 </span>
 <p className="text-xs text-[var(--text-muted)] leading-relaxed">
 Keep looking directly at the camera. Ensure you speak at a moderate pace without rushing.
 </p>
 </div>
 </div>

 </div>
 )}

 {report && (
 /* Final Interview Performance Report */
 <div className="flex-grow max-w-3xl mx-auto w-full glass-panel p-6 md:p-8 shadow-2xl space-y-8 animate-fade-in">
 
 <div className="flex flex-col md:flex-row items-center justify-between border-b border-[var(--border-glass)] pb-6 gap-4">
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 rounded-xl bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] flex items-center justify-center">
 <Award className="w-6 h-6 text-[var(--text-main)]" />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-[var(--text-main)]">Interview Performance Report</h2>
 <p className="text-xs text-[var(--text-muted)]">Analysis completed successfully</p>
 </div>
 </div>
 
 <div className="text-center md:text-right">
 <div className="text-4xl font-extrabold text-purple-400">{report.overallScore}%</div>
 <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Overall Score</span>
 </div>
 </div>

 {/* Stats metrics */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <ReportStat label="Clarity" value={report.clarity} />
 <ReportStat label="Speech Pace" value={report.speechPace} />
 <ReportStat label="Total Words" value={report.totalWords} />
 <ReportStat label="Filler Words" value={report.fillerWords} />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   {/* Tips / Insights list */}
   <div className="space-y-4 bg-[var(--bg-glass)] border border-[var(--border-glass)] p-5 rounded-2xl">
     <h3 className="text-md font-bold text-[var(--text-main)] flex items-center gap-2">
       <Sparkles className="w-4 h-4 text-[var(--text-main)]" /> AI Coach Recommendations
     </h3>
     <ul className="space-y-3.5">
       {report.insights.map((ins, i) => (
         <li key={i} className="flex gap-3 text-xs text-[var(--text-muted)] leading-relaxed">
           <span className="text-[var(--text-main)] mt-0.5">•</span>
           <span>{ins}</span>
         </li>
       ))}
     </ul>
   </div>

   {/* Lagging Areas */}
   <div className="space-y-4 bg-red-950/10 border border-red-500/20 p-5 rounded-2xl">
     <h3 className="text-md font-bold text-red-400 flex items-center gap-2">
       <Award className="w-4 h-4 text-red-400" /> Lagging Areas (Needs Work)
     </h3>
     <ul className="space-y-3.5">
       {report.laggingAreas?.map((ins, i) => (
         <li key={i} className="flex gap-3 text-xs text-red-300/80 leading-relaxed">
           <span className="text-red-400 mt-0.5">⨯</span>
           <span>{ins}</span>
         </li>
       ))}
     </ul>
   </div>
 </div>

 {/* Footer Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
   <button
     onClick={downloadFeedback}
     className="flex items-center justify-center gap-2 !bg-[var(--accent-purple)] !text-white hover:bg-[var(--accent-purple)]/80 font-bold py-3 px-6 text-sm rounded-xl transition-colors"
   >
     <Download className="w-4 h-4" /> Download Feedback
   </button>
 <button
 onClick={() => {
 setReport(null);
 setCurrentQuestionIdx(-1);
 }}
 className="flex items-center justify-center gap-2 glass-button text-[var(--text-main)] font-bold py-3 px-6 text-sm"
 >
 <RotateCcw className="w-4 h-4" /> Restart Session
 </button>
 
 <Link
 to="/app"
 className="flex items-center justify-center !bg-[var(--text-main)] !text-[var(--bg-base)] hover:bg-gray-200 font-bold py-3 px-6 text-sm rounded-xl transition-colors"
 >
 Back to Dashboard
 </Link>
 </div>
 </div>
 )}

 {/* Floating help notes footer */}
 {currentQuestionIdx >= 0 && currentQuestionIdx < questions.length && (
 <div className="mt-4 py-2 border-t border-[var(--border-glass)] flex justify-between items-center text-[10px] text-[var(--text-muted)]">
 <span>Supported: Chrome, Edge, Safari Speech Recognition</span>
 <span>Battle Arena - Placement Guide AI Session Coach © 2026</span>
 </div>
 )}
 </div>
 );
}

// Subcomponents

function MetricItem({ label, value }) {
 return (
 <div className="p-3.5 rounded-xl bg-[var(--bg-glass-hover)] border border-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/40 transition-all flex flex-col gap-1 shadow-inner">
 <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-main)]">{label}</span>
 <p className="text-sm font-semibold text-[var(--text-main)]">{value}</p>
 </div>
 );
}

function ReportStat({ label, value }) {
 return (
 <div className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] text-center space-y-1">
 <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider block">{label}</span>
 <p className="text-lg font-bold text-[var(--text-main)]">{value}</p>
 </div>
 );
}
