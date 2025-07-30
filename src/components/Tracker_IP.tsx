import { useState, useEffect } from "react"

interface Location {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    timezone: string;
}

interface asInfo {
    name: string;
    domain: string;
}

interface SearchIp {
    ip: string;
    location: Location[];
    sIfno: asInfo[];
}


const API_KEY_IPIFY = import.meta.env.VITE_IPIFY_API_KEY;


const Tracker_IP = () => {
  
const [ipData, setIpData] = useState<SearchIp | null>(null)

useEffect(() => {
    // TODO: fetch GET from API 
}, [])


  return (
    <div>
        <p>{ipData?.ip}</p>
    </div>
  )
}

export default Tracker_IP