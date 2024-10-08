import { ILiveColumn, columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const lives = [
  {
    id: 1,
    title: 'Career In Backend Web Development',
    date: '10 Nov 2022',
    time: '10:00 AM',
  },
  {
    id: 2,
    title: 'Career In Frontend Development',
    date: '10 Nov 2022',
    time: '08:30 PM',
  },
];

export default async function LivesPage() {
  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={lives as ILiveColumn[]} />
    </div>
  );
}
