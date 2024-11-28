export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {children}
    </section>
  );
}
