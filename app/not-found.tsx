import Image from 'next/image'
import notfound  from '@/public/notfound.svg'

export default async function NotFound() {

    // const data = fetchImage()
    // console.log(data)
    
    return(
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-center p-6'>Page not found</h2>
            <Image className='rounded-md m-2' src={notfound} alt="" width={300} height={300}/>
        </div>
    )
    
}

// async function fetchImage() {
//     const response = await fetch("https://random.dog/woof.json")
//     const json = await response.json();
//     return json.url;
// }
