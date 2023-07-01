import { useState } from "react";

function useToggle() {
    const [element , setElement] = useState(false);
    function Toggle() {
        setElement(!element);
    }
    return [element, Toggle];
}

export default useToggle;