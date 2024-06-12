import Footer from "../Components/ui/Footer";

const VerificationEmailSent = () => {
  return (
    <div>
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col gap-5 items-center">
          <img src="/mail.png" alt="congrats" className="w-28 h-28" />
          <div>
            <h1 className="text-3xl font-bold text-center mb-5">Check your email!</h1>
            <p className="text-center text-xl">We just sent you an email containing a link to verify your account</p>
            <p className="text-center text-xl">Click the link and you're good to go!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerificationEmailSent;