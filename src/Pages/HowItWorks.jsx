import Banner from "../Components/ui/Banner";
import Navbar from "../Components/ui/Navbar";
import Footer from "../Components/ui/Footer";

const HowItWorks = () => {
  return (
    <div>
      <Navbar />
      <Banner title="How It Works" />
      <div className="sm:mx-14 mx-5 mt-10">
        <div className="grid place-items-center sm:hidden mt-14">
          <img loading="lazy" src="/questions.bmp" alt="Bid" className="rounded-lg w-80 h-80" />
        </div>
        <div className="pt-6 pb-10 grid sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold flex gap-2 items-center align-middle mb-3">
              <span className="font-extrabold text-purple-500">01.</span>
              How to Bid
            </h1>
            <p className="text-lg leading-10">
              To bid on an item, you must first register an account with us. Once you have an account, you can place a bid on any item that is currently up for auction. You can place a bid by clicking on the "Place a bid" button on the specified item. You can also set a maximum bid amount, and our system will automatically place bids on your behalf up to that amount.
            </p>
          </div>
          <div className="sm:grid place-items-center hidden">
            <img loading="lazy" src="/questions.bmp" alt="Bid" className="rounded-lg w-80 h-80" />
          </div>
        </div>

        <div className="py-10 grid sm:grid-cols-2">
          <div className="sm:grid place-items-center hidden">
            <img loading="lazy" src="/questions.bmp" alt="Bid" className="rounded-lg w-80 h-80" />
          </div>
          <div>
            <h1 className="text-4xl font-bold flex gap-2 items-center align-middle mb-3">
              <span className="font-extrabold text-purple-500">02.</span>
              How to Sell
            </h1>
            <p className="text-lg leading-10">
              To sell an item on our platform, you must first register a seller account with us. Once you have an account, you can create a new auction listing by navigating to the "My Products" section when you visit your dashboard, then click "add new". You will need to provide a title, description, and a photo of the item you are selling. You will also need to set a starting bid price and the duration of the auction.
            </p>
          </div>
        </div>

        <div className="py-10 grid sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold flex gap-2 items-center align-middle mb-3">
              <span className="font-extrabold text-purple-500">03.</span>
              Product Approval
            </h1>
            <p className="text-lg leading-10">
              Once you submit your product for auction, it will need to be approved by an admin. This approval process ensures that all items listed meet our quality and safety standards.
              To increase the chances of your product being approved, make sure to provide clear and high-quality images, write a detailed and accurate description, and select the appropriate category for your item.
              The approval process typically takes 1-2 days. You will be notified via email once your product is approved and live on the site.
            </p>
          </div>
          <div className="sm:grid place-items-center hidden">
            <img loading="lazy" src="/questions.bmp" alt="Bid" className="rounded-lg w-80 h-80" />
          </div>
        </div>

        <div className="py-10 grid sm:grid-cols-2">
          <div className="sm:grid place-items-center hidden">
            <img loading="lazy" src="/questions.bmp" alt="Bid" className="rounded-lg w-80 h-80" />
          </div>
          <div>
            <h1 className="text-4xl font-bold flex gap-2 items-center align-middle mb-3">
              <span className="font-extrabold text-purple-500">04.</span>
              How to Win
            </h1>
            <p className="text-lg leading-10">
              To win an auction, you must have the highest bid when the auction ends. If you have the highest bid, you will be notified via email and on the website. You will then have a set amount of time to complete the purchase and pay for the item. If you do not complete the purchase within the specified time frame, the item will be offered to the next highest bidder and could lead to a potential ban on your account.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
