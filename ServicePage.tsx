import React, { useState } from 'react';
import { Service } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface ServicePageProps {
    service: Service;
    onBack: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, onBack }) => {
    const [selectedImage, setSelectedImage] = useState(service.imageUrls[0]);

    const whatsappMessage = `مرحباً، أنا مهتم بخدمة '${service.name}'.\n\nوصف الخدمة: ${service.shortDescription}\nالسعر: ${service.price}\n\nأود المتابعة لطلب هذه الخدمة.\nالاسم: [الرجاء إدخال اسمك هنا]`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section className="py-12 px-4 bg-white animate-fade-in">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <div className="container mx-auto">
                <button onClick={onBack} className="mb-8 text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-lg">
                    <i className="fas fa-arrow-right"></i>
                    العودة إلى كل الخدمات
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="mb-4 rounded-lg overflow-hidden shadow-lg border">
                            <img src={selectedImage} alt={service.name} className="w-full h-auto max-h-[500px] object-contain transition-all duration-300" />
                        </div>
                        {service.imageUrls.length > 1 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {service.imageUrls.map((url, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setSelectedImage(url)} 
                                        className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-all ${selectedImage === url ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <img src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Service Details */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-extrabold text-[#2c3e50] mb-4">{service.name}</h1>
                        <div className="flex items-center text-slate-500 text-md mb-6">
                            <i className={`${service.scent.icon} text-[#f39c12] ml-2`}></i>
                            <span>{service.scent.text}</span>
                        </div>
                        <p className="text-slate-700 text-lg mb-6 leading-relaxed">{service.shortDescription}</p>
                        
                        <div className="border-t border-b border-slate-200 py-6 mb-6">
                             <h3 className="text-2xl font-bold mb-4 text-[#2c3e50]">المميزات الرئيسية</h3>
                             <ul className="space-y-3">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <i className="fas fa-check-circle text-blue-500 ml-3 mt-1"></i>
                                        <span className="text-slate-800 text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                       
                        <div className="mt-auto">
                           <div className="flex justify-between items-center mb-6 bg-slate-100 p-4 rounded-lg">
                                <span className="text-xl font-bold text-slate-600">السعر:</span>
                                <div className="text-3xl font-extrabold text-[#2c3e50]">{service.price}</div>
                            </div>
                            
                            <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full text-center block bg-green-500 text-white py-4 px-6 rounded-lg font-bold text-xl transition-transform duration-300 hover:bg-green-600 hover:scale-105 shadow-lg"
                            >
                                <i className="fab fa-whatsapp mr-3"></i> اطلب الآن عبر WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};