import InfoCardDiaolog from "./infoCardDialog";

const infoCard = ({ section, title, subtitle, dates }) => {
   return (
      <div className='m-4 bg-white rounded-lg overflow-hidden pt-2 shadow-lg'>
         <p className='text-xl font-bold text-left px-4'>{section}</p>
         <div className='flex-no-shrink flex flex-row px-4 rounded overflow-hidden w-600 mb-2'>
            <div className='mr-7'>
               <img src="https://via.placeholder.com/50" alt="" />
            </div>
            <div>
               <p className='font-bold'>{title}</p>
               <p>{subtitle}</p>
               <p className='text-sm'>{dates}</p>
            </div>
         </div>
         <div className='flex flex-row items-center justify-center bg-gray-100'>
            <InfoCardDiaolog />
         </div>
      </div>
   );
};

export default infoCard;