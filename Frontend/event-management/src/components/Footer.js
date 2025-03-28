// import React from "react";
// import { Link } from "react-router-dom";
// import { Home, Users, Calendar, PlusCircle } from 'lucide-react';

// const Footer = () => {
//     return (
//         <footer className="bg-[#054e85] text-white py-6 border-t border-[#58585a]/20 shadow-lg">
//             <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
//                 {/* Branding */}
//                 <div className="flex items-center space-x-4">
//                     <h3 className="text-xl font-bold text-white tracking-wide drop-shadow-md">
//                         Event Manager
//                     </h3>
//                     <div className="hidden md:block border-l-2 border-white/40 h-8"></div>
//                     <p className="text-sm text-white/80">
//                         © {new Date().getFullYear()} All Rights Reserved
//                     </p>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
//                     <FooterLink to="/" label="Home" icon={<Home size={18} />} />
//                     <FooterLink to="/students" label="Students" icon={<Users size={18} />} />
//                     <FooterLink to="/calendar" label="Calendar" icon={<Calendar size={18} />} />
//                     <FooterLink to="/create" label="Create Event" icon={<PlusCircle size={18} />} />
//                 </div>
//             </div>
//         </footer>
//     );
// };

// // Helper Component for Footer Links
// const FooterLink = ({ to, label, icon }) => (
//     <Link
//         to={to}
//         className="flex items-center space-x-2 text-white hover:text-[#fece00] transition-colors duration-300 group"
//     >
//         {icon}
//         <span className="relative">
//             {label}
//             <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#fece00]/0 group-hover:bg-[#fece00]/50 transition-all duration-300"></span>
//         </span>
//     </Link>
// );

// export default Footer;




import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Calendar, PlusCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#054e85] text-white py-6 border-t border-[#58585a]/20 shadow-lg z-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Branding */}
                <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-bold text-white tracking-wide drop-shadow-md">
                        Event Manager
                    </h3>
                    <div className="hidden md:block border-l-2 border-white/40 h-8"></div>
                    <p className="text-sm text-white/80">
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>

                {/* Navigation Links */}
                {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    <FooterLink to="/" label="Home" icon={<Home size={18} />} />
                    <FooterLink to="/students" label="Students" icon={<Users size={18} />} />
                    <FooterLink to="/calendar" label="Calendar" icon={<Calendar size={18} />} />
                    <FooterLink to="/create" label="Create Event" icon={<PlusCircle size={18} />} />
                </div> */}
            </div>
        </footer>
    );
};

// Helper Component for Footer Links
const FooterLink = ({ to, label, icon }) => (
    <Link
        to={to}
        className="flex items-center space-x-2 text-white hover:text-[#fece00] transition-colors duration-300 group"
    >
        {icon}
        <span className="relative">
            {label}
            <span dermalassName="absolute -bottom-1 left-0 w-full h-0.5 bg-[#fece00]/0 group-hover:bg-[#fece00]/50 transition-all duration-300"></span>
        </span>
    </Link>
);

export default Footer;