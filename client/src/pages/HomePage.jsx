import arbol from "../assets/arbol.jpg"

export default function HomePage() {
    return (
        <div className="flex justify-between p-10">
            <div>
                <h1 className="text-4xl font-bold pb-3">Task tree</h1>
                <p className="text-3xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic possimus libero doloribus autem exercitationem cumque impedit et, dignissimos nulla nesciunt!</p>
            </div>
            <img style={{ width:'500px', borderRadius: '5px' }}
             src={arbol} alt="portada" />
        </div>
    )
}