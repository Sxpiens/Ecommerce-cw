import {Link} from 'react-router-dom';

function Inicio() {
    return (
        <section
            className="w-full relative bg-gray-50 py-10"
            style={{ minHeight: "calc(100vh - 76px)" }}
        >
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className='font-serif font-black italic text-4xl md:text-5xl p-4 text-slate-800'>Bienvenidos</h1>

                <div className="w-24 h-1 bg-pink-400 mx-auto mb-8 rounded-full"></div>

                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    En <span className="font-semibold text-pink-500">SweetBox</span>, entendemos que un regalo es mucho más que un objeto. Es una forma de decir "estoy pensando en ti". Nuestra inspiración surge de la autenticidad de esos momentos, creando piezas que capturan la esencia de quien regala y de quien recibe.
                </p>

                <p className="text-lg text-slate-600 leading-relaxed italic mb-10">
                    "Diseñado para todos los que creen que los pequeños gestos construyen los grandes recuerdos."
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/catalogo"
                        className="inline-block bg-slate-800 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-500 transition-all shadow-md transform hover:scale-105"
                    >
                        VER CATÁLOGO
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Inicio;