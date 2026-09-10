import AuthTemplete from "../components/Authentication/AuthTemplete";

function Login() {
  return (
    <AuthTemplete
      heading="Welcome back"
      desc="Pick up your track exactly where you left it — your progress, projects and notes are all waiting."
      imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
      formType="Login"
    />
  );
}

export default Login;
