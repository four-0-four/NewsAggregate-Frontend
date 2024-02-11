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
            <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
                <Box title="Change Password" size='small'>
                    <form onSubmit={handleSubmit}>
                        <PasswordInput headerText="New Password" placeholder="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                        <PasswordInput headerText="Confirm New Password" placeholder="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center w-full">
                            <p className="text-xs md:text-sm order-2 md:order-1">
                                <a href="/auth/Login" className="text-primary">Cancel</a>
                            </p>
                            <PrimaryButton text="Change" type="submit"/>
                        </div>
                    </form>
                </Box>
            </div>
        );
    }
}

export default ChangePasswordForm;
