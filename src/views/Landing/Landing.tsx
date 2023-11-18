import * as React from 'react';
import { ReactComponent as EmailIcon } from '../../assets/emailIcon.svg';
import { ReactComponent as TelegramIcon } from '../../assets/telegramIcon.svg';

export interface ILandingPageProps {
}

export default function LandingPage (props: ILandingPageProps) {
  return (
    <div className='xl:columns-4 md:columns-3 sm:columns-2 columns-1 gap-4 md:gap-8'>
        <div className='border-b border-gray-300'>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>What is Farabix?</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'>Farabix is a groundbreaking platform designed exclusively for journalists. We offer journalists a unique space to share their stories, investigations, and breakthroughs with the world, unfiltered and untouched by external influences. Our priority is to uphold the integrity of journalism by providing a secure, transparent, and direct line between journalists and readers.</p>
        </div>

        <div className='border-b border-gray-300 break-inside-avoid-column'>
            <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing2.jpg"
                className="object-cover max-h-32 w-full mb-4"/>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>Why join Farabix?</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Inclusive Platform:</span> A welcoming space for journalists from all backgrounds committed to truth and storytelling.</p>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Verification and Validation:</span> Rigorous verification ensures that only verified professional journalists share news.</p>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Unfiltered Publishing:</span> enabling journalists to publish their news directly to a global audience, bypassing biases and interference.</p>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Peer Review System:</span> Ensuring news quality through reviews conducted by journalists.</p>
        </div>

        <div className='border-b border-gray-300 break-inside-avoid-column mb-4'>
            <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing1.jpg"
                className="object-cover h-72 w-full mb-4"/>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>Take a Stand for Truth & Join Us Today</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'>If you're a journalist passionate about making a difference in the world, we invite you to join our mission. Submit your email, and we'll get in touch as we gear up for launch!</p>
            <div className='text-left mb-4'>
                <p className='xl:text-sm md:text-sm text-sm'>Your Email:</p>
                <input className="w-full rounded-md p-1 px-2 placeholder:text-gray-300 placeholder:text-xs" placeholder="name@email.com"/>
                <button className='w-full rounded-md bg-black text-white xl:text-sm md:text-xs text-xs p-2 mt-2'>Submit</button>
            </div>
        </div>

        <div className='border-b border-gray-300 mb-4 break-inside-avoid-column'>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>Who is the founder of Farabix?</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'>Hello there! I'm Sina, born in the vibrant city of Tehran, Iran, and raised amidst the diverse cultures of Mississauga, Canada. I'm a lover of news and a staunch believer in the power of transparent journalism. I hold a deep-seated passion for unearthing the truth and presenting it to the world unfiltered. It's this love for truth-telling and transparency that led me to create a unique news hub. A platform where verified journalists can share their stories with 100% transparency, encapsulating all perspectives.</p>
            <div className="flex items-center space-x-4 mb-4">
                <img className="w-10 h-10 rounded-md" src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/founder.jpg" alt="" />
                <div className="font-medium text-left xl:text-sm md:text-sm text-xs">
                    <div>Sina Rafiei</div>
                    <div className="text-gray-500">Founder</div>
                </div>
            </div>
        </div>
        
        <div className='border-b border-gray-300 break-inside-avoid-column mb-4'>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>What led me to create Farabix?</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'>Growing up in Iran, I witnessed severe government censorship leading to suppression, harm, and even death for journalists who challenged official narratives.My journey then took me to Canada, where I encountered a different kind of bias - the polarizing narratives of outlets like Fox News and CNN, showing me that impartiality in journalism was a global challenge.Motivated by these experiences, I set out to create a space where journalists can safely and anonymously publish their news with full transparency.</p>
        </div>

        <div className='border-b border-gray-300 break-inside-avoid-column mb-4'>
            <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>What is Farabix Missions?</h1>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Engineer a Truthful Journalism Platform:</span> Build a Secure & Transparent News Hub...</p>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Safeguard and Raise the Quality of News:</span> Aim to implement a robust journalist verification system...</p>
            <p className='text-left xl:text-base md:text-sm text-xs mb-4'><span className="font-bold">Empower Journalists with Financial Independence:</span> Endeavor to create multiple income avenues...</p>
        </div>

        <div className="">
            <div className='border border-black p-3'>
                <h1 className='text-left font-bold xl:text-4xl md:text-3xl text-2xl mb-2'>Contact Us</h1>
                <p className='text-left xl:text-base md:text-sm text-xs mb-4'>Please don't hesitate to reach out to us! We're here to help and always happy to assist. Feel free to contact us anytime.</p>
                <div className=''>
                    <a 
                        className='flex justify-start items-center mb-3 cursor-pointer' 
                        href="https://t.me/farabix" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <TelegramIcon className='w-8 h-8'/>
                        <span className='xl:text-base md:text-sm text-sm'>@Farabix</span>
                    </a>
                    <a 
                        className='flex justify-start items-center mb-3 cursor-pointer'  
                        href="mailto:contact@farabix.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <EmailIcon className='w-8 h-8'/>
                        <span className='xl:text-base md:text-sm text-sm'>contact@farabix.com</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}
