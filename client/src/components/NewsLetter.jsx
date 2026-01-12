
import React from 'react'
import { assets } from '../assets/assets';
import Title from './Title';


const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
            <Title Title={'\u0130lham Al\u0131n'} subtitle={'B\u00FCltenimize kat\u0131l\u0131n ve yeni destinasyonlar\u0131 ilk ke\u015Ffeden siz olun.'} />            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <input type="text" className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full" placeholder="E-posta adresinizi girin" />
                <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">{'Kay\u0131t Ol'}
                    <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert group-hover:translate-x-1 transition-all' />
                </button>
            </div>
            <p className="text-gray-500 mt-6 text-xs text-center">{'Abone olarak, Gizlilik Politikam\u0131z\u0131 kabul etmi\u015F ve g\u00FCncellemeleri almay\u0131 onaylam\u0131\u015F olursunuz.'}</p>
        </div>
    )
}

export default NewsLetter
