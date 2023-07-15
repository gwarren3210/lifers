import LifersTable from '../cmp/table'
import Groups from '../cmp/groups'
import Navbar from '../cmp/navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <Groups />
        <LifersTable />
      </main>
    </div>
  )
}