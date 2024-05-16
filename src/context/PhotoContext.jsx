import { createContext, useContext } from "react";

export const PhotoContext = createContext({
    pClicked: false,
    setpClicked: () => {}
})

// export const usePClickedContext = () => {
//     const pClicked = useContext(PhotoContext)

//     return pClicked
// }
