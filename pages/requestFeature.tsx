import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { requestFeature } from '@/lib/features/user/thunks';
import Textarea from '@/components/Textarea';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetStatus, selectUserError, selectUserStatus } from '@/lib/features/user/slice';
import Input from '@/components/Input';
import FileInput from '@/components/FileInput';
import SocialMedia from '@/components/SocialMedia';

const requestFeatureForm = () => {
    const dispatch = useAppDispatch();
    const reduxError = useAppSelector(selectUserError);
    const status = useAppSelector(selectUserStatus);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    useEffect(() => {
        setError(reduxError ?? "")
    }, [reduxError])

    interface FormData {
        full_name: string;
        email: string;
        feature: string;
        description: string;
        files: File[];
    }
    
    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        email: '',
        feature: '',
        description: '',
        files: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangetextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const updatedFiles = [...formData.files];
    
            newFiles.forEach(newFile => {
                // Check if the file type is allowed and if it already exists in the formData files array
                const isFileTypeAllowed = /\.(svg|png|jpg|jpeg|gif)$/i.test(newFile.name);

                if (!isFileTypeAllowed) setError("only svg, png, jpg, jpeg, gif files are allowed")
                else setError("");

                const doesFileExist = updatedFiles.some(file => file.name === newFile.name);
    
                if (isFileTypeAllowed && !doesFileExist) {
                    updatedFiles.push(newFile); // Add new file if it's an allowed type and doesn't exist
                }
            });
    
            setFormData({ ...formData, files: updatedFiles });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(requestFeature(formData)).then(() => {
          setSent(true);
        });
    };

    const clearFile = (filename: string) => {
        // Filter out the file with the provided filename
        const updatedFiles = formData.files.filter(file => file.name !== filename);
        
        // Update the state with the new list of files
        setFormData({ ...formData, files: updatedFiles });
    }
    
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <form onSubmit={handleSubmit} className="w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-[25px] border border-gray-100 ">
                <h1 className={`text-xl md:text-2xl font-bold text-left uppercase pb-4 font-semibold`}>
                  Request a Feature
                </h1>
                <p className={`text-sm sm:text-md border-b border-gray-100 text-neutral-500 pb-4 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"}`}>
                  Got an idea for a feature that could enhance our service? we'd love to hear about it! Share your thoughts and help shape the future of our product.
                </p>
                 
                  {sent && (
                      <div className="flex flex-col xs:flex-row items-center mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-1/2 xs:w-1/3 h-auto mb-4 md:mb-0 md:ml-8"><g fill="#000000" fill-rule="evenodd"><path d="M191.74 114.5c-0.92 2 0 1.88 0.2 1.52a6 6 0 0 1 4.8 -2.94 17.14 17.14 0 0 1 2.38 0.1c1.06 0.14 1.3 0.26 1.4 0s-6.52 -3.62 -8.78 1.32zm36.98 -10.9a0.32 0.32 0 0 0 -0.2 -0.4c-7.42 -3.6 -12 5.14 -10.98 5.6 0.36 0.14 0.3 -0.16 1.38 -1.42 4.72 -5.38 9.58 -3.06 9.8 -3.78zM224 96.34c0.32 0.24 1.24 -0.24 -0.82 -1.4 -2.78 -1.56 -8.5 -0.92 -8.48 -0.2s8.1 0.98 9.3 1.6zm-15.38 31.08c-0.94 -3.06 -2.62 -18.4 -3.46 -18.3s1.02 19.8 2.98 19.76a12.56 12.56 0 0 0 3.58 -0.88c0.52 -0.2 3.62 -1.46 3.34 -2s-2.08 1.12 -6.44 1.42zm21.92 -4.18a17.78 17.78 0 0 1 0.22 2.12c0.36 6.86 -5 7.48 -5.24 7.68s-0.58 0.88 1.9 0c8.08 -2.7 2.16 -15.5 3.12 -9.8zM173.4 140.46a0.22 0.22 0 0 0 0.28 0 0.22 0.22 0 0 0 0 -0.28C136.16 108.6 110.24 86.98 61.28 47a0.2 0.2 0 0 0 -0.28 0 0.2 0.2 0 0 0 0 0.28c44.6 37.54 68.62 57.44 112.4 93.18zM106.5 170.72l10.8 2.36a0.2 0.2 0 0 0 0 -0.4l-10.74 -2.58c-124.16 -29.76 -131.98 -28.34 -0.06 0.62zm34.22 52.34a0.2 0.2 0 0 0 0 -0.26 0.2 0.2 0 0 0 -0.26 -0.1c-32.56 12.42 -49.02 18.32 -123.9 48a0.2 0.2 0 0 0 -0.12 0.26 0.22 0.22 0 0 0 0.28 0.12c80.4 -30.36 115.1 -44.52 124 -48.02z" stroke-width="1"></path><path d="M374.46 199.34a78.16 78.16 0 0 0 -31.04 -28.6c-1 -5.74 -11.46 -58.24 -57.72 -70.34 0 0 2.48 -58.98 -37.76 -60.96 -41.08 -2 -56.94 20.86 -56.92 20.8S166.74 74 187.38 119.12c4.28 27.54 22.34 43.78 51.12 36.44l3.06 6.16c-2.84 0.3 -25.44 3.12 -50.82 21.02C132.38 223.86 110 312 129.54 346a26.92 26.92 0 0 0 20 14.18c45.16 6.48 64.14 -49.72 69 -95.12 4.88 8.2 11.4 18.42 19.16 29.06 -0.68 11.18 -4 42.5 -0.9 64a0.2 0.2 0 0 0 0.22 0.18 0.24 0.24 0 0 0 0.18 -0.22c-1.86 -18 0.68 -53.76 0.92 -63.38 1.26 1.74 2.58 3.48 4 5.22 -0.18 2.88 -1.34 11.46 -2 21.82 -1.8 29.14 2 39.22 1.54 36.32 -2.68 -21.36 0.54 -49.16 0.86 -57.58C266.7 332 304 368.32 342 356.46c63.58 -19.9 51.06 -125.56 32.46 -157.12zm-90.32 -51.52c-21.22 11.56 -21.86 12 -21.04 20.92 -0.62 0.38 -1.26 0.78 -1.88 1.2h-0.16c-0.92 -9.16 -1.06 -11.54 6.42 -16l14.52 -9zM261.2 171.3h0.12l2.14 0.9c2.72 24.92 -7.06 34.4 -14.9 85.56 -1.28 -1 -2.72 -2.22 -3.78 -3.14 3.74 -25.14 16.56 -57.9 16.94 -72.6a83.66 83.66 0 0 0 -0.52 -10.72zm1.48 -0.96 0.54 -0.34v0.82l-0.6 -0.24zM239.56 156c-0.4 -0.72 -0.44 -1.48 -0.96 -1.34 -33.36 7.54 -51.8 -17.14 -50.92 -46a40.98 40.98 0 0 1 4.48 -5.26 9.4 9.4 0 0 1 1.68 -1.28 0.34 0.34 0 0 0 0.2 -0.4c-0.26 -0.82 -4.64 0.7 -6.26 4.78 0.68 -12 4.22 -28.82 17.6 -38.4 0 0 45.34 37.26 48 37.5s2.18 -11.6 8.22 -13.6 11.74 0.32 11.84 8.36a18 18 0 0 1 -9.44 15.18 270 270 0 0 0 17.76 28.96c-17.44 10.32 -20.16 11.02 -21.52 15.62a24 24 0 0 0 -4.34 -3.14c-7.48 -4.04 -15.66 -1.62 -16.34 -0.98zm0.22 0.44c0.3 0 9.2 -3.16 20.1 4.14a12.38 12.38 0 0 0 -0.3 2.26c-6.68 -4.52 -14 -4.46 -18 -2zM191.5 183.8C218.24 164.62 242 162.42 242 162.42c0.74 0 0 -0.84 0 -1.04 5.44 -2 12.46 -0.24 17.72 2.26a55.24 55.24 0 0 0 0.38 5.8c-0.36 -0.16 -8.72 -3.64 -8.94 -3.18s8.74 4.34 8.94 4.42c-10 6.46 -11.16 8.42 0.24 1.2a79.34 79.34 0 0 1 0.42 10c-0.38 14.22 -12.72 45.6 -16.3 72.3a125.6 125.6 0 0 1 -11.86 -12.18c-5.82 -6.62 -7.24 -7.7 -9.22 -17.66 -1.74 -8.82 -23.34 -30 -25.52 -24 -3.54 -3.16 -5.72 -0.9 -5.16 1.82 -2.18 -0.96 -3.42 1.42 -3.2 4 -1.16 -0.86 -3.04 -0.14 -2.64 3.82 0.54 5.2 4.26 14.36 5.34 17.52 5.12 14.84 10.82 17.22 8.68 23.3C197.52 260.32 180 274.52 172 280.74c9.14 -34.34 15.5 -48 14.88 -48.22s-6.92 17.64 -8 21.18A41.14 41.14 0 0 0 140.44 248c11.56 -24.82 28.04 -47.68 51.06 -64.2zm-51.36 64.9a45.52 45.52 0 0 1 38.58 5.4l-0.66 2c-13.86 -8.9 -28.66 -9.54 -39.08 -4.88 0.38 -0.78 0.76 -1.66 1.16 -2.52zm9.64 109.72a25.1 25.1 0 0 1 -18.66 -13.32c-14 -24.36 -3.7 -67.2 7.58 -93.16 10.12 -4 24.58 -3.66 39.24 4.64 -2.14 7.28 -3.66 11.64 -6.46 24.58 -7.8 6.12 -15.38 11.32 -23.64 19.28a55.3 55.3 0 0 0 -8.42 9.56 0.22 0.22 0 0 0 0 0.28 0.2 0.2 0 0 0 0.28 0 55.3 55.3 0 0 1 8.5 -9.36c13.38 -12.56 59.78 -42.24 53.58 -55.24 -4 -8.28 -6.18 -10.88 -8.78 -18.34a136.44 136.44 0 0 1 -5 -15.12c-1.26 -5.7 0.46 -6.36 1.64 -4.8 2 10.86 15.12 30 19.06 39.6A190.2 190.2 0 0 0 218 264c-5.16 44.5 -24.16 100.96 -68.22 94.42zm191.8 -3.26c-23.06 7.18 -46 -3.84 -66.24 -21.2C239.06 302.8 212 251.18 210 246.5c-3.34 -8.24 -19.68 -34 -19.16 -41.34 0.48 -6.88 9.2 9.08 13.6 16a0.68 0.68 0 0 0 1.2 -0.66 110.7 110.7 0 0 0 -10.14 -15.88c-3.04 -3.48 -2.32 -8.92 6.18 2 7.02 9.02 6.96 12.16 8.26 11.44a0.66 0.66 0 0 0 0.26 -0.9 75.18 75.18 0 0 0 -11.16 -15.66c-1.08 -5.74 21.3 13.7 23.18 23.02a35.4 35.4 0 0 0 3.08 10c2.54 4.76 14.34 17.04 20.36 22 26.3 22 46.48 21.54 73.1 33.68 9.26 4.24 16.68 9.24 19.88 16a0.28 0.28 0 0 0 0.52 -0.24c-3.22 -6.94 -10.72 -12 -20.12 -16.44 -3.18 -1.48 -6.6 -2.86 -10.12 -4.18 0.88 -6.36 2.16 -13.24 3.44 -19.52a76 76 0 0 1 74.9 21.6c-3.26 31.04 -16.2 58.58 -45.68 67.74zm45.8 -67.88C366 264 334.18 258.6 312.4 265.64c0.24 -1.18 0.54 -2.54 0.78 -3.64 25.44 -6.26 56 -0.18 74.4 21.36a0.14 0.14 0 0 0 0.16 0c-0.1 1.34 -0.22 2.64 -0.36 3.92zm-74.12 -25.66c5.56 -25.22 10 -34.38 9.42 -34.6a0.18 0.18 0 0 0 -0.24 0c-7.04 19.82 -11.46 34.42 -13.9 58.26 -26 -9.72 -38.62 -10.88 -59.64 -27.42 8.4 -49.4 18.26 -61.34 15.54 -85.4 8.82 3.68 11.18 3.72 -0.14 -1.26 0 -0.24 -0.16 -1.48 -0.22 -1.84 9.76 -6.4 8.6 -6.68 -0.14 -1.24 -0.7 -7.76 -0.5 -8 20.46 -20a116.6 116.6 0 0 0 8.58 10.24s27.56 3.56 44.14 10c14.68 6.64 28.28 17.18 36.58 31.4 8.48 14.52 16.7 49.74 14 83.34 -18.4 -22.62 -49.7 -28.08 -74.44 -21.48z" stroke-width="1"></path></g></svg>

                        <p className="w-full xs:w-2/3 text-sm md:text-base text-left md:ml-8">
                          Thanks for your feature suggestion! Your input is crucial to our continuous improvement. We'll review your idea and explore how to incorporate it. We appreciate your involvement and look forward to enhancing our services with your feedback.
                        </p>
                      </div>
                  )}
                  {status === 'failed' || error && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                  {!sent && status !== 'failed' && (
                    <>
                        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                            <Input headerText="Full Name" placeholder="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} />
                            <Input headerText="Email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <Input headerText="Feature" placeholder="Tell us briefly about this feature" name="feature" value={formData.feature} onChange={handleChange} />

                        <Textarea 
                            headerText="Detailed Description of the Feature" 
                            placeholder="1)Give us a full description of the feature you would like to see on the platform. 2)which part of the platform would you like to see this feature implemented?" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChangetextarea} 
                        />

                        <FileInput files={formData.files} headerText="[Optional] Related Screenshots to help us understand better" onFileChange={handleFileChange} clearFile={clearFile}/>

                        <div className="mt-10 flex flex-col md:flex-row justify-end items-center w-full">
                            <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm">
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </form>
            <SocialMedia />
        </div>
    );
}


import nookies from "nookies";
import { GetServerSideProps } from "next";
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

export default requestFeatureForm;
