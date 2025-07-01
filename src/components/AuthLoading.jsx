export default function AuthLoading() {
  return (
    <div className="auth-loading-container">
      <div className="loading-bar" />
      <img
        src={import.meta.env.VITE_SHOPVERSE}
        alt="Loading..."
        className="loading-image"
      />
    </div>
  );
}
