import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectUserDetails, selectUserError, selectUserStatus } from '../../lib/features/user/slice';
import { changeProfilePassword } from '../../lib/features/user/thunks';
import PasswordInput from '../../components/Inputs/PasswordInput';
import Toast from '../../components/Toast';
import Box from '../../components/Box/Box';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';


const Security = () => {
    const dispatch = useAppDispatch();
    const reduxError = useAppSelector(selectUserError);
    const [error, setError] = useState("");

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

    useEffect(() => {
        setError(reduxError ?? "")
    }, [reduxError])


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmitPasswordChange = (e: React.FormEvent) => {
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
    
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <Box title="Sign in & Security">
              <form onSubmit={handleSubmitPasswordChange}>
                <div className={`${!showPasswordChange?'mt-6':''} flex flex-col sm:flex-row justify-between items-center w-full`}>
                    {!showPasswordChange && (
                      <>
                        <h1 className="font-bold">Password</h1>
                        <PrimaryButton onClick={() => setShowPasswordChange(true)} text="Change Password" />
                      </>
                    )}
                </div>
                {showPasswordChange && (
                  <>
                    {passwordError && <p className="text-left text-red-500 text-sm mt-2">* {passwordError}</p>}
                    <PasswordInput headerText="Current Password" placeholder="Current Password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange}/>
                    <PasswordInput headerText="New Password" placeholder="New Password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange}/>
                    <PasswordInput headerText="Confirm New Password" placeholder="Confirm New Password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange}/>

                    <div className="mt-8 flex flex-col sm:flex-row justify-end items-center w-full">
                      <SecondaryButton onClick={handleCancelPasswordChange} text="Cancel"/>
                      <PrimaryButton type="submit" text="Change Password"/>
                    </div>
                  </>
                )}
              </form>
            </Box>
            {showToast && <Toast message={toastMessage} />}
        </div>
    );
}

export default Security;
