export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {children}
    </section>
  );
}
