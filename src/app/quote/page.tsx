export default function QuotePage() {
  return (
    <main className="min-h-screen bg-white">
      <iframe
        src="/quote-tool/index.html"
        title="칼리온 온실 견적 시뮬레이터"
        className="block h-screen w-full border-0"
      />
    </main>
  );
}
