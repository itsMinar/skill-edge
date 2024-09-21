/* eslint-disable @next/next/no-img-element */
import {
  BookCheck,
  CheckCheck,
  Clock10,
  FileQuestion,
  MessageSquare,
  NotepadText,
  Presentation,
  Radio,
  Star,
  StickyNote,
  Tv,
  UsersRound,
  Video,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { cn } from '~/lib/utils';

export function CourseDetails() {
  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-success inline-block rounded-full px-4 py-0.5 text-xs font-medium text-white">
          Development
        </span>
        <h3 className="mt-3 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:text-5xl">
          Reactive Accelerator
        </h3>
        <p className="mt-3 text-sm text-gray-600">Master React JS & Next JS</p>
        {/*  */}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:gap-20">
          <div className="flex items-center gap-2">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src="https://avatars.githubusercontent.com/u/75926025?v=4"
              alt="Minar Munshi"
            />
            <p className="font-bold">Minar Munshi</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>Feb 22, 2022</span>
          </div>
        </div>

        {/* Tab */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="my-6 grid w-full max-w-[768px] grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Carriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview">
              {/* each tab content can be independent component */}
              <>
                <h3 className="text-2xl">Course Description</h3>
                <p className="mt-4">
                  This tutorial will help you learn quickly and thoroughly.
                  Lorem ipsum, or lipsum as it sometimes known, is dummy text
                  used in laying out print, graphic or web designs. Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit. Donec odio.
                  Quisque volutpat mattis eros.
                  <br /> <br /> You’ll be exposed to principles and strategies,
                  but, more importantly, you’ll learn how actually apply these
                  abstract concepts by coding three different websites for three
                  very different the audiences. Lorem ipsum is dummy text used
                  in laying out print, graphic or web designs Lorem ipsum
                  blinding shot chinwag knees.
                </p>
                <div className="mt-8 space-y-6 rounded-md bg-gray-50 p-8">
                  <h4 className="text-2xl">What You will Learn?</h4>
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <li className="flex space-x-3">
                      <div className="relative top-1 flex-none">
                        <CheckCheck />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>
                    <li className="flex space-x-3">
                      <div className="relative top-1 flex-none">
                        <CheckCheck />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>
                    <li className="flex space-x-3">
                      <div className="relative top-1 flex-none">
                        <CheckCheck />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>
                    <li className="flex space-x-3">
                      <div className="relative top-1 flex-none">
                        <CheckCheck />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            </TabsContent>
            <TabsContent value="curriculum">
              {/* each tab content can be independent component */}
              <div className="mb-6 mt-4 flex flex-wrap items-center justify-center gap-x-5 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <BookCheck className="h-4 w-4" />
                  12 Chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock10 className="h-4 w-4" />
                  50+ Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <Radio className="h-4 w-4" />4 Live Class
                </span>
              </div>

              {/* contents */}
              <Accordion
                defaultValue={['item-1', 'item-2', 'item-3']}
                type="multiple"
                className="w-full"
              >
                <AccordionItem className="border-none" value="item-1">
                  <AccordionTrigger>Introduction</AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="mb-6 mt-4 flex flex-wrap items-center gap-x-5 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Video className="h-4 w-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="h-4 w-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="h-4 w-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="h-4 w-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-none" value="item-2">
                  <AccordionTrigger>Master Next JS</AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="mb-6 mt-4 flex flex-wrap items-center gap-x-5 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Video className="h-4 w-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="h-4 w-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="h-4 w-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="h-4 w-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-none" value="item-3">
                  <AccordionTrigger>
                    Built Ecommerce Using Next.js
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="mb-6 mt-4 flex flex-wrap items-center gap-x-5 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Video className="h-4 w-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="h-4 w-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="h-4 w-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="h-4 w-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn('text-slate-500')} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn('text-slate-500')}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* contents end */}
            </TabsContent>
            <TabsContent value="instructor">
              {/* each tab content can be independent component */}
              <div className="rounded-md bg-gray-50 p-8">
                <div className="mb-8 md:flex md:gap-x-5">
                  <div className="mb-5 h-[310px] w-[270px] max-w-full flex-none rounded md:mb-0">
                    <img
                      src="https://avatars.githubusercontent.com/u/75926025?v=4"
                      alt=""
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="max-w-[300px]">
                      <h4 className="text-[34px] font-bold leading-[51px]">
                        Minar Munshi
                      </h4>
                      <div className="mb-6 font-medium text-gray-600">
                        Senior Software Engineer
                      </div>
                      <ul className="list space-y-4">
                        <li className="flex items-center space-x-3">
                          <Presentation className="text-gray-600" />
                          <div>10+ Courses</div>
                        </li>
                        <li className="flex space-x-3">
                          <UsersRound className="text-gray-600" />
                          <div>2k+ Student Learned</div>
                        </li>
                        <li className="flex space-x-3">
                          <MessageSquare className="text-gray-600" />
                          <div>1500+ Reviews</div>
                        </li>
                        <li className="flex space-x-3">
                          <Star className="text-gray-600" />
                          <div>4.9 Average Rating</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomized words which do not
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to be sure there is not
                  anything embarrassing hidden in the middle of text. All the
                  Lorem Ipsum generators on the Internet tend.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
