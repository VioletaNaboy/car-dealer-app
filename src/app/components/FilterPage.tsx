'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Make } from './DropDownEl';
import { fetchMakesAndYear } from '../actions/getData';
import { DropDownEl } from './DropDownEl';

export const FilterPage = () => {
  const [make, setMake] = useState<number>();
  const [year, setYear] = useState<number>();
  const [makes, setMakes] = useState<Make[]>([]);
  const [years, setYears] = useState<number[]>([]);
  useEffect(() => {
    fetchMakesAndYear().then(({ makes, years }) => {
      setMakes(makes);
      setYears(years);
    });
  }, []);
  const handleSelectYear = (y: number) => {
    setYear(y);
  };
  const handleSelectMake = (m: number) => {
    setMake(m);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 sm:gap-12 justify-center">
      <div className="w-full flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center sm:justify-between">
        <DropDownEl array={makes} title="makes" func={handleSelectMake} />
        <DropDownEl array={years} title="years" func={handleSelectYear} />
      </div>
      <Link
        href={make && year ? `/result/${make}/${year}` : '#'}
        className={`w-2/3 max-w-xs inline-flex items-center justify-center rounded-md px-4 py-2 text-m font-medium 
        ${
          make && year
            ? 'text-blue-600 bg-blue-50 ring-blue-500'
            : 'text-gray-600 bg-gray-50 ring-gray-500/10 cursor-not-allowed'
        }
        ring-1 ring-inset`}
      >
        Next {'>'}
      </Link>
    </div>
  );
};
