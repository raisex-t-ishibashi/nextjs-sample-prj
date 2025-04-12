// ReservationCalendar.tsx
import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, DateCellWrapperProps } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// 分離したコンポーネントのインポート
import ReservationModal, { ReservationFormData } from './ReservationModal';
import ReservationStatus, { ReservationStatus as ReservationStatusType } from './ReservationStatus';

// 日本語ロケールを設定
moment.locale('ja');
const localizer = momentLocalizer(moment);

// カレンダーのビュータイプ
type ViewType = 'month' | 'week';

// 予約情報の型定義
interface ReservationSlot {
  date: Date;
  status: ReservationStatusType;
}

// カレンダーコンポーネント
const ReservationCalendar: React.FC = () => {
  // 現在の日付を取得
  const today = new Date();
  
  // 初期の予約状態を設定（デモ用にランダムに設定）
  const generateInitialReservations = (): ReservationSlot[] => {
    const slots: ReservationSlot[] = [];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // 現在の月の日数を取得
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // 各日の予約状態を生成
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      
      // 週末は予約不可にする
      const isWeekend = date.getDay() === 0;
      const isPast = date < today;

      slots.push({
        date,
        status: isPast || isWeekend ? 'unavailable' : 'available',
      });
    }
    
    return slots;
  };

  // 状態管理
  const [currentView, setCurrentView] = useState<ViewType>('month');
  const [reservationSlots, setReservationSlots] = useState<ReservationSlot[]>(generateInitialReservations());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 日付をクリックしたときのハンドラ
  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      const reservationSlot = reservationSlots.find(
        slot => moment(slot.date).isSame(start, 'day')
      );
      
      if (reservationSlot?.status === 'available') {
        setSelectedDate(start);
        setModalOpen(true);
      }
    },
    [reservationSlots]
  );

  // 予約フォームを送信したときのハンドラ
  const handleReservationSubmit = (formData: ReservationFormData) => {
    // 予約状態を更新
    setReservationSlots(prev =>
      prev.map(slot =>
        moment(slot.date).isSame(formData.date, 'day')
          ? { ...slot, status: 'unavailable' }
          : slot
      )
    );
    
    // ここでAPIに予約データを送信する処理を実装
    console.log('予約データ:', formData);
    
    // 成功メッセージを表示（実際の実装では適切な通知システムを使用）
    alert('予約が完了しました！');
  };

  // カレンダーのメッセージをカスタマイズ
  const messages = {
    previous: '前へ',
    today: '今日',
    next: '次へ',
    month: '月',
    week: '週',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">「予約日時」の選択</h1>
      
      <div className="border rounded shadow-sm">
        <Calendar
          localizer={localizer}
          defaultDate={new Date(2025, 3, 12)}
          events={[
            {
              id: 1,
              title: '0 day duration',
              start: new Date(2025, 3, 8, 0, 0, 0),
              end: new Date(2025, 3, 8, 0, 0, 0),
              allDay: true
            },
            {
              id: 2,
              title: '1 day duration',
              start: new Date(2025, 3, 9, 0, 0, 0),
              end: new Date(2025, 3, 10, 0, 0, 0),
            },
          ]}
          views={{ month: true, week: true }}
          view={currentView}
          onView={(view) => setCurrentView(view as ViewType)}
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          messages={messages}
        />
      </div>
      
      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleReservationSubmit}
      />
    </div>
  );
};

export default ReservationCalendar;