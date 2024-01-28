import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { changeProfilePassword, checkUsername, reportBug, updateProfile } from '@/lib/features/user/thunks';
import Textarea from '@/components/Textarea';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetStatus, selectUserDetails, selectUserError, selectUserStatus } from '@/lib/features/user/slice';
import Input from '@/components/Inputs/Input';
import FileInput from '@/components/Inputs/FileInput';
import SocialMedia from '@/components/SocialMedia';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

const Profile = () => {
    const dispatch = useAppDispatch();
    const reduxError = useAppSelector(selectUserError);
    const status = useAppSelector(selectUserStatus);
    const userDetails = useAppSelector(selectUserDetails);
    const [error, setError] = useState("");
    const [isChanged, setIsChanged] = useState(false);
  
    const [formData, setFormData] = useState<FormData>({
      first_name: userDetails?.first_name ?? '',
      last_name: userDetails?.last_name ?? '',
      email: userDetails?.email ?? '',
      username: userDetails?.username ?? '',
    });

    // State for showing password change fields
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [passwordError, setPasswordError] = useState("")

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    // State for storing password change data
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] = useState("");

    // Function to compare formData with userDetails
    const hasFormDataChanged = (formData, userDetails) => {
      return formData.first_name !== userDetails?.first_name ||
             formData.last_name !== userDetails?.last_name ||
             formData.email !== userDetails?.email ||
             formData.username !== userDetails?.username;
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

    const validateName = (name) => /^[A-Za-z]{2,}$/.test(name);

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
    };


    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        dispatch(changeProfilePassword({
          "confirm_password": passwordData.confirmPassword, 
          "new_password": passwordData.newPassword, 
          "old_password": passwordData.currentPassword
        }))
        .then((res) => {
          if(res.payload === 1) {
            setToastMessage('Password changed successfully');
            setShowToast(true);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswordChange(false);
          }else if (res.payload === 403) {
            setPasswordError("Incorrect current password.");
          }else if (res.payload === 400) {
            setPasswordError("New password and confirm password must be same");
          }else{
            setToastMessage('Failed to change password');
            setPasswordError('Failed to change password')
            setShowToast(true);
          }
        })
    };

    const handleCancelPasswordChange = () => {
        setShowPasswordChange(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
    
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <form onSubmit={handleSubmit} className="w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-[25px] border border-gray-100 ">
                <h1 className={`text-xl md:text-2xl font-bold text-left uppercase pb-4 font-semibold border-b border-gray-100 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"}`}>
                  My Profile
                </h1>
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
                          <button 
                            type="submit"
                            disabled={!isChanged && !usernameAvailable}
                            className={`w-full md:w-auto px-12 py-2 ${isChanged ? 'bg-primary text-black' : 'bg-gray-300 text-gray-500'} rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm`}
                          >
                            Update
                          </button>
                        </div>
                    </>
                )}
            </form>
            <form onSubmit={handleSubmitPasswordChange} className="mt-8 w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-[25px] border border-gray-100 ">
                <h1 className="text-xl md:text-2xl font-bold text-left uppercase pb-4 font-semibold border-b border-gray-100">
                  Security
                </h1>
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center w-full">
                    <h1>Password</h1>
                    {!showPasswordChange && (
                      <button 
                        type="button"
                        onClick={() => setShowPasswordChange(true)}
                        className="bg-primary text-black w-full md:w-auto px-8 py-2 rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm"
                      >
                        Change Password
                      </button>
                    )}
                </div>
                {showPasswordChange && (
                  <>
                    {passwordError && <p className="text-left text-red-500 text-sm mt-2">* {passwordError}</p>}
                    <PasswordInput headerText="Current Password" placeholder="Current Password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} type="password" />
                    <PasswordInput headerText="New Password" placeholder="New Password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} type="password" />
                    <PasswordInput headerText="Confirm New Password" placeholder="Confirm New Password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} type="password" />

                    <div className="mt-8 flex justify-end">
                      <button onClick={handleCancelPasswordChange} className="border border-primary text-primary px-4 py-2 rounded-[25px] uppercase mr-2">Cancel</button>
                      <button type="submit" className="bg-primary text-black px-4 py-2 rounded-[25px] uppercase">Submit</button>
                    </div>
                  </>
                )}
            </form>
            {showToast && <Toast message={toastMessage} />}
        </div>
    );
}


import nookies from "nookies";
import { GetServerSideProps } from "next";
import EditableInput from '@/components/Inputs/EditableInput';
import PasswordInput from '@/components/Inputs/PasswordInput';
import Toast from '@/components/Toast';
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check authentication (e.g., check cookies or token)
  const cookies = nookies.get(context);
  const token = cookies['access_token'];
  const refresh_token = cookies['refresh_token'];
  if (!token || !refresh_token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Profile;
