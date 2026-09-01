import React, { useState } from 'react';
import { BookOpen, Code } from 'lucide-react';
import dsaTopics from '../data/dsaContent.js'; // Assuming this is the path to your data file
import { TopicCard } from '../components/dsa_content/TopicCard';
import { VideoPlayer } from '../components/dsa_content/VideoPlayer';
import { AssignmentList } from '../components/dsa_content/AssignmentList';

function DSAContent() {
 const [selectedTopic, setSelectedTopic] = useState(null);
 const [activeTab, setActiveTab] = useState('lectures');

 const [completedLectures, setCompletedLectures] = useState(() => {
 return JSON.parse(localStorage.getItem("completed_lectures") || "[]");
 });
 const [completedAssignments, setCompletedAssignments] = useState(() => {
 return JSON.parse(localStorage.getItem("completed_assignments") || "[]");
 });

 const handleLectureComplete = (lectureId) => {
 setCompletedLectures((prev) => {
 const updated = prev.includes(lectureId) ? prev : [...prev, lectureId];
 localStorage.setItem("completed_lectures", JSON.stringify(updated));
 return updated;
 });
 };

 const handleAssignmentToggle = (assignmentId) => {
 setCompletedAssignments((prev) => {
 const updated = prev.includes(assignmentId)
 ? prev.filter((id) => id !== assignmentId)
 : [...prev, assignmentId];
 localStorage.setItem("completed_assignments", JSON.stringify(updated));
 return updated;
 });
 };

 const lecturesWithStatus = selectedTopic?.lectures.map((lecture) => ({
 ...lecture,
 completed: completedLectures.includes(lecture.id),
 })) || [];

 const assignmentsWithStatus = selectedTopic?.assignments.map((assignment) => ({
 ...assignment,
 completed: completedAssignments.includes(assignment.id),
 })) || [];

 return (
 <div className="min-h-screen bg-transparent text-[var(--text-main)]">
 <div className="max-w-6xl mx-auto px-4 py-8">
 <h1 className="text-4xl font-bold text-center mb-12 text-[var(--text-main)]">
 DSA Learning Path
 </h1>

 {selectedTopic ? (
 <div>
 <button
 onClick={() => setSelectedTopic(null)}
 className="text-[var(--text-muted)] hover:text-[var(--text-main)] mb-6"
 >
 ← Back to Topics
 </button>

 <h2 className="text-2xl font-semibold mb-6">{selectedTopic.title}</h2>

 <div className="flex gap-4 mb-6">
 <button
 onClick={() => setActiveTab('lectures')}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
 activeTab === 'lectures'
 ? 'glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)]'
 : 'bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-glass-hover)]'
 }`}
 >
 <BookOpen size={20} />
 Lectures
 </button>
 <button
 onClick={() => setActiveTab('assignments')}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
 activeTab === 'assignments'
 ? 'glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)]'
 : 'bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-glass-hover)]'
 }`}
 >
 <Code size={20} />
 Assignments
 </button>
 </div>

 {activeTab === 'lectures' ? (
 <div className="grid gap-6">
 {lecturesWithStatus.map((lecture) => (
 <VideoPlayer
 key={lecture.id}
 lecture={lecture}
 onComplete={() => handleLectureComplete(lecture.id)}
 />
 ))}
 </div>
 ) : (
 <AssignmentList
 assignments={assignmentsWithStatus}
 onToggleComplete={handleAssignmentToggle}
 />
 )}
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {dsaTopics.map((topic) => (
 <TopicCard
 key={topic.id}
 topic={topic}
 onClick={() => setSelectedTopic(topic)}
 />
 ))}
 </div>
 )}
 </div>
 </div>
 );
}

export default DSAContent;
