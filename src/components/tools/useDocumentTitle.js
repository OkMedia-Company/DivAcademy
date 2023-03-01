import { useEffect } from "react";

function useDocumentTitle(title, prevailOnUnmount = false) {
  // const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = "Div Academy";
    }
  }, [prevailOnUnmount]);
}

export default useDocumentTitle;