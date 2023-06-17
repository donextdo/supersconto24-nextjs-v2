import { useEffect, useState } from "react";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";


const Bill = ({setModal, setModal1}:any) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [townCity, setTownCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    let id = localStorage.getItem("id");

    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [streetAddressError, setStreetAddressError] = useState('');
    const [apartmentError, setApartmentError] = useState('');
    const [townCityError, setTownCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipCodeError, setZipCodeError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [formError, setFormError] = useState('');



    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/users/${id}`);
            console.log(res.data)
            const data = res.data;
            setFirstName(data.billingAddress.billingFirstName);
            setLastName(data.billingAddress.billingLastName);
            setCompanyName(data.billingAddress.billingCompanyName);
            setCountry(data.billingAddress.country)
            setStreetAddress(data.billingAddress.street)
            setApartment(data.billingAddress.apartment)
            setTownCity(data.billingAddress.town)
            setState(data.billingAddress.state)
            setZipCode(data.billingAddress.zipCode)
            setPhone(data.billingAddress.billingPhone)
            setEmail(data.billingAddress.billingEmail);


        } catch (err) {
            console.log(err);
        }
    }

    // const handleSave = async () => {
    //     const data = {
            
    //         "billingAddress": {
    //             billingFirstName: firstName,
    //             billingLastName: lastName,
    //             billingCompanyName: companyName,
    //             country: country,
    //             street: streetAddress,
    //             apartment: apartment,
    //             town: townCity,
    //             state: state,
    //             zipCode: zipCode,
    //             billingPhone: phone,
    //             billingEmail: email,
    //         }
    //       };
    //     try {
    //         const response = await axios.patch(`${baseUrl}/users/${id}`, data);
    //         console.log(response.data); // do something with the response data
    //     } catch (error) {
    //         console.log(error); // handle the error
    //     }
    // };

    const handleEmailChange = (e:any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };
    
    const handleFirstNameChange = (e:any) => {
        const newFirstName = e.target.value;
        setFirstName(newFirstName);
        if (newFirstName === '') {
            setFirstNameError('First name cannot be empty');
        } else {
            setFirstNameError('');
        }
    };
    
    const handleLastNameChange = (e:any) => {
        const newLastName = e.target.value;
        setLastName(newLastName);
        if (newLastName === '') {
            setLastNameError('Last name cannot be empty');
        } else {
            setLastNameError('');
        }
    };
    
    const handleCompanyNameChange = (e:any) => {
        const newCompanyName = e.target.value;
        setCompanyName(newCompanyName);
        if (newCompanyName === '') {
            setCompanyNameError('Company name cannot be empty');
        } else {
            setCompanyNameError('');
        }
    };
    
    const handleCountryChange = (e:any) => {
        const newCountry = e.target.value;
        setCountry(newCountry);
        if (newCountry === '') {
            setCountryError('Country cannot be empty');
        } else {
            setCountryError('');
        }
    };
    
    const handleStreetAddressChange = (e:any) => {
        const newStreetAddress = e.target.value;
        setStreetAddress(newStreetAddress);
        if (newStreetAddress === '') {
            setStreetAddressError('Street address cannot be empty');
        } else {
            setStreetAddressError('');
        }
    };
    
    const handleApartmentChange = (e:any) => {
        const newApartment = e.target.value;
        setApartment(newApartment);
        // No validation logic for apartment, assuming it can be empty
    };
    
    const handleTownCityChange = (e:any) => {
        const newTownCity = e.target.value;
        setTownCity(newTownCity);
        if (newTownCity === '') {
            setTownCityError('Town/city cannot be empty');
        } else {
            setTownCityError('');
        }
    };
    
    const handleStateChange = (e:any) => {
        const newState = e.target.value;
        setState(newState);
        if (newState === '') {
            setStateError('State cannot be empty');
        } else {
            setStateError('');
        }
    };
    
    const handleZipCodeChange = (e:any) => {
        const newZipCode = e.target.value;
        setZipCode(newZipCode);
        if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(newZipCode)) {
            setZipCodeError('Invalid zip code format');
        } else {
            setZipCodeError('');
        }
    };
    
    const handlePhoneChange = (e:any) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        if (!/^\+?[0-9]{7,}$/i.test(newPhone)) {
            setPhoneError('Invalid phone number format');
        } else {
            setPhoneError('');
        }
    };
    
    // form handle submit for example
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // perform form submission or validation here
        if (emailError || phoneError || zipCodeError) {
            setFormError('Please fix the errors and try again');
          } else {
            // perform form submission
            const data = {
            
                "billingAddress": {
                    billingFirstName: firstName,
                    billingLastName: lastName,
                    billingCompanyName: companyName,
                    country: country,
                    street: streetAddress,
                    apartment: apartment,
                    town: townCity,
                    state: state,
                    zipCode: zipCode,
                    billingPhone: phone,
                    billingEmail: email,
                }
              };
            try {
                const response = await axios.patch(`${baseUrl}/users/${id}`, data);
                console.log(response.data); // do something with the response data
                if (response.status==200){
                    Swal.fire({
                      title: 'Success',
                      text: 'Your billing address has been updated successfully',
                      icon: 'success',
                      confirmButtonText: 'Done',
                      confirmButtonColor: '#8DC14F',
                      
                    })
                    setModal1(false)
                    setModal(false)
                  }
            } catch (error) {
                console.log(error); // handle the error
                
            }
          }
    };

    return (
        <div className="container mx-auto px-40 mt-10">
            <h2 className="font-semibold mb-2">BILLING ADDRESS</h2>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit}>

            <label className="text-sm">First Name *</label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={firstName}
                onChange={handleFirstNameChange}
                required/>
                    {firstNameError && <div className='text-red-500'>{firstNameError}</div>}

            <label className="text-sm">Last Name *</label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={lastName}
                onChange={handleLastNameChange}
                required/>
                    {lastNameError && <div className='text-red-500'>{lastNameError}</div>}
    

            <label className="text-sm">Company Name </label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={companyName}
                onChange={handleCompanyNameChange}
                />
    {/* {companyNameError && <div className='text-red-500'>{companyNameError}</div>} */}

            <label className="text-sm">Country / Region *</label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={country}
                onChange={handleCountryChange}
                required/>
                {countryError && <div className='text-red-500'>{countryError}</div>}

            <label className="text-sm">Street address *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-2 " placeholder="House number and street name" value={streetAddress} onChange={handleStreetAddressChange} required/>
            {streetAddressError && <div className='text-red-500'>{streetAddressError}</div>}
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4 " placeholder="Apartment, suite, unite, etc. (optional)" value={apartment} onChange={(e) => setApartment(e.target.value)} />

            <label className="text-sm">Town / City *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4" value={townCity} onChange={handleTownCityChange} required/>
            {townCityError && <div className='text-red-500'>{townCityError}</div>}

            <label className="text-sm">State *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4" value={state} onChange={handleStateChange} required/>
            {stateError && <div className='text-red-500'>{stateError}</div>}

            <label className="text-sm">Zip Code *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4" value={zipCode} onChange={handleZipCodeChange} required/>
            {zipCodeError && <div className='text-red-500'>{zipCodeError}</div>}

            <label className="text-sm">Phone *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4" value={phone} onChange={handlePhoneChange} required/>
            {phoneError && <div className='text-red-500'>{phoneError}</div>}

            <label className="text-sm">Email address *</label>
            <input type="text" className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4" value={email} onChange={handleEmailChange} required/>
            {emailError && <div className='text-red-500'>{emailError}</div>}

            <button type="submit" className="bg-primary text-white py-2.5 px-4 mb-4 rounded-md text-sm" 
            // onClick={handleSave}
            >Save Changes</button>
             {formError && <div className='text-red-500'>{formError}</div>}
            </form>

        </div>
    );
}

export default Bill;