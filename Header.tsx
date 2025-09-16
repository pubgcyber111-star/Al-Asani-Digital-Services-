
import React, { useState } from 'react';

interface HeaderProps {
    onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    
    return (
        <header className="bg-gradient-to-br from-[#2c3e50] to-[#3498db] text-white py-4 px-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">Al-Asani <span className="text-[#f39c12]">Digital Services</span></h1>
                </div>
                
                <nav className="hidden md:flex">
                    <ul className="flex space-x-reverse space-x-6 text-lg">
                        <li><a href="#" className="hover:text-[#f39c12] transition-colors duration-300">الرئيسية</a></li>
                        <li><a href="#services" className="hover:text-[#f39c12] transition-colors duration-300">الخدمات</a></li>
                        <li><a href="#" className="hover:text-[#f39c12] transition-colors duration-300">من نحن</a></li>
                        <li><a href="#" className="hover:text-[#f39c12] transition-colors duration-300">اتصل بنا</a></li>
                    </ul>
                </nav>
                
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="ابحث عن خدمة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-3 border-none rounded-r-md outline-none text-slate-800 focus:ring-2 focus:ring-[#f39c12] transition-shadow"
                    />
                    <button type="submit" className="bg-[#f39c12] border-none py-2 px-4 rounded-l-md cursor-pointer text-white hover:bg-amber-600 transition-colors duration-300">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
        </header>
    );
};
