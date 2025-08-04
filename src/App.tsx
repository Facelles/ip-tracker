import './App.css'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { useDebounce } from 'use-debounce'
import Tracker_IP from './components/Tracker_IP'



function App() {
  const [ipValue, setIpValue] = useState<string>("");
  const [debounceIpValue] = useDebounce(ipValue, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <main className='flex flex-col justify-center'>
        <header className='flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center bg-[url("/pattern-bg-desktop.png")] h-[250px] w-full'>

          <h1 className='text-3xl font-bold text-white mb-5'> IP Address Tracker </h1>

          <form onSubmit={handleSubmit} className='flex items-center rounded overflow-hidden w-110'>
            <input type="text" id="ip-tracker-input" placeholder='Search for any IP address or domain'
             className='flex-grow pl-3 py-2 outline-none bg-white text-gray-400 placeholder-gray-400 border-none'
             value={ipValue}
             onChange={handleInputChange}
             />
            <button type='submit' className='flex-shrink-0 px-3 py-2 bg-black hover:bg-purple-300'>
              <img src="/icon-arrow.svg" alt="icon" className='w-6 h-6' />

            </button>
          </form>

        </header>

        <section>
          <Tracker_IP ipValue={debounceIpValue} onChange={setIpValue} />
        </section>
        
        <section className='flex flex-col items-center justify-center bg-cover bg-center bg-gray-200 min-h-screen w-full' />
        

      </main>
    </>
  )
}

export default App
