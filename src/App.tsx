import { DataList } from "./components/DataList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">Proxet Test - Paginated DataList</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <DataList />
      </main>
    </div>
  );
}
