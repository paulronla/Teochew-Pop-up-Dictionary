import { PromiseCntContext } from "./contexts.js";

export default function CountPendingPromise() {
    const promiseCnt = React.useContext(PromiseCntContext);

    React.useEffect(() => {
        let ignore = false;
        if (!ignore) {
            promiseCnt.current++;
        }
        
        return () => {ignore = true;};

    }, [promiseCnt]);

    return null;
}