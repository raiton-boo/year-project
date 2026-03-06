export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center py-6">
      <p
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-subtext)',
        }}
      >
        © {year} raiton
      </p>
    </footer>
  );
}
