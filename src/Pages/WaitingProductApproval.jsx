import { Link } from 'react-router-dom';

const WaitingProductApproval = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-4 text-center">
        <div className="p-3 mx-auto">
          <img src="/hour-glass.gif" alt="Hourglass" />
        </div>
        <h1 className="text-3xl font-bold">Product Submission Received</h1>
        <p className="text-center w-2/3 mx-auto">
          Your submission is being reviewed by an admin and will be approved within 1-2 days. Contact us if it takes longer. Thank you for your patience!
        </p>
        <Link to="/">
          <p className="text-blue-500 underline">Back to home &rarr;</p>
        </Link>
      </div>
    </div>
  );
}

export default WaitingProductApproval;
