import React, { useState } from 'react';
import { Service } from '../types';

interface AdminPanelProps {
    services: Service[];
    onAddService: (service: Omit<Service, 'id'>) => void;
    onUpdateService: (service: Service) => void;
    onDeleteService: (id: number) => void;
    onLogout: () => void;
}

const ServiceForm: React.FC<{
    service?: Service | null;
    onSave: (service: Omit<Service, 'id'> | Service) => void;
    onCancel: () => void;
}> = ({ service, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: service?.name || '',
        shortDescription: service?.shortDescription || '',
        price: service?.price || '',
        imageUrls: service?.imageUrls || [],
        features: service?.features.join('\n') || '',
        scentText: service?.scent.text || '',
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setIsUploading(true);

        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        resolve(event.target.result as string);
                    } else {
                        reject(new Error("Failed to read file"));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const base64Images = await Promise.all(imagePromises);
            setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...base64Images] }));
        } catch (error) {
            console.error("Error reading files:", error);
            alert("حدث خطأ أثناء تحميل الصور.");
        } finally {
            setIsUploading(false);
            e.target.value = ''; // Reset file input
        }
    };
    
    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.imageUrls.length === 0) {
            alert("يرجى تحميل صورة واحدة على الأقل.");
            return;
        }

        const serviceData = {
            name: formData.name,
            shortDescription: formData.shortDescription,
            price: formData.price,
            imageUrls: formData.imageUrls,
            features: formData.features.split('\n').filter(f => f.trim() !== ''),
            scent: { icon: 'fa-solid fa-star', text: formData.scentText },
        };

        if (service && 'id' in service) {
            onSave({ ...serviceData, id: service.id });
        } else {
            onSave(serviceData);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">{service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h3>
            <div>
                <label className="block mb-1 font-semibold">اسم الخدمة</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block mb-1 font-semibold">الوصف المختصر</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block mb-1 font-semibold">السعر</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block mb-1 font-semibold">الصور</label>
                <div className="border-2 border-dashed border-slate-300 p-4 rounded-md text-center">
                    <input type="file" id="imageUpload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                    <label htmlFor="imageUpload" className={`cursor-pointer bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                         {isUploading ? 'جاري التحميل...' : 'اختر الصور'}
                    </label>
                    <p className="text-xs text-slate-500 mt-2">يمكنك اختيار صور متعددة</p>
                </div>
                {formData.imageUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <label className="block mb-1 font-semibold">المميزات (كل ميزة في سطر)</label>
                <textarea name="features" value={formData.features} onChange={handleChange} rows={4} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block mb-1 font-semibold">نص الرائحة الرمزية</label>
                <input type="text" name="scentText" value={formData.scentText} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="bg-slate-400 text-white px-4 py-2 rounded hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">حفظ</button>
            </div>
        </form>
    );
};


export const AdminPanel: React.FC<AdminPanelProps> = ({ services, onAddService, onUpdateService, onDeleteService, onLogout }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingService(null);
        setIsFormVisible(true);
    };
    
    const handleSave = (service: Omit<Service, 'id'> | Service) => {
        if ('id' in service) {
            onUpdateService(service);
        } else {
            onAddService(service);
        }
        setIsFormVisible(false);
        setEditingService(null);
    };

    return (
        <section className="bg-slate-100 py-16 px-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-[#2c3e50]">لوحة تحكم المالك</h2>
                    <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-md font-bold hover:bg-red-600">
                        تسجيل الخروج
                    </button>
                </div>

                {isFormVisible ? (
                    <ServiceForm service={editingService} onSave={handleSave} onCancel={() => setIsFormVisible(false)} />
                ) : (
                    <div>
                        <button onClick={handleAddNew} className="bg-green-500 text-white py-2 px-5 mb-6 rounded-md font-bold hover:bg-green-600">
                           <i className="fas fa-plus mr-2"></i> إضافة خدمة جديدة
                        </button>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                          <table className="w-full text-right">
                              <thead className="bg-slate-200">
                                  <tr>
                                      <th className="p-4">اسم الخدمة</th>
                                      <th className="p-4">السعر</th>
                                      <th className="p-4">إجراءات</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {services.map(service => (
                                      <tr key={service.id} className="border-b last:border-b-0">
                                          <td className="p-4">{service.name}</td>
                                          <td className="p-4">{service.price}</td>
                                          <td className="p-4 space-x-reverse space-x-2">
                                              <button onClick={() => handleEdit(service)} className="text-blue-500 hover:text-blue-700"><i className="fas fa-edit"></i> تعديل</button>
                                              <button onClick={() => onDeleteService(service.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i> حذف</button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};