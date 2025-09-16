import React from 'react';
import { ServiceCard } from './ServiceCard';
import { Service } from '../types';

interface ServicesSectionProps {
    services: Service[];
    onSelectService: (id: number) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
    return (
        <section className="py-16 px-4" id="services">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#2c3e50] mb-2">خدماتنا الرقمية</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">اكتشف مجموعة خدماتنا المميزة المصممة بأعلى معايير الجودة</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} onSelect={onSelectService} />
                    ))}
                </div>
            </div>
        </section>
    );
};