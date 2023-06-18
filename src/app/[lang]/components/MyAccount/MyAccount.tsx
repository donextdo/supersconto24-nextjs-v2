import { SlMenu } from 'react-icons/sl';
import { useState } from 'react'
import MyAccountPopup from './MyAccountPopup';
import Dashboard from './AccountList/Dashborad';
import Orders from './AccountList/Orders';
import Address from './AccountList/Address';
import AccountDetails from './AccountList/AccountDetails';

const MyAccount = () => {
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(1);
    const [isColor, setIsColor] = useState(1);


    const handlePopup = () => {
        setModal(!modal)
    }

    const handleChange = (id: any) => {
        setIsColor(id);
    }

    const handleOrderClick = () => {
        setIsColor(2); // Switch to Order tab
      };

      const handleAccountDetailsClick = () => {
        setIsColor(3); // Switch to Order tab
      };

      const handleAddressClick = () => {
        setIsColor(4); // Switch to Order tab
      };

    return (
        <div className='container mx-auto xl:px-40 px-5 mb-36'>
            <div className='px-3 lg:hidden'>
                <div className='flex border border-gray-200 bg-gray-100 py-4 rounded-t-md px-2 space-x-4 items-center mt-2 shadow-sm'>
                    <button onClick={handlePopup}>
                        <SlMenu className='text-lg' />
                    </button>
                    <h3>Navigation</h3>
                </div>
                {
                    modal && (
                        <div><MyAccountPopup selected={selected} setSelected={setSelected} setModal={setModal} setIsColor={setIsColor} isColor={isColor}/></div>
                    )
                }

                <div className='mt-8'>
                    {isColor === 1 ?
                        <Dashboard  onButtonClick={handleOrderClick} handleAccountDetailsClick={handleAccountDetailsClick} handleAddressClick={handleAddressClick}/>
                        :
                        isColor === 2 ?
                            <Orders /> :
                            isColor === 3 ?
                                <AccountDetails /> :
                                <Address />
                    }
                </div>
            </div>

                    {/* full screen */}
            <section className='mx-3 hidden lg:block'>
                <div className=' flex space-x-8 justify-center text-gray-400'>
                    <button className={`px-4 py-3 border-b-2 text-[17px]  ${isColor === 1 ? 'border-blue-500' : 'border-white'}`}
                        onClick={() => handleChange(1)}>DASHBOARD</button>
                    <button className={`px-4 py-3 border-b-2 text-[17px]  ${isColor === 2 ? 'border-blue-500' : 'border-white'}`}
                        onClick={() => handleChange(2)}>ORDERS</button>
                    <button className={`px-4 py-3 border-b-2 text-[17px]  ${isColor === 3 ? 'border-blue-500' : 'border-white'}`}
                        onClick={() => handleChange(3)}>ACCOUNT DETAILS</button>
                    <button className={`px-4 py-3 border-b-2 text-[17px]  ${isColor === 4 ? 'border-blue-500' : 'border-white'}`}
                        onClick={() => handleChange(4)}>ADDRESSES</button>
                </div>
                <hr />

                <div className='mt-8'>
                    {isColor === 1 ?
                        <Dashboard onButtonClick={handleOrderClick} handleAccountDetailsClick={handleAccountDetailsClick} handleAddressClick={handleAddressClick}/>
                        :
                        isColor === 2 ?
                            <Orders /> :
                            isColor === 3 ?
                                <AccountDetails /> :
                                <Address />
                    }
                </div>
            </section>
        </div>
    );
}

export default MyAccount;