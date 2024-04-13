import React, { useState, useEffect } from 'react';
import Input from '../../components/Inputs/Input';
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { confirmResetToken, changePassword } from '../../lib/features/user/thunks'; // Adjust the import path
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import Box from '../../components/Box/Box';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PasswordInput from '../../components/Inputs/PasswordInput';

const ChangePasswordForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation(); 
    const status = useAppSelector(selectUserStatus);
    const [error,setError] = useState(useAppSelector(selectUserError));
    const { token } = queryString.parse(location.search);

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    // Validate token before page loads
    useEffect(() => {
        const tokenStr = typeof token === 'string' ? token : ""; // Ensure token is a string
        if (tokenStr) {
            dispatch(confirmResetToken({ token: tokenStr })).unwrap()
                .then(() => {
                    setIsConfirmed(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsConfirmed(false);
                    setIsLoading(false);
                    setError('token is invalid or expired!');
                    // Optionally navigate the user away or show an error message
                });
        } else {
            // Handle the absence of a token, such as redirecting the user or showing an error
            setIsLoading(false);
            navigate('/auth/Login');
            // navigate('/some-error-page'); // Uncomment and adjust as necessary
        }
    }, [token, dispatch]);

    // Redirect on password change success
    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/'); // Redirect to home page
        }
    }, [status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            dispatch(changePassword({ 
                token: token as string, 
                newPassword: formData.newPassword, 
                confirmPassword: formData.confirmPassword 
            }))
            .unwrap()
            .then(() => {
                navigate('/'); // Redirect to homepage on success
            })
            .catch((error) => {
                // Handle the error here (optional)
                setIsConfirmed(false);
                setIsLoading(false);
                setError('Failed to change password: ' + error);
            });
        } else {
            setIsConfirmed(false);
            setIsLoading(false);
            setError("Passwords do not match");
        }
    };

    if (!isLoading && !isConfirmed) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold uppercase">Something Wrong Happened</h1>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        );
    }

    if(token){
        return (
            <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-10  mt-[60px]">
                <div className='bg-white flex flex-row rounded-[20px] overflow-hidden'>
                    <div className="hidden lg:flex px-20 justify-center items-center bg-amber-100 bg-opacity-[40%] min-h-[450px] xl:min-h-[500px]">
                        <div className="min-w-[300px] text-center">
                            <img src="/resetPassword.png" className="max-w-[270px] m-auto"/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-4 xs:p-8 sm:px-16 sm:min-h-[450px] xl:min-h-[500px]">
                        <form onSubmit={handleSubmit} className='min-w-[270px]'>
                            <div className='flex justify-center items-center flex-grow md:flex-grow-0 mb-10'>
                                <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                                <p className="flex text-xl text-primary uppercase">Farabix</p>
                            </div>
                            <PasswordInput headerText="New Password" placeholder="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                            <PasswordInput headerText="Confirm New Password" placeholder="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

                            <div className='mt-10'>
                                <PrimaryButton text="Change" type="submit" fullWidth={true}/>
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row justify-center items-center w-full">
                                <p className="text-xs md:text-sm order-2 md:order-1">
                                    <a href="/auth/Login" className="text-primary">Cancel</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePasswordForm;
