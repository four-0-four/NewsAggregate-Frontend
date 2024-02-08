// ProfileSection.jsx

import Box from '@/components/Box/Box';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import EditableInput from '@/components/Inputs/EditableInput';
import Toast from '@/components/Toast';
import { UserDetails, selectUserDetails, selectUserError, selectUserStatus } from '@/lib/features/user/slice';
import { checkUsername, updateProfile } from '@/lib/features/user/thunks';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

const account = () => {
  const dispatch = useAppDispatch();
  const reduxError = useAppSelector(selectUserError);
  const status = useAppSelector(selectUserStatus);
  const userDetails = useAppSelector(selectUserDetails);
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const OriginalValues = {
    first_name: userDetails?.first_name ?? '',
    last_name: userDetails?.last_name ?? '',
    email: userDetails?.email ?? '',
    username: userDetails?.username ?? '',
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: userDetails?.first_name ?? '',
    last_name: userDetails?.last_name ?? '',
    email: userDetails?.email ?? '',
    username: userDetails?.username ?? '',
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // State for storing password change data

  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] = useState("");

    // Function to compare formData with userDetails
    const hasFormDataChanged = (formData: FormData, userDetails: UserDetails) => {
      return formData.first_name !== userDetails.first_name ||
             formData.last_name !== userDetails.last_name ||
             formData.email !== userDetails.email ||
             formData.username !== userDetails.username;
    };

    useEffect(() => {
        setError(reduxError ?? "")
    }, [reduxError])


    // Effect to update isChanged when formData changes
    useEffect(() => {
        if (userDetails) {
            setIsChanged(hasFormDataChanged(formData, userDetails));
        }
    }, [formData, userDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (e.target.name === 'username') {
        setUsernameAvailabilityMessage("");
      }
    };  

    const handleUsernameBlur = async () => {
      if (formData.username) {
        const response = await dispatch(checkUsername(formData.username));
        if (response.meta.requestStatus === 'fulfilled' && formData.username !== userDetails?.username) {
          if (typeof response.payload === 'object' && response.payload.exists) {
            setUsernameAvailabilityMessage("This username is not available");
            setUsernameAvailable(false);
          } else {
            setUsernameAvailabilityMessage("This username is available");
            setUsernameAvailable(true);
          }
        }
      }
    };

    const validateName = (name:string) => /^[A-Za-z]{2,}$/.test(name);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateName(formData.first_name) || !validateName(formData.last_name)) {
        setError('First and last name must contain only alphabets and be at least 2 characters long.');
        return;
      }
  
      // Check if username is available (assuming usernameAvailable is a state variable tracking this)
      if (!usernameAvailable) {
        setError('The username is not available. Please choose a different one.');
        return;
      }
      dispatch(updateProfile({ ...formData }))
      .then(() => {
          setToastMessage('Profile updated successfully');
          setShowToast(true);
          setUsernameAvailabilityMessage("");
      })
      .catch(() => {
          setToastMessage('Failed to update profile');
          setShowToast(true);
      });
    }

    const handleCancelUpdate = () => {
      setFormData(OriginalValues);
      setUsernameAvailabilityMessage("");
    }

    return (
      <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
        <Box title="Edit Profile">
          <form onSubmit={handleSubmit}>
            {status === 'failed' || error && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}

            {status !== 'failed' && (
                <>
                    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                        <EditableInput headerText="First Name" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                        <EditableInput headerText="Last Name" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>

                    <EditableInput headerText="Email" placeholder="user@email.com" name="email" readOnly={true} value={formData.email} onChange={handleChange} />

                    <EditableInput 
                      headerText="Username" 
                      placeholder="username" 
                      name="username" 
                      value={formData.username} 
                      onChange={handleChange} 
                      onBlur={handleUsernameBlur}
                    />
                    {usernameAvailabilityMessage && <p className={`text-sm ml-2 mt-1 ${usernameAvailable ? 'text-green-500' : 'text-red-500'}`}>*{usernameAvailabilityMessage}</p>}

                    <div className="mt-10 flex flex-col md:flex-row justify-end items-center w-full">
                      {!(!isChanged || !usernameAvailable) && (<SecondaryButton onClick={handleCancelUpdate} text="Cancel"/>)}
                      <PrimaryButton type="submit" text="Update" disabled={!isChanged || !usernameAvailable}/>
                    </div>
                </>
            )}
          </form>
        </Box>
        {showToast && <Toast message={toastMessage} />}
      </div>
    );
};

export default account;
