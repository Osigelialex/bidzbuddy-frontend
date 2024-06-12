import Banner from '../Components/ui/Banner';
import Navbar from '../Components/ui/Navbar';
import ContactUsForm from '../Components/form/ContactUsForm';
import Footer from "../Components/ui/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <Banner title="Contact Us" />

      <div className='grid sm:grid-cols-2 place-items-center sm:m-10'>
        <div className='p-5'>
          <img src="/contactus.bmp" />
        </div>
        <ContactUsForm />
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
