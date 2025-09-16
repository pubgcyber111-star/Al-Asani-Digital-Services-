
import React from 'react';

export const Hero: React.FC = () => {
    return (
        <section 
            className="bg-cover bg-center text-white py-24 px-4 text-center relative" 
            style={{backgroundImage: `url('https://picsum.photos/seed/hero/1200/800')`}}
        >
            <div className="absolute inset-0 bg-black/70 z-0"></div>
            <div className="container mx-auto relative z-10">
                <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">خدمات رقمية مميزة لتحقيق نجاحك</h2>
                <p className="text-xl max-w-3xl mx-auto mb-8 drop-shadow-md">
                    نقدم لكم مجموعة متكاملة من الخدمات الرقمية عالية الجودة التي صممت خصيصاً لتلبية احتياجاتكم وتحقيق أهدافكم
                </p>
                <a href="#services" className="inline-block bg-[#f39c12] text-white py-3 px-8 rounded-md text-lg font-bold cursor-pointer transition-transform duration-300 hover:bg-amber-600 hover:scale-105 shadow-lg">
                    استكشف خدماتنا
                </a>
            </div>
        </section>
    );
};
