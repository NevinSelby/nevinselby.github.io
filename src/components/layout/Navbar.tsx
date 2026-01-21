import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import logo from '@/assets/logo.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Experience', path: '/experience' },
        { name: 'Projects', path: '/projects' },
        { name: 'Publications', path: '/publications' },
        { name: 'Newsletter', path: '/newsletter' },
        { name: 'Media', path: '/media' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 py-3 shadow-sm' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2 group z-50 relative">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-10 h-10 object-contain rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled || isOpen ? 'text-gray-900' : 'text-gray-900'}`}>
                        Nevin<span className="text-primary">.Selby</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path}>
                            <div className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${location.pathname === link.path
                                ? 'bg-blue-50 text-primary'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                }`}>
                                {link.name}
                            </div>
                        </Link>
                    ))}
                    <div className="ml-4 pl-4 border-l border-gray-200">
                        <Link to="/contact">
                            <Button size="sm">Lets Talk</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-gray-800 hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                        <Button size="lg" className="w-48">Lets Talk</Button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};
