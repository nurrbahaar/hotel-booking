import React from 'react'
import { assets } from '../assets/assets';


const Footer = () => {
    return (
        <div className=' bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    { /* burdaki logoyu kaldÄ±rÄ±cam yerine roomy logosu yapÄ±cam */}
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>Roomy</h1>
                    {/* <p className='text-sm'>Footer açýklamasý buraya gelebilir</p> */}
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                        <img src={assets.instagramIcon} alt="instagram-icon" className='w-6' />
                        <img src={assets.facebookIcon} alt="facebook-icon" className='w-6' />
                        <img src={assets.twitterIcon} alt="twitter-icon" className='w-6' />
                        <img src={assets.linkedinIcon} alt="linkedin-icon" className='w-6' />

                    </div>
                </div>




            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>Â© {new Date().getFullYear()} Roomy. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
