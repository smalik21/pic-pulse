import sampleImg from '../assets/sample-image.svg'
import sampleImage from '../assets/sample-img.svg'

const MainSection = () => {
    return (
        <main className='p-2 sm:p-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            <img className='' src={sampleImg} />
            <img src={sampleImg} />
            <img src={sampleImage} />
            <img src={sampleImg} />
            <img src={sampleImage} />
            <img src={sampleImg} />
        </main>
    )
}

export default MainSection
