import './App.css'

function App() {




  return (
    <>
      <main className='flex justify-center'>
        <header className='mb-20 flex flex-col items-center justify-center bg-[url("/pattern-bg-desktop.png")] h-[250px] w-full'>

          <h1 className='text-xl font-bold text-white mb-10'> IP Address Tracker </h1>

          <form action="" className='flex items-center rounded overflow-hidden w-110'>
            <input type="text" id="ip-tracker-input" placeholder='Search for any IP address or domain'
             className='flex-grow pl-3 py-2 outline-none bg-white text-gray-400 placeholder-gray-400 border-none'/>
            <button type='submit' className='flex-shrink-0 px-3 py-2 bg-black hover:bg-purple-300'>
              <img src="/public/icon-arrow.svg" alt="icon" className='w-6 h-6' />

            </button>
          </form>

        </header>

      

      </main>
    </>
  )
}

export default App
