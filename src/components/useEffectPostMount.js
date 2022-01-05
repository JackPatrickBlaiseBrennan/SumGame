import { useEffect, useRef } from 'react';

const useEffectPostMount = (func, deps) => {
    const postMount = useRef(false);

    useEffect(() => {
        if (postMount.current) func();
        else postMount.current = true;
    }, deps);
}

export default useEffectPostMount;