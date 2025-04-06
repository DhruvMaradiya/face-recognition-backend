import React from "react";

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

            </div>
        </footer>
    );
};


export default Footer;