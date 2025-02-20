// import { useEffect, useState } from 'react';
// import { supabase } from '../supabase/client';
// import ExclusiveListExclusives from '../components/ExclusiveListExclusives';
import HeroExclusives from "../components/HeroExclusives";

function Exclusives() {
    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroExclusives />
            {/* <ExclusiveListExclusives /> */}
        </main>
    );
}

export default Exclusives;
