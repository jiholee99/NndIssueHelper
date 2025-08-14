import { useState } from 'react';
import { Menu, X } from "lucide-react";
import { NavLink } from 'react-router-dom';

export const NavbarButton = ({ text, onClick, to }) => (
    <NavLink to={to} id={to}>
        <button
            className="w-full text-left px-6 py-4 text-lg bg-gray-900 text-white hover:bg-gray-700 transition"
            onClick={onClick}
        >
            {text}
        </button>
    </NavLink>

);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Example menu actions
    const handleIssueTemplate = () => {
        setIsOpen(false);
        // Add navigation or logic here
    };
    const handleSettings = () => {
        setIsOpen(false);
        // Add navigation or logic here
    };
    const handleLogout = () => {
        setIsOpen(false);
        // Add logout logic here
    };

    return (
        <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-50 shadow-xl h-20 flex items-center px-4">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Logo */}
                <h1 className="text-white text-lg font-bold">LGESMI ISSUE Helper</h1>
                {/* Menu Button */}
                <button
                    className="flex items-center justify-center rounded-xl p-2 bg-gray-900 text-white hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {/* Dropdown Full Width Menu */}
            {isOpen && (
                <div className="fixed top-16 left-0 w-full bg-gray-900 z-50 flex flex-col shadow-2xl">
                    <NavbarButton text="Issue Template" to="/issueTemplate" onClick={handleIssueTemplate}/>
                    <NavbarButton text="Settings" to="/settings" onClick={handleSettings}/>
                </div>
            )}
        </nav>
    );
};

export default Navbar;