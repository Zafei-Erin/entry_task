import { ResultType } from "../App"

type PropsType = {
    result:() => ResultType|undefined
}


export default function ResultCard(props: PropsType) {
    const {result} = props

    return(
        <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 text-slate-800 rounded-lg">
            <h1>Name: {result()?.name} </h1>
            <h1>Symbol: {result()?.symbol} </h1>
            <h1>Total supply: {result()?.totalSupply} </h1>

        </div>
    )
}