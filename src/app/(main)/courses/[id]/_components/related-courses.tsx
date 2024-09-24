import { SectionTitle } from '~/components/section-title';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { courses } from '~/data';

export function RelatedCourses() {
  return (
    <section>
      <div className="container">
        <SectionTitle className="mb-6">Related Courses</SectionTitle>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-2xl:w-[90%]"
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            {courses.map((course) => (
              <CarouselItem
                key={course.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                {/* <CourseCard course={course} /> */}
                <h2>Emni</h2>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
