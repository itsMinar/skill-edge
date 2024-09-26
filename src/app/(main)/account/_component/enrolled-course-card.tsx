import Image from 'next/image';

import { BookOpen } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { type Assessment } from '~/server/models/assessment';
import { getCategoryDetails } from '~/server/queries/categories';
import { getAReport } from '~/server/queries/reports';
import { IEnrollmentExtended } from '~/types';

type EnrolledCourseCardProps = {
  enrollment: IEnrollmentExtended;
};

export async function EnrolledCourseCard({
  enrollment,
}: EnrolledCourseCardProps) {
  const courseCategory = await getCategoryDetails(
    enrollment.course.category.toString()
  );

  const filter = {
    course: enrollment?.course?._id as string,
    student: enrollment?.student.toString(),
  };

  const report = await getAReport(filter);

  // Total Completed Modules
  const totalCompletedModules = report?.totalCompletedModules?.length;

  // Get all Quizzes and Assessments
  const quizzes: Assessment[] = report?.quizAssessment?.assessments;
  const totalQuizzes = quizzes?.length;

  // Find attempted quizzes
  const quizzesTaken = quizzes.filter((q) => q.attempted);

  const totalCorrect = quizzesTaken
    .map((quiz) => {
      const options = quiz.options;
      return options.filter((option) => {
        return option.isCorrect === true && option.isSelected === true;
      });
    })
    .filter((elem) => elem.length > 0)
    .flat();

  const marksFromQuizzes = totalCorrect?.length * 5;

  const otherMarks = report?.quizAssessment?.otherMarks;

  const totalMarks = marksFromQuizzes + otherMarks;

  return (
    <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={enrollment.course.thumbnail as string}
          alt={enrollment.course.title}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="line-clamp-2 text-lg font-medium group-hover:text-sky-700 md:text-base">
          {enrollment.course.title}
        </div>
        <p className="text-xs text-muted-foreground">{courseCategory.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{enrollment.course.modules.length} Chapters</span>
          </div>
        </div>
        <div className="mb-2 border-b pb-2">
          <div className="flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Total Modules: {enrollment.course.modules.length}
            </p>
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Completed Modules <Badge>{totalCompletedModules}</Badge>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Total Quizzes: {totalQuizzes}
            </p>

            <p className="text-md font-medium text-slate-700 md:text-sm">
              Quiz taken <Badge>{quizzesTaken.length}</Badge>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Mark from Quizzes
            </p>

            <p className="text-md font-medium text-slate-700 md:text-sm">
              {marksFromQuizzes}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Others
            </p>
            <p className="text-md font-medium text-slate-700 md:text-sm">
              {otherMarks}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-md font-medium text-slate-700 md:text-sm">
            Total Marks
          </p>
          <p className="text-md font-medium text-slate-700 md:text-sm">
            {totalMarks}
          </p>
        </div>
      </div>
    </div>
  );
}
