import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const ListingPage = () => {
    SwiperCore.use([Navigation]);
    const params = useParams()
    const [listing, setListing]= useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log(listing)

    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setLoading(true)
                const res = await fetch(`/server/listing/get/${params.listingId}`);
            const data = await res.json();
            setLoading(false)
            if(data.success === false){
                setError(true)
                setLoading(false)
                return;
            }
            setListing(data)
            setLoading(false)
            setError(false)
            } catch (error) {
               setError(true)
               setLoading(false) 
            }
            
        }
        fetchListing()
    },[params.listingId])
  return (
    <main>
        {/* if there is lising, then the listing.name */}
        {loading && loading ? "Loading..." : ""}
        {loading && <p className="text-center my-7 text-2xl">Loading</p>}
        {error && <p className="text-center text-red-700 my-7 text-2xl">Somthing went wrong</p>}
        {
            error &&  <Link to={'/home'} className="text-center my-5 text-green-700 text-xl justify-center mx-40">Back to home page</Link>
        }
        {listing && !error && !loading &&(
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>
                        (
                        
                        <SwiperSlide key={url}>
                        <div className="h-[450px]" style={{background:`url(${url}) center no-repeat`, backgroundSize:"cover"}}></div>
                        </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>


        )}
       
   
    </main>
  )
}

export default ListingPage
