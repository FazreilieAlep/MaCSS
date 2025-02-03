import React, { useEffect, useRef, useState } from 'react';
import './Reels.css';

const Reels = () => {
    const pageRef = useRef(null);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);
    const [reelsData, setReelsData] = useState([]);
    const [trackedIds, setTrackedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchReelsData = async () => {
        try {
            setLoadingMore(true);
            const response = await fetch('https://mef-3dpm.onrender.com/anime/get_random');
            const data = await response.json();
            if (Array.isArray(data)) {
                const newReels = data.filter(item => !trackedIds.includes(item.id));
                setReelsData(prevReels => [...prevReels, ...newReels]);
                setTrackedIds(prevIds => [...prevIds, ...newReels.map(item => item.id)]);
            } else {
                console.error('Fetched data is not an array:', data);
            }
            setLoading(false);
            setLoadingMore(false);
        } catch (error) {
            console.error('Error fetching reels data:', error);
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchReelsData();
    }, []);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observerCallback = (entries) => {
            if (entries[0].isIntersecting) {
                fetchReelsData();
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
        if (pageRef.current) {
            observerRef.current.observe(pageRef.current);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [reelsData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div ref={pageRef} className='Reels-page'>
            {isWideScreen ? (
                reelsData.map((reel, index) => (
                    <div key={reel.id} className="reel-container">
                        <div className='left'>
                            <div className="reel-info">
                                <div className="reel-title"><h1>{reel.title_ov}</h1></div>
                                <div className="reel-synopsis" style={{ marginTop: '0.5rem' }}><h2>{reel.synopsis}</h2></div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className="reels-container">
                                <div className="reel">
                                    <div className="reel-video-container">
                                        <img src={reel.picture_url} alt={reel.title_en} className="reel-picture" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {index === reelsData.length - 1 && <div ref={pageRef} />}
                    </div>
                ))
            ) : (
                reelsData.map((reel, index) => (
                    <div key={reel.id} className="reel">
                        <div className="reel-video-container">
                            <img src={reel.picture_url} alt={reel.title_en} className="reel-picture" />
                        </div>
                        <div className="reel-info">
                            <div className="reel-title">{reel.title_en}</div>
                            <div className="reel-synopsis">{reel.synopsis}</div>
                        </div>
                        {index === reelsData.length - 1 && <div ref={pageRef} />}
                    </div>
                ))
            )}
            {loadingMore && <div className="loading-more">Loading more...</div>}
        </div>
    );
};

export default Reels;