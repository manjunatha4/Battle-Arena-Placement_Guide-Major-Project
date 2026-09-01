export default function Footer() {
 return (
 <>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border-glass)] to-transparent mt-20 mb-10"></div>
 {/* Footer Section */}
 <footer className="relative w-full bg-transparent text-[var(--text-main)] py-12 px-6">
 <div className="container mx-auto glass-panel p-8 md:p-10">
 <div className="flex flex-col items-center justify-center text-center">
 {/* Contact */}
 <div className="mb-8">
 <h3 className="text-xl font-semibold mb-4">Contact</h3>
 <ul className="space-y-2 text-[var(--text-muted)]">
 <li>Email: battlearean56@gmail.com</li>
 <li>Phone: 7204620982</li>
 <li>Address: tumkur, krnataka</li>
 </ul>
 </div>
 </div>

 {/* Copyright */}
 <div className="border-t border-[var(--border-glass)] pt-8 text-center text-[var(--text-muted)] w-full">
 <p>&copy; 2026 Battle Arena. All rights reserved.</p>
 </div>
 </div>
 </footer>
    </>
  );
}