import { createSignal } from "solid-js";
import { ResultType } from "../App";

type PropsType = {
    // searchText:() => string,
    // setSearchText:(value?: string | ((prev?: string) => string)) => string,
    getAddressData: (value: string) => void
}

let val: HTMLInputElement

export default function SearchBar(props: PropsType) {
    const {getAddressData} = props
  
    return (
      <div class="w-full flex sm:text-lg md:text-xl text-white">
        <input 
          ref={val}
          class='flex-1 bg-transparent py-3 px-4 outline-none sm:py-4 sm:px-5 focus:placeholder-gray-200 border-b-2 border-transparent focus:border-white'
          type="text" 
          placeholder='input a token address'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getAddressData(e.currentTarget.value);
              val.value=""
            }
          }}
        />

        <button 
          class="px-3 my-2 border-2 border-slate-200 rounded-lg"
          onClick={() => {
              getAddressData(val.value)
              val.value=""
            }
          }
          >
            Search
          </button>
     </div>
    )
}