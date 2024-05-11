import Navbar from "../Components/ui/Navbar";
import Banner from "../Components/ui/Banner";
import NewProductForm from "../Components/form/NewProductForm";

const NewProduct = () => {
  return (
    <div>
      <Navbar />
      <Banner title="Add Product" />
      <NewProductForm />
    </div>
  );
}
 
export default NewProduct;