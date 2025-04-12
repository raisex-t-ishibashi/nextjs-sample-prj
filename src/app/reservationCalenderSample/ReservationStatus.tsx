// ReservationStatus.tsx
import React from 'react';

// 予約状態の型定義
export type ReservationStatus = 'available' | 'unavailable';

// 予約状態を表すコンポーネント
const ReservationStatus: React.FC<{ status: ReservationStatus }> = ({ status }) => {
  if (status === 'available') {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-400 font-bold text-xl">×</div>
      </div>
    );
  }
};

export default ReservationStatus;