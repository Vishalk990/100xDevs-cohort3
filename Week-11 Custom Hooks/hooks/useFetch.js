import { useEffect, useRef, useState } from "react";

export function usePostTitle() {
    const [post, setPost] = useState({});

    async function getPosts() {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );
        const data = await response.json();
        setPost(data);
    }
    useEffect(() => {
        getPosts();
    }, []);

    return { title: post.title };
}

export function useFetch(url) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    async function getDetails() {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
    }, [url]);

    // useEffect(() => {
    //     const id = setInterval(() => getDetails(), 5000);

    //     return () => clearInterval(id);
    // }, [url])

    return { data, loading };
}

export function usePrev(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value])

    return ref.current;
}