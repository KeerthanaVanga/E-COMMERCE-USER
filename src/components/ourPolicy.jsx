import { DynamicIcon } from "lucide-react/dynamic";
const OurPolicy = () => {
  const Policy = [
    {
      Icon: "refresh-ccw",
      policyName: "Easy Exchange Policy",
      offer: "We offer hassle free exchange policy",
    },
    {
      Icon: "badge-check",
      policyName: "7 Days return policy",
      offer: "We provide 7 days free return policy",
    },
    {
      Icon: "headset",
      policyName: "Best customer support",
      offer: "We provide 24/7 customer support",
    },
  ];
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {Policy.map((policy, index) => (
        <div key={index}>
          <DynamicIcon
            name={policy.Icon}
            size={25}
            className="w-12 m-auto mb-5"
          />
          <p className="font-semibold">{policy.policyName}</p>
          <p className="text-gray-400">{policy.offer}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
