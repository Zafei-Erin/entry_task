import { Component, createResource, createSignal,Show } from 'solid-js';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import warning from './assets/caution.svg'
import error from './assets/error.svg'

export type ResultType = {
  token: string,
  name: string,
  symbol: string,
  totalSupply: string 
}

const App: Component = () => {
  const [status, setStatus] = createSignal<string>()
  const [result, setResult] = createSignal<ResultType>()
  const fetchData = async (addr: string) => (await fetch(`https://phoenix-lcd.terra.dev/cosmwasm/wasm/v1/contract/${addr}/smart/ewogICJ0b2tlbl9pbmZvIjoge30KfQ==`)).json()
  const fetchLogo = async (addr: string) => (await fetch(`https://phoenix-lcd.terra.dev/cosmwasm/wasm/v1/contract/${addr}/smart/ewogI`)).json()


  function getAddressData (address: string): void {
    if (address === "") {
      setStatus("empty")
      return
    }

    setStatus("loading")

    fetchData(address).then((res)=>{
      if(res.code) {
        setStatus("error")
        return
      }

      setStatus("success")
      console.log(JSON.stringify(res));
      const result = {
        token: address,
        name: res.data.name,
        symbol: res.data.symbol,
        totalSupply: (res.data.total_supply/(Math.pow(10, res.data.decimals))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }

      setResult(result)    
    })
  }
  
  return (
    <div class='px-3 h-screen bg-gray-900 flex flex-col items-center justify-center'>

      <div class='w-2/3 sm:w-8/12 md:w-3/5 lg:w-1/3 '>
        <SearchBar getAddressData={getAddressData}/>
        <Show when={status() === 'empty'}>
          <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-lg md:text-xl text-zinc-50 flex items-center gap-4">
            <img src={warning}/> please enter a token addr
          </div>
        </Show>
        <Show when={status() === 'error'}>
          <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-md md:text-lg bg-gray-700 text-gray-50 rounded-lg flex gap-4">
          <img src={error}/> No data return, please check your token address.
          </div>
        </Show>
        <Show when={status() === 'loading'}>
          <div class='flex items-center justify-center mt-6'>
            <Loader/>
          </div>
        </Show>
        <Show when={status() === 'success'}>
          <ResultCard result={result}/>
        </Show>
      </div>
    </div>
  );
};

export default App;

