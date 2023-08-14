import InfoCardDiaolog from "./infoCardDialog";

const infoCard = ({ user, sectionTitle, section, cards }) => {
   return (
      <div className='m-4 bg-white rounded-lg overflow-hidden pt-2 shadow-lg'>
         <p className='text-xl font-bold text-left px-4 mb-4'>{sectionTitle}</p>
         {cards && cards.map((card, key) => (
            <div key={key}>
               {key !== 0 && <div className="flex justify-center">
                  <div className="bg-gray-300 w-60 my-4 py-0.5" />
               </div>}
               <div className='flex-no-shrink flex flex-row px-4 rounded overflow-hidden w-600 mb-2'>
                  <div className='mr-7'>
                     <img src="https://via.placeholder.com/50" alt="" />
                  </div>
                  <div>
                     <p className='font-bold'>{card.title}</p>
                     <p>{card.subtitle}</p>
                     <p className='text-sm'>{card.start_date}</p>
                  </div>
               </div>
            </div>
         ))}
         <div className='flex flex-row items-center justify-center bg-gray-100'>
            <InfoCardDiaolog user={user} sectionTitle={sectionTitle} section={section} />
         </div>
      </div>
   );
};

export default infoCard;