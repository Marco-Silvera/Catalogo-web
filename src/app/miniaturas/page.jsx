import HeroMiniatures from '../components/HeroMiniatures';

function Miniaturas() {

    return (
            <main className='flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10'>
                <HeroMiniatures />
                {/* <MiniatureListMiniatures /> */}
            </main>
    );
}

export default Miniaturas;