import { createMemo } from "solid-js";
import { ResultType } from "../App";

type PropsType = {
    rawResult: ResultType
    data: number
}


export default function ResultCard(props: PropsType) {
    const result = {
        data: props.data,
        name: props.rawResult.name,
        symbol: props.rawResult.symbol,
        totalSupply: (Number(props.rawResult.total_supply)/(Math.pow(10, props.rawResult.decimals))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    
    const bigData = createMemo(() => props.data * 2)
    
    console.log(result)

    return(
        <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 bg-gray-800 rounded-lg">
            <span class="text-gray-50 font-bold text-xl sm:text-2xl md:text-3xl">{result.name}</span>
            <div class="mt-4 sm:text-lg md:text-xl">
                {/* using a memo tracks changes from setInterval in the App.tsx file, UNCOMMENT BELOW TO DEMO */}
                <h1 class="text-slate-400 my-1">Symbol: ({bigData()})
                    <span class="ml-1 text-gray-50 font-semibold">{result.symbol}</span> 
                </h1>

                {/* using prop attribute directly tracks changes also, since props are signals, UNCOMMENT BELOW TO DEMO */}
                {/* <h1 class="text-slate-400 my-1">Symbol: ({props.data})
                    <span class="ml-1 text-gray-50 font-semibold">{result.symbol}</span> 
                </h1> */}

                {/* accessing prop value by first storing it in an object breaks reactivity, cant track changes, UNCOMMENT BELOW TO DEMO */}
                {/* <h1 class="text-slate-400 my-1">Symbol: ({result.data})
                    <span class="ml-1 text-gray-50 font-semibold">{result.symbol}</span> 
                </h1> */}
                <h1 class="text-slate-400 my-1">Total supply: 
                    <span class="ml-1 text-gray-50 font-semibold">{result.totalSupply}</span> 
                </h1>
            </div>
        </div>
    )
}