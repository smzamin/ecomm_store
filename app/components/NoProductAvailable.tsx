'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10',
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          No Product Available
        </h2>
      </div>

      <p className="text-gray-600">
        We&apos;re sorry, but there are no products matching on{' '}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{' '}
        criteria at the moment.
      </p>

      <div className="flex items-center space-x-2 text-shop_dark_green">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>We&apos;re restocking shortly</span>
      </div>

      <p className="text-sm text-gray-500">
        Please check back later or explore our other product categories.
      </p>
    </div>
  );
};

export default NoProductAvailable;
