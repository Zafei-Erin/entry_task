import { Component, createResource, createSignal,Show } from 'solid-js';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';

export type ResultType = {
  token: string,
  name: string,
  symbol: string,
  totalSupply: string 
}

const App: Component = () => {
  const [status, setStatus] = createSignal<string>()
  const [result, setResult] = createSignal<ResultType>()
  const fetchUser = async (addr: string) => (await fetch(`https://phoenix-lcd.terra.dev/cosmwasm/wasm/v1/contract/${addr}/smart/ewogICJ0b2tlbl9pbmZvIjoge30KfQ==`)).json()


  function getAddressData (address: string): void {
    if (address === "") {
      setStatus("empty")
      return
    }

    fetchUser(address).then((res)=>{
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
        totalSupply: (res.data.total_supply/(Math.pow(10, res.data.decimals))).toFixed(2)
      }

      setResult(result)    
    })
  }
  
  return (
    <div class='h-screen bg-gray-800 flex flex-col items-center justify-center'>
      <div class='sm:w-8/12 md:w-3/5 lg:w-1/3'>
        <SearchBar getAddressData={getAddressData}/>
        <Show when={status() === 'empty'}>
          <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 text-slate-800 rounded-lg">
              <h1>please enter a token addr</h1>
          </div>
        </Show>
        <Show when={status() === 'error'}>
          <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 text-slate-800 rounded-lg">
              <h1>No data return, please check your token addr</h1>
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
