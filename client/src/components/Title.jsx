import React from 'react'

const Title = ({ Title, subtitle, align, font, }) => {
    return (
        <div className={`flex flex-col justify-center items-center text-center ${align === 'left' ? "md:items-start md:text-left" : ""} `}>
            <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>
                {Title}
            </h1>
            <p className='text-sm md:text-base'>
                {subtitle}
            </p>
        </div>
    )
}

export default Title
