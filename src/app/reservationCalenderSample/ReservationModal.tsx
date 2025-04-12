// ReservationModal.tsx
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ja';

// 予約フォームデータの型定義
export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: Date;
}

// モーダルのプロパティ型定義
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (formData: ReservationFormData) => void;
}

// 予約モーダルコンポーネント
const ReservationModal: React.FC<ModalProps> = ({ isOpen, onClose, selectedDate, onSubmit }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: selectedDate || new Date(),
  });

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">予約フォーム</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">予約日</label>
            <div className="text-gray-900 font-medium">
              {selectedDate && moment(selectedDate).format('YYYY年MM月DD日 (ddd)')}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">お名前</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="phone">電話番号</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              予約する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;