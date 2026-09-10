import AuthTemplete from "../components/Authentication/AuthTemplete";

function SignUp() {
  return (
    <AuthTemplete
      heading="Join millions learning to code with StudyNotion"
      desc="Build skills for today, tomorrow and beyond. Start with a free track and upgrade only when you're ready."
      imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
      formType="Signup"
    />
  );
}

export default SignUp;
