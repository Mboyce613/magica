import useSound from "use-sound";
import plusSound from '../../../dist/assets/plus.mp3'

const PlusSound = ()=>{
    const [play, {stop}] = useSound(plusSound,{volume:.1})

    return (
        <>
        <button onMouseEnter={() => play()} onMouseLeave={() => stop()}>Plus</button>
        </>
    )
}

export default PlusSound
