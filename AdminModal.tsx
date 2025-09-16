
import React, { useState } from 'react';

interface AdminModalProps {
    onClose: () => void;
    onLogin: (passcode: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ onClose, onLogin }) => {
    const [passcode, setPasscode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(passcode);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative" dir="rtl">
                <button onClick={onClose} className="absolute top-4 left-4 text-slate-500 hover:text-slate-800 text-2xl">
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center mb-6 text-[#2c3e50]">دخول المالك</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="passcode" className="block text-slate-700 mb-2">الرجاء إدخال الكود الخاص</label>
                    <input
                        id="passcode"
                        type="password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none"
                        autoFocus
                    />
                    <button type="submit" className="w-full mt-6 bg-[#2c3e50] text-white py-3 rounded-md font-bold hover:bg-[#34495e] transition-colors">
                        دخول
                    </button>
                </form>
            </div>
        </div>
    );
};
