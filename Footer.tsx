
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#2c3e50] text-white pt-12 pb-6 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#f39c12]">Al-Asani Digital Services</h3>
                        <p className="text-slate-300 mb-4">نقدم حلولاً رقمية مبتكرة تساعدك على النمو وتحقيق النجاح في عالم الأعمال الرقمية.</p>
                        <div className="flex space-x-reverse space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#f39c12]"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#f39c12]"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#f39c12]"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#f39c12]"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-[#f39c12]">روابط سريعة</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-300 hover:text-[#f39c12] transition-colors duration-300">الرئيسية</a></li>
                            <li><a href="#services" className="text-slate-300 hover:text-[#f39c12] transition-colors duration-300">الخدمات</a></li>
                            <li><a href="#" className="text-slate-300 hover:text-[#f39c12] transition-colors duration-300">من نحن</a></li>
                            <li><a href="#" className="text-slate-300 hover:text-[#f39c12] transition-colors duration-300">اتصل بنا</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-[#f39c12]">معلومات التواصل</h3>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-center"><i className="fas fa-envelope ml-3"></i> info@al-asani.com</li>
                            <li className="flex items-center"><i className="fas fa-phone ml-3"></i> +967 781 633 796</li>
                            <li className="flex items-center"><i className="fas fa-map-marker-alt ml-3"></i> اليمن، صنعاء</li>
                        </ul>
                    </div>
                </div>
                
                <div className="text-center pt-6 border-t border-white/10">
                    <p>&copy; 2024 Al-Asani Digital Services. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};
