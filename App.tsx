import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Service } from './types';
import { INITIAL_SERVICES, ADMIN_PASSCODE } from './constants';
import { ServicePage } from './components/ServicePage';

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const savedServices = window.localStorage.getItem('services');
      return savedServices ? JSON.parse(savedServices) : INITIAL_SERVICES;
    } catch (error) {
      console.error("Error reading services from localStorage", error);
      return INITIAL_SERVICES;
    }
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const savedIsAdmin = window.localStorage.getItem('isAdmin');
      return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return false;
    }
  });

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      window.localStorage.setItem('services', JSON.stringify(services));
    } catch (error) {
      console.error("Error writing services to localStorage", error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('لا يمكن حفظ التغييرات. مساحة التخزين ممتلئة. يرجى إزالة بعض الصور أو الخدمات.');
      }
    }
  }, [services]);

  const handleSearch = useCallback((term: string) => {
    if (term.trim() === ADMIN_PASSCODE) {
      setIsAdmin(true);
      setSelectedServiceId(null);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
  }, []);
  
  const handleSelectService = useCallback((id: number) => {
    setSelectedServiceId(id);
    window.scrollTo(0, 0);
  }, []);

  const handleDeselectService = useCallback(() => {
    setSelectedServiceId(null);
  }, []);

  const selectedService = services.find(s => s.id === selectedServiceId);

  const addService = useCallback((service: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...service, id: Date.now() }]);
  }, []);

  const updateService = useCallback((updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  }, []);

  const deleteService = useCallback((id: number) => {
    if(window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
       setServices(prev => prev.filter(s => s.id !== id));
    }
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800">
      <Header onSearch={handleSearch} />
      <main>
        {selectedService ? (
            <ServicePage service={selectedService} onBack={handleDeselectService} />
        ) : (
            <>
                <Hero />
                <ServicesSection services={services} onSelectService={handleSelectService} />
            </>
        )}
        {isAdmin && !selectedServiceId && (
          <AdminPanel 
            services={services} 
            onAddService={addService} 
            onUpdateService={updateService}
            onDeleteService={deleteService}
            onLogout={handleLogout}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;