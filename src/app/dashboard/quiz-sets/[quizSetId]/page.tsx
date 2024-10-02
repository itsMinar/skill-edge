'use client';

import { useState } from 'react';

import { Circle, CircleCheck, Pencil, Trash } from 'lucide-react';

import { AlertBanner } from '~/components/alert-banner';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

import { AddQuizForm } from './_components/add-quiz-form';
import { QuizSetAction } from './_components/quiz-set-action';
import { TitleForm } from './_components/title-form';

const initialQuizes = [
  {
    id: 1,
    title: 'What is HTML ?',
    options: [
      {
        label: 'A programming language',
        isTrue: false,
      },
      {
        label: 'A markup language',
        isTrue: true,
      },
      {
        label: 'A famous book',
        isTrue: false,
      },
      {
        label: 'A famous tv show',
        isTrue: false,
      },
    ],
  },
  {
    id: 2,
    title: 'What is Javascript ?',
    options: [
      {
        label: 'A programming language',
        isTrue: true,
      },
      {
        label: 'A markup language',
        isTrue: false,
      },
      {
        label: 'A famous book',
        isTrue: false,
      },
      {
        label: 'A famous tv show',
        isTrue: false,
      },
    ],
  },
];

export default function EditQuizSet() {
  const [quizes, setQuizes] = useState(initialQuizes);

  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quiz List */}
          <div className="max-lg:order-2">
            <h2 className="mb-6 text-xl">Quiz List</h2>
            <AlertBanner
              label="No Quiz are in the set, add some using the form above."
              variant="warning"
              className="mb-6 rounded"
            />
            <div className="space-y-6">
              {quizes.map((quiz) => {
                return (
                  <div
                    key={quiz.id}
                    className="rounded-md border bg-gray-50 p-4 shadow-md lg:p-6"
                  >
                    <h2 className="mb-3">{quiz.title}</h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {quiz.options.map((option) => {
                        return (
                          <div
                            className={cn(
                              'flex items-center gap-1 rounded-sm py-1.5 text-sm text-gray-600'
                            )}
                            key={option.label}
                          >
                            {option.isTrue ? (
                              <CircleCheck className="size-4 text-emerald-500" />
                            ) : (
                              <Circle className="size-4" />
                            )}

                            <p>{option.label}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="mr-1 w-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        className="text-destructive"
                        variant="ghost"
                      >
                        <Trash className="mr-1 w-3" /> Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/*  */}
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: 'Reactive Accelerator',
                }}
              />
            </div>

            <div className="max-w-[800px]">
              <AddQuizForm setQuizes={setQuizes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
