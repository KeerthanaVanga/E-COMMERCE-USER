import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  const abouts = [
    {
      head: "Quality Assurance",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              rem consequatur odio, ad explicabo corporis eum ipsam, modi culpa
              voluptas aspernatur saepe quos quidem necessitatibus quas
              asperiores commodi, odit magnam.`,
    },
    {
      head: "Our Mission",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              rem consequatur odio, ad explicabo corporis eum ipsam, modi culpa
              voluptas aspernatur saepe quos quidem necessitatibus quas
              asperiores commodi, odit magnam.`,
    },
    {
      head: "Exceptional Customer Service",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              rem consequatur odio, ad explicabo corporis eum ipsam, modi culpa
              voluptas aspernatur saepe quos quidem necessitatibus quas
              asperiores commodi, odit magnam.`,
    },
  ];
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={import.meta.env.VITE_ABOUT}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            totam reiciendis labore non quibusdam. Porro, consequatur dolorum
            quae sapiente nam minus assumenda debitis aperiam nihil aspernatur
            ducimus veniam incidunt corporis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            deleniti autem architecto facilis veniam nisi asperiores, voluptates
            in ullam unde modi reiciendis, accusamus, exercitationem fugit iusto
            laborum ipsum? Ducimus, mollitia?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            molestias accusamus alias, ullam quis aperiam numquam impedit
            provident quisquam mollitia harum repellat asperiores, illum
            corporis laboriosam porro necessitatibus neque at!
          </p>
        </div>
      </div>
      <div>
        <div className="text-xl py-4">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
          {abouts.map((about, index) => (
            <div
              key={index}
              className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
            >
              <b>{about.head}:</b>
              <p className="text-gray-600">{about.description}</p>
            </div>
          ))}
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
