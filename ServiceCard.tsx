import React, { useState, useEffect, useRef } from 'react';
import { Service } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface ServiceCardProps {
    service: Service;
    onSelect: (id: number) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        const currentCardRef = cardRef.current;
        if (currentCardRef) {
            observer.observe(currentCardRef);
        }

        return () => {
            if (currentCardRef) {
                observer.unobserve(currentCardRef);
            }
        };
    }, []);
    
    const whatsappMessage = `مرحباً، أنا مهتم بخدمة '${service.name}'.

وصف الخدمة: ${service.shortDescription}
السعر: ${service.price}

أود المتابعة لطلب هذه الخدمة.
الاسم: [الرجاء إدخال اسمك هنا]`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex(prev => (prev + 1) % service.imageUrls.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex(prev => (prev - 1 + service.imageUrls.length) % service.imageUrls.length);
    };
    
    const handleCardClick = () => {
        onSelect(service.id);
    };

    return (
        <div 
            ref={cardRef} 
            className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-700 ease-out hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick() }}
            aria-label={`View details for ${service.name}`}
        >
            <div className="h-56 overflow-hidden relative group">
                <img src={service.imageUrls[currentImageIndex]} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {service.imageUrls.length > 1 && (
                    <>
                        <button onClick={prevImage} aria-label="Previous Image" className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={nextImage} aria-label="Next Image" className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-[#2c3e50]">{service.name}</h3>
                <p className="text-slate-600 mb-4 h-20">{service.shortDescription}</p>
                
                <ul className="mb-6 space-y-2">
                    {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <i className="fas fa-check text-blue-500 ml-3"></i>
                            <span className="text-slate-700">{feature}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-2xl font-extrabold text-[#2c3e50]">{service.price}</div>
                        <div className="flex items-center text-slate-500 text-sm">
                            <i className={`${service.scent.icon} text-[#f39c12] ml-2`}></i>
                            <span>{service.scent.text}</span>
                        </div>
                    </div>
                    
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-center block bg-green-500 text-white py-3 px-6 rounded-md font-bold transition-colors duration-300 hover:bg-green-600"
                    >
                        <i className="fab fa-whatsapp mr-2"></i> اطلب via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};