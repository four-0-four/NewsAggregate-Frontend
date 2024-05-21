import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="">
            <h1 className='font-bold text-xl'>Privacy Policy</h1>

            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>1. Introduction</h3>
                Your privacy is important to us. This policy outlines our data handling practices to ensure transparency and protect your personal information.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>2. Information Collection</h3>
                <span className='font-bold'>Types of Data:</span> We collect personal data (such as name, email address, and contact information) and usage data (such as browsing history, preferences, and interactions with our website).
                <br/><span className='font-bold'>Collection Methods:</span> Data is collected directly from users through account registration, user interactions, and usage of the platform. Additionally, data may be collected through third-party sources, such as analytics services.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>3. Use of Information</h3>
                <span className='font-bold'>Purpose:</span> Collected data is used to enhance and personalize user experience, improve our services, and communicate with users. This includes sending updates, promotional materials, and responding to inquiries.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>4. Sharing and Disclosure</h3>
                <span className='font-bold'>Data Sharing:</span> Information may be shared with third parties under the following circumstances:
                <ul className="list-disc list-inside ml-4">
                    <li><span className='font-bold'>Legal Obligations:</span> When required by law, regulation, or legal process.</li>
                    <li><span className='font-bold'>Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.</li>
                </ul>
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>5. Data Security</h3>
                <span className='font-bold'>Protection Measures:</span> We implement robust security measures to protect user data from unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security assessments.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>6. User Rights</h3>
                <span className='font-bold'>Data Rights:</span> Users have the right to access, rectify, or delete their personal data. Requests for data access, correction, or deletion can be made through our contact channels provided below.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>7. International Transfers</h3>
                <span className='font-bold'>Cross-Border Data:</span> Information about users may be transferred to, and processed in, countries other than the country in which they reside. We ensure that international data transfers comply with applicable data protection laws and regulations.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>8. Changes to the Privacy Policy</h3>
                <span className='font-bold'>Policy Changes:</span> We reserve the right to modify this Privacy Policy at any time. Users will be notified of any changes, and the updated policy will be posted on the website.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>9. Contact Information</h3>
                For queries or concerns regarding this Privacy Policy, please contact us at contact@farabix.com.
            </div>
        </div>
    );
};

export default PrivacyPolicy;