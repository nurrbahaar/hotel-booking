import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    placeholderImage: roomImg1,
}

export const cities = [
    "Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "Gumushane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Sanliurfa", "Siirt", "Sinop", "Sirnak", "Sivas", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Ay\u015Fe Y\u0131lmaz", address: "\u0130stanbul, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Daha \u00F6nce bir\u00E7ok rezervasyon sitesi kulland\u0131m ama hi\u00E7biri Roomy'nin sundu\u011Fu ki\u015Fiselle\u015Ftirilmi\u015F deneyim ve detaylara g\u00F6sterilen \u00F6zenle k\u0131yaslanamaz." },
    { id: 2, name: "Mehmet Demir", address: "Ankara, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "Roomy beklentilerimi a\u015Ft\u0131. Rezervasyon s\u00FCreci sorunsuzdu ve oteller kesinlikle birinci s\u0131n\u0131ft\u0131. \u015Eiddetle tavsiye ederim!" },
    { id: 3, name: "Zeynep Kaya", address: "\u0130zmir, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Harika hizmet! En iyi l\u00FCks konaklama yerlerini her zaman Roomy arac\u0131l\u0131\u011F\u0131yla buluyorum. \u00D6nerileri asla hayal k\u0131r\u0131kl\u0131\u011F\u0131na u\u011Fratm\u0131yor!" },
    { id: 4, name: "Can \u00D6zt\u00FCrk", address: "Antalya, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200", rating: 5, review: "M\u00FC\u015Fteri deste\u011Fi ola\u011Fan\u00FCst\u00FC. Son dakikada rezervasyonumu de\u011Fi\u015Ftirmeme hi\u00E7 zorluk \u00E7\u0131karmadan yard\u0131mc\u0131 oldular. Ger\u00E7ekten 5 y\u0131ld\u0131zl\u0131 bir deneyim." },
    { id: 5, name: "Elif \u015Eahin", address: "Bursa, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", rating: 4, review: "Bu platform sayesinde Kapadokya'da gizli bir cennet buldum. Foto\u011Fraflar do\u011Fruydu ve fiyat rakipsizdi. Kesinlikle tekrar kullanaca\u011F\u0131m." },
    { id: 6, name: "Burak \u00C7elik", address: "Mu\u011Fla, T\u00FCrkiye", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200", rating: 5, review: "Kullan\u0131c\u0131 aray\u00FCz\u00FC \u00E7ok temiz ve kullan\u0131m\u0131 kolay. T\u00FCm balay\u0131 seyahatimi buradan ayarlad\u0131m ve her \u015Fey m\u00FCkemmel bir \u015Fekilde ilerledi." }
];

// Facility Icon
export const facilityIcons = {
    // English
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
    "WiFi": assets.freeWifiIcon,
    "TV": assets.homeIcon,
    "Air Conditioning": assets.mountainIcon,
    "Mini Bar": assets.roomServiceIcon,
    "View": assets.locationFilledIcon,
    
    // Türkçe Karakterler Doðrudan
    "Ücretsiz Wi-Fi": assets.freeWifiIcon,
    "ÜCRETSÝZ WI-FI": assets.freeWifiIcon,
    "ÜCRETSÝZ WÝ-FÝ": assets.freeWifiIcon,
    "Ucretsiz Wi-Fi": assets.freeWifiIcon,

    "Yüzme Havuzu": assets.poolIcon,
    "YÜZME HAVUZU": assets.poolIcon,

    "Kahvalt\u0131 Dahil": assets.freeBreakfastIcon,
    "KAHVALTI DAH\u0130L": assets.freeBreakfastIcon,
    "KAHVALTI DAHIL": assets.freeBreakfastIcon,

    "Havaalan\u0131 Servisi": assets.locationFilledIcon, 
    "HAVAALANI SERV\u0130S\u0130": assets.locationFilledIcon,
    "HAVAALANI SERVISI": assets.locationFilledIcon,

    "Spa": assets.heartIcon,
    "SPA": assets.heartIcon,

    "Spor Salonu": assets.homeIcon,
    "SPOR SALONU": assets.homeIcon,

    "Restoran": assets.roomServiceIcon,
    "RESTORAN": assets.roomServiceIcon,

    "Bar": assets.roomServiceIcon,
    "BAR": assets.roomServiceIcon,

    "Otopark": assets.locationFilledIcon,
    "OTOPARK": assets.locationFilledIcon,

    "Oda Servisi": assets.roomServiceIcon,
    "ODA SERVÝSÝ": assets.roomServiceIcon,
    "ODA SERVISI": assets.roomServiceIcon,

    "Klima": assets.mountainIcon,
    "KLÝMA": assets.mountainIcon,
    "KLIMA": assets.mountainIcon,

    "Evcil Hayvan Dostu": assets.heartIcon,
    "EVCÝL HAYVAN DOSTU": assets.heartIcon,

    "7/24 Resepsiyon": assets.homeIcon,
    "7/24 RESEPSÝYON": assets.homeIcon,
    
    // Fallbacks
    "Wifi": assets.freeWifiIcon,
    "Havuz": assets.poolIcon,
    "Kahvaltý": assets.freeBreakfastIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Temiz ve G\u00FCvenli Konaklama", description: "Sizin i\u00E7in bak\u0131ml\u0131 ve hijyenik bir alan." },
    { icon: assets.badgeIcon, title: "Geli\u015Fmi\u015F Temizlik", description: "Bu ev sahibi Roomy'nin s\u0131k\u0131 temizlik standartlar\u0131na uyar." },
    { icon: assets.locationFilledIcon, title: "M\u00FCkemmel Konum", description: "Misafirlerin %90'\u0131 konuma 5 y\u0131ld\u0131z verdi." },
    { icon: assets.heartIcon, title: "Sorunsuz Giri\u015F", description: "Misafirlerin %100'\u00FC giri\u015F i\u015Flemine 5 y\u0131ld\u0131z verdi." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 399,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 299,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 249,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 199,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    }
]



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/