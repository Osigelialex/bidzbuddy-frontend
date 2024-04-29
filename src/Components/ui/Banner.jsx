import BasicBreadcrumbs from "../atom/BreadCrumbs";

const Banner = ({ title }) => {
  return (
    <div className="bg-[#301934] bg-[url('bannerImage.png')] bg-no-repeat px-5 py-20 text-white sm:h-96 sm:px-20 sm:py-20">
      <h1
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-once="true"
        className="text-3xl font-extrabold sm:mb-3 sm:text-5xl"
      >
        {title}
      </h1>
      <BasicBreadcrumbs />
    </div>
  );
};

export default Banner;
