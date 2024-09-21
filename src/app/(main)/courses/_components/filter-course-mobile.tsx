'use client';

import { useState } from 'react';

import { Filter } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Checkbox } from '~/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';

const PRICE_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
];

const CATEGORY_OPTIONS = [
  {
    id: 1,
    label: 'Design',
    value: 'design',
  },

  {
    id: 3,
    label: 'Development',
    value: 'development',
  },
  {
    id: 4,
    label: 'Marketing',
    value: 'marketing',
  },
  {
    id: 5,
    label: 'IT & Software',
    value: 'it-software',
  },
  {
    id: 6,
    label: 'Personal Development',
    value: 'personal-development',
  },
  {
    id: 7,
    label: 'Business',
    value: 'business',
  },
  {
    id: 8,
    label: 'Photography',
    value: 'photography',
  },
  {
    id: 9,
    label: 'Music',
    value: 'music',
  },
];

// Define the type for the filter state
interface FilterState {
  categories: string[];
  price: string[];
  sort: string;
}

// Define the type for the parameters of applyArrayFilter
interface FilterAction {
  type: keyof FilterState;
  value: string;
}

export function FilterCourseMobile() {
  const [filter, setFilter] = useState<FilterState>({
    categories: ['development'],
    price: ['free'],
    sort: '',
  });

  // Apply checkbox filter
  const applyArrayFilter = ({ type, value }: FilterAction) => {
    if (Array.isArray(filter[type])) {
      const isFilterApplied = (filter[type] as string[]).includes(value);

      setFilter((prev) => ({
        ...prev,
        [type]: isFilterApplied
          ? (prev[type] as string[]).filter((v) => v !== value)
          : [...(prev[type] as string[]), value],
      }));
    } else {
      // Handle non-array type (sort)
      setFilter((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Courses</SheetTitle>
            <Accordion defaultValue={['categories']} type="multiple">
              {/* Categories filter */}
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Categories</span>
                </AccordionTrigger>

                <AccordionContent className="animate-none pt-6">
                  <ul className="space-y-4">
                    {CATEGORY_OPTIONS.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <Checkbox
                          id={`category-${optionIdx}`}
                          onCheckedChange={() => {
                            applyArrayFilter({
                              type: 'categories',
                              value: option.value,
                            });
                          }}
                          checked={filter.categories.includes(option.value)}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 cursor-pointer text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {/* Price filter */}
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
                </AccordionTrigger>

                <AccordionContent className="animate-none pt-6">
                  <ul className="space-y-4">
                    {PRICE_OPTIONS.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <Checkbox
                          id={`price-${optionIdx}`}
                          onCheckedChange={() => {
                            applyArrayFilter({
                              type: 'price',
                              value: option.value,
                            });
                          }}
                          checked={filter.price.includes(option.value)}
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 cursor-pointer text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
