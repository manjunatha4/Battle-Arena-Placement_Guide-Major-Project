import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

export const AssignmentList = ({ assignments, onToggleComplete }) => {
 return (
 <div className="space-y-4">
 {assignments.map(assignment => (
 <div
 key={assignment.id}
 className="bg-zinc-900 p-4 rounded-lg flex items-center justify-between border border-zinc-800"
 >
 <div>
 <div className="flex items-center gap-3">
 <h3 className="text-[var(--text-main)] font-medium">{assignment.title}</h3>
 <span className={`px-2 py-1 rounded text-xs ${
 assignment.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
 assignment.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
 'bg-red-500/20 text-red-300'
 }`}>
 {assignment.difficulty}
 </span>
 </div>
 <p className="text-[var(--text-muted)] text-sm mt-1">Platform: {assignment.platform}</p>
 </div>
 <div className="flex items-center gap-4">
 <a 
 href={assignment.link}
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--text-muted)] hover:text-[var(--text-muted)] transition-colors"
 >
 <ExternalLink size={20} />
 </a>
 <button
 onClick={() => onToggleComplete(assignment.id)}
 className={`${
 assignment.completed ? 'text-green-400' : 'text-[var(--text-muted)]'
 } hover:text-[var(--text-muted)] transition-colors`}
 >
 <CheckCircle size={20} />
 </button>
 </div>
 </div>
 ))}
 </div>
 );
};