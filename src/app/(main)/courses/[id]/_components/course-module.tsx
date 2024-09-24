import { Video } from 'lucide-react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { IModuleExtended } from '~/types';

import { CourseLesson } from './course-lesson';

type CourseModuleProps = {
  module: IModuleExtended;
};

export function CourseModule({ module }: CourseModuleProps) {
  return (
    <AccordionItem className="border-none" value={module._id as string}>
      <AccordionTrigger>{module.title}</AccordionTrigger>
      <AccordionContent>
        <div className="mb-6 mt-4 flex flex-wrap items-center gap-x-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Video className="h-4 w-4" />
            {(module?.duration / 60).toPrecision(2)} Hours
          </span>
        </div>

        <div className="space-y-3">
          {module.lessonIds &&
            module.lessonIds.length > 0 &&
            module.lessonIds.map((lessonId) => (
              <CourseLesson
                key={lessonId.toString()}
                lessonId={lessonId.toString()}
              />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
