import React, {useCallback, useEffect, useState} from 'react';


function getScrollTop() {
    return window.scrollY;
}

function useScroll() {
    const [scrollTop, setScrollTop] = useState(0);

    const onScroll = useCallback(() => {
        setScrollTop(getScrollTop());
    }, [])

    useEffect(() => {
        setScrollTop(getScrollTop());
        window.addEventListener('scroll', onScroll)
    });

    return {
        scrollTop
    }
}

export default useScroll;
