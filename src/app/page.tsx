import LifersTable from '../cmp/table'
import Navbar from '../cmp/navbar'
export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <LifersTable />
      </main>
    </div>
  )
}