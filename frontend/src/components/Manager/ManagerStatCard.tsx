import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  trendValue: string;
  isPositive: boolean;
}

export const ManagerStatCard = ({ title, value, unit, trendValue, isPositive }: Props) => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <p className="text-gray-500 font-bold text-sm mb-2">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mb-2">
        {value} {unit && <span className="text-sm font-bold">{unit}</span>}
      </h3>
      <p className={`${isPositive ? 'text-emerald-500' : 'text-red-500'} font-bold text-sm flex items-center gap-1`}>
        {isPositive ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
        {trendValue}
      </p>
    </div>
  );
};