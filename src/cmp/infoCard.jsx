import InfoCardDiaolog from "./infoCardDialog";
import InfoCardEditDialog from "./infoCardEditDialog";

const infoCard = ({ user, sectionTitle, section, cards, setSectionCards}) => {
   return (
      <div className='m-4 bg-white rounded-lg overflow-hidden pt-2 shadow-lg'>
         <div className='flex justify-between px-4 mb-4'>
            <p className='text-xl font-bold text-left'>{sectionTitle}</p>
            <div className='flex flex-row mx-2'>
               <InfoCardDiaolog
                  user={user}
                  sectionTitle={sectionTitle}
                  section={section}
                  setSectionCards={setSectionCards}
               />
               <InfoCardEditDialog
                  user={user}
                  sectionTitle={sectionTitle}
                  section={section}
                  setSectionCards={setSectionCards}
                  cards={cards}
               />
            </div>
         </div>
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
            
         </div>
      </div>
   );
};

export default infoCard;