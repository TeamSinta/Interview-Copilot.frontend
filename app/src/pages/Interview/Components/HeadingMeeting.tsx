import SintaLogo from 'src/assets/svg/sintaLogo.svg';

const HeadingMeeting = () => {
  return (
    <div className="h-full mb-16">
      <div className="gap-2 mb-4">
        <h3 className="font-bold text-base">Heading Meeting</h3>
        <p className="text-gray-600 font-normal text-sm">
          Waiting for Participant to join ....
        </p>
      </div>
      <div className="flex items-center justify-center flex-col bg-lightBg rounded-xl gap-y-4 h-full">
        <img src={SintaLogo} alt="sinta" className="w-36" />
        <p className="font-normal text-base text-center lg:px-20">
          Use emoji's as 🚀 👍 <span className="text-red-600">❤️</span> 😂
          timestamps for key moments. Meetings will also be summarized for you
          automatically.
        </p>
      </div>
    </div>
  );
};
export default HeadingMeeting;
