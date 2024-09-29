import { CircleDollarSign, LayoutDashboard, ListChecks } from 'lucide-react';

import { AlertBanner } from '~/components/alert-banner';
import { IconBadge } from '~/components/icon-badge';

import { CategoryForm } from './_components/category-form';
import { CourseActions } from './_components/course-action';
import { DescriptionForm } from './_components/description-form';
import { ImageForm } from './_components/image-form';
import { ModulesForm } from './_components/module-form';
import { PriceForm } from './_components/price-form';
import { QuizSetForm } from './_components/quiz-set-form';
import { TitleForm } from './_components/title-form';

export default function EditCourse() {
  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: 'Reactive Accelerator',
              }}
              courseId={1}
            />
            <DescriptionForm initialData={{}} courseId={1} />
            <ImageForm initialData={{}} courseId={1} />
            <CategoryForm initialData={{}} courseId={1} />

            <QuizSetForm initialData={{}} courseId={1} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-6 flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm initialData={[]} courseId={[]} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm initialData={{}} courseId={1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
