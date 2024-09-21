import { CourseDetails } from './_components/course-details';
import { CourseDetailsIntro } from './_components/course-details-intro';
import { RelatedCourses } from './_components/related-courses';
import { Testimonials } from './_components/testimonials';

export const courses = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    price: 49.99,
    thumbnail: 'https://example.com/js-thumbnail.jpg',
    category: {
      title: 'Development',
    },
    modules: [
      'Variables',
      'Functions',
      'Objects',
      'Arrays',
      'DOM Manipulation',
    ],
  },

  {
    id: '2',
    title: 'Mastering React',
    price: 99.99,
    thumbnail: 'https://example.com/react-thumbnail.jpg',
    category: {
      title: 'Frontend Development',
    },
    modules: ['JSX', 'Components', 'Hooks', 'State Management', 'Routing'],
  },
  {
    id: '3',
    title: 'Python for Data Science',
    price: 149.99,
    thumbnail: 'https://example.com/python-thumbnail.jpg',
    category: {
      title: 'Data Science',
    },
    modules: [
      'Data Types',
      'Numpy',
      'Pandas',
      'Matplotlib',
      'Machine Learning',
    ],
  },
  {
    id: '4',
    title: 'Full-Stack Web Development',
    price: 199.99,
    thumbnail: 'https://example.com/fullstack-thumbnail.jpg',
    category: {
      title: 'Web Development',
    },
    modules: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Database Integration'],
  },
  {
    id: '5',
    title: 'UI/UX Design Essentials',
    price: 79.99,
    thumbnail: 'https://example.com/uiux-thumbnail.jpg',
    category: {
      title: 'Design',
    },
    modules: [
      'Wireframing',
      'Prototyping',
      'User Research',
      'Figma',
      'Adobe XD',
    ],
  },
];

export default function SingleCoursePage() {
  return (
    <>
      <CourseDetailsIntro />

      <CourseDetails />

      <Testimonials />

      <RelatedCourses />
    </>
  );
}
