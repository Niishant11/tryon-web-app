import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
 
export function AuthPage() {
  const navigate = useNavigate();
 
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/products");
    } catch (e) {
      console.error(e);
    }
  };
 
  return (
    <div className="auth-page">
      {/* Visual column */}
      <div className="auth-page__visual">
        <img
          className="auth-page__visual-img"
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80"
          alt=""
        />
        <div className="auth-page__visual-content">
          <p className="auth-page__visual-quote">
            "Fashion is the armour<br/>to survive everyday life."
          </p>
          <p style={{ fontSize: "var(--text-sm)", opacity: .6, marginTop: "var(--space-2)" }}>— Bill Cunningham</p>
        </div>
      </div>
 
      {/* Form column */}
      <div className="auth-page__form-col">
        <div className="auth-page__form-inner animate-fade-up">
          <div className="auth-logo">Try<span>On</span></div>
 
          <div>
            <h1 className="display-sm" style={{ marginBottom: "var(--space-2)" }}>Welcome back</h1>
            <p className="caption">Sign in to start your virtual try-on experience.</p>
          </div>
 
          <button className="google-btn" onClick={handleGoogle}>
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            Continue with Google
          </button>
 
          <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-faint)", textAlign: "center", lineHeight: 1.6 }}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Your photo is never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;