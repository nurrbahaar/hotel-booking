import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({ rating = 4 }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <img
                    key={index}
                    src={index < rating ? assets.starIconFilled : assets.starIconOutlined}
                    alt={index < rating ? "filled-star" : "empty-star"}
                    className="w-4 h-4"
                />
            ))}
        </div>
    )
}

export default StarRating
