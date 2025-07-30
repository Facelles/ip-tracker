import { useState, useEffect } from "react"

interface Location {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    timezone: string;
}

interface as {
    name: string;
    domain: string;
}

interface SearchIp {
    location: Location[];
    as: as[];
}


const key = import.meta.env.VITE_IPIFY_API_KEY;


const Tracker_IP = () => {
  



  return (
    <>


    </>
  )
}

export default Tracker_IP