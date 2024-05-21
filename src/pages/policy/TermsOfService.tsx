import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="">
            <h1 className='font-bold text-xl'>Terms of Service</h1>

            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>1. Introduction</h3>
                Welcome to Farabix. By using our website, you agree to these Terms of Service. Our platform features news aggregated from various reputable news sources like BBC, PBS, Reuters, etc. Users can customize their news experience by selecting preferred sources and topics of interest.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>2. User Accounts</h3>
                <span className='font-bold'>Account Creation:</span> Users must provide accurate and current information when creating an account. Misleading information may result in account suspension or termination.
                <br/><span className='font-bold'>Account Responsibility:</span> Users are responsible for maintaining the security of their account credentials and for all activities that occur under their account. Sharing account details is prohibited.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>3. Content Usage</h3>
                <span className='font-bold'>Content Guidelines:</span> Users can access news content aggregated from various sources. All content must be used in accordance with ethical standards and respect for intellectual property rights.
                <br/><span className='font-bold'>Intellectual Property:</span> Users must respect intellectual property rights and ensure proper attribution to sources like BBC, PBS, Reuters, etc., when using their content.
                <br/><span className='font-bold'>Prohibited Content:</span> Users are prohibited from using the platform to disseminate false information, defamatory content, or engage in illegal activities.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>4. Content Moderation</h3>
                <span className='font-bold'>Moderation Rights:</span> We reserve the right to remove or modify any content that violates these Terms of Service.
                <br/><span className='font-bold'>Appeals:</span> Users can appeal moderation decisions through designated channels provided on the website.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>5. Third-Party Links and Services</h3>
                <span className='font-bold'>Third-Party Content:</span> Our platform may contain links to third-party websites. We are not responsible for the content or practices of these websites. Users should review the terms and privacy policies of any third-party sites they visit.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>6. Liability and Disclaimer</h3>
                <span className='font-bold'>Limitation of Liability:</span> Farabix is not liable for any damages arising from the use of the service. This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.
                <br/><span className='font-bold'>No Warranty:</span> Farabix provides no warranty on the accuracy, reliability, or completeness of the information provided. The service is provided "as is" without any express or implied warranties.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>7. Changes to the Terms</h3>
                <span className='font-bold'>Modification of Terms:</span> We may modify these Terms of Service at any time. Users will be notified of any changes, and the updated terms will be posted on the website.
                <br/><span className='font-bold'>Acceptance of Changes:</span> Continued use of the platform after any modifications to the Terms of Service constitutes acceptance of those changes.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>8. Governing Law</h3>
                <span className='font-bold'>Jurisdiction:</span> These Terms of Service are governed by the laws of Ontario, Canada. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Ontario.
            </div>
            <div className="mt-4">
                <h3 className='font-bold text-lg mb-2'>9. Contact Information</h3>
                For queries or concerns, please contact us at contact@farabix.com.
            </div>
        </div>
    );
};

export default TermsOfService;