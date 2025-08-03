import { useState, useEffect } from "react"

interface Location {
    country: string;
    region: string;
    city: string;
    postalCode?: string;
    timezone?: string;
}

interface asInfo {
    name?: string;
    domain?: string;
}

interface SearchIp {
    ip: string;
    location: Location;
    asIfno: asInfo;
}

interface InputProps {
  ipValue: string;
  onChange: (ip: string) => void;
}


const API_KEY_IPIFY = import.meta.env.VITE_IPIFY_API_KEY;


const Tracker_IP: React.FC<InputProps> = ({ ipValue, onChange }) => {
  
const [ipData, setIpData] = useState<SearchIp | null>(null)
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState<boolean>(true)


useEffect(() => {
        const fetchFromAPI = async () => {
        try{
            setLoading(true);
            const response = await fetch(
                `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_IPIFY}&ipAddress=${ipValue}`
            );
                const data = await response.json();

                if(!data.ip || !data.location || !data.as){
                    throw new Error('Invalide API Respone');
                }

                const parsedData: SearchIp = {
                    ip: data.ip,
                    location: {
                        country: data.location.country,
                        region: data.location.region,
                        city: data.location.city,
                        postalCode: data.location.postalCode,
                        timezone: data.location.timezone,
                    },
                    asIfno: {
                        name: data.as.name,
                        domain: data.as.domain,
                    },
                };

                setIpData(parsedData);
                setError(null);
            }  
            catch(e){
                console.error('Failde to fetch IP data: ', e);
                setError("Error get info from API! ");
                setIpData(null);
            } finally{
                setLoading(false);
            }
        };
        if(ipValue){
            fetchFromAPI();
        }
}, [ipValue])


  return (
    <div>
        {ipData && (
            <p>{ipData.ip}</p>
        )}
    </div>
  )
}

export default Tracker_IP