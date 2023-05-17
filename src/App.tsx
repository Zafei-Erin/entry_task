import { Component, createResource, createSignal, Match, onMount, Suspense, Switch } from 'solid-js';
import warning from './assets/caution.svg';
import error from './assets/error.svg';
import Loader from './components/Loader';
import ResultCard from './components/ResultCard';
import SearchBar from './components/SearchBar';

export type ResultType = {
  name: string,
  symbol: string,
  total_supply: string,
  decimals: number
}

const fetchResult = async (addr: string) => {
  
}

const App: Component = () => {
  const [searchText, setSearchText] = createSignal<string>()
  const [rawResult] = createResource(searchText, async (addr) => {
    if(addr==""){
      return
    }
    const res = await fetch(`https://phoenix-lcd.terra.dev/cosmwasm/wasm/v1/contract/${addr}/smart/ewogICJ0b2tlbl9pbmZvIjoge30KfQ==`)
    return res.json()
  });

  const [data, setData] = createSignal<number>(1);

  onMount(() => {
    setInterval(() => {
      setData((p) => p+1)
    }, 123)
  })

  return (
    <div class='px-3 h-screen bg-gray-900 flex flex-col items-center justify-center'>

      <div class='w-3/4 sm:w-8/12 md:w-3/5 lg:w-1/3 '>
        <SearchBar setSearchText={setSearchText} />
        
        <Suspense fallback={
          <span class='flex items-center justify-center mt-6'>
            <Loader/>
          </span> }>
            <Switch>
              <Match when={searchText() === ''}>
                <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-lg md:text-xl text-zinc-50 flex items-center gap-4">
                  <img src={warning}/> please enter a token address.
                </div>
              </Match>
              <Match when={rawResult()?.message}>
                <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-md md:text-lg bg-gray-700 text-gray-50 rounded-lg flex gap-4">
                  <img src={error}/> No data return, please check your token address.
                </div>
              </Match>
              {/* success case */}
              <Match when={!rawResult.loading && !rawResult.error && rawResult()}>
                <ResultCard data={data()} rawResult={rawResult()?.data}/>
              </Match>
            </Switch>
          </Suspense>
      </div>
    </div>
  );
};

export default App;

