import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = () => {
   return (
         <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" >
            <img className="w-full h-64 object-cover" src="https://via.placeholder.com/200" />
            <div className="bg-white px-6 py-4 flex flex-row justify-between">
               <div >
                  <div className="">
                     <p className='' > <b className='text-xl'>Profile Named - </b>@username</p>
                  </div>
                  <div className="text-gray-700 text-base">
                     <p>Sofware Engineer - Google</p>
                     <p>San Francisco, CA</p>
                  </div>
               </div>
            </div>
         </div>
   );
};

export default ProfileCard;