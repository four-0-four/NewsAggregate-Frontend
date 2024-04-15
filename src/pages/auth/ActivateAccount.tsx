import React, { useState, useEffect } from 'react';
import Input from '../../components/Inputs/Input';
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { confirmResetToken, changePassword, confirmRegistrationToken, loginUser } from '../../lib/features/user/thunks'; // Adjust the import path
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import Box from '../../components/Box/Box';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PasswordInput from '../../components/Inputs/PasswordInput';

const ActivateAccount = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access the URL
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Parse the query string to get the token
    const { token } = queryString.parse(location.search);

    // Validate token before page loads
    useEffect(() => {
        const tokenStr = typeof token === 'string' ? token : ""; // Ensure token is a string
        if (tokenStr) {
            dispatch(confirmRegistrationToken({ token: tokenStr })).unwrap()
                .then(() => {
                    setIsConfirmed(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsConfirmed(false);
                    setIsLoading(false);
                    // Optionally navigate the user away or show an error message
                });
        } else {
            // Handle the absence of a token, such as redirecting the user or showing an error
            setIsLoading(false);
            navigate('/auth/Login');
            // navigate('/some-error-page'); // Uncomment and adjust as necessary
        }
    }, [dispatch, token]);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username: formData.username, password: formData.password }))
            .unwrap()
            .then(() => {
                navigate('/'); // Redirect to homepage on success
            })
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

    if (!isLoading) {
        return (
            <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-10  mt-[60px]">
            <div className='bg-white flex flex-row rounded-[20px] overflow-hidden'>
                <div className="hidden lg:flex px-20 justify-center items-center bg-amber-100 bg-opacity-[40%] min-h-[450px] xl:min-h-[500px]">
                    <div className="min-w-[300px] text-center">
                        <img src="/welcome.png" className="max-w-[270px] m-auto"/>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 xs:p-8 sm:px-16 w-[95vw] max-w-[450px]  sm:min-h-[450px] xl:min-h-[500px]">
                    <form onSubmit={handleSubmit} className='min-h-[270px] w-[95vw] max-w-[450px] '>
                        <div className='flex justify-center items-center flex-grow md:flex-grow-0 mb-10'>
                            <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                            <p className="flex text-xl text-primary uppercase">Farabix</p>
                        </div>
                        {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                        <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                        <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />

                        <div className="mt-10 flex flex-col md:flex-row justify-end items-end w-full">
                            <PrimaryButton type="submit" text="Log In" fullWidth={true}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default ActivateAccount;
