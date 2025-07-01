import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={import.meta.env.VITE_CONTACT}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54907 Washinton USA <br />
            Suite 350 block, Washinton
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0129 <br />
            Email:support@shopverse.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Shopverse
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-block hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
