export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 100 }}>
      <h1>Welcome to Chat App</h1>
      <p>
        <a href="/auth" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Login / Signup
        </a>
      </p>
    </div>
  );
}
