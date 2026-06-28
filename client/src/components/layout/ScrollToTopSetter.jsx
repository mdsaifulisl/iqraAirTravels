import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopSetter = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // প্রতিবার URL বা pathname পরিবর্তন হলে স্ক্রল উপরে চলে যাবে
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "smooth" দিতে পারেন, তবে নতুন পেজের জন্য "instant" বেশি ভালো দেখায়
    });
  }, [pathname]);

  return null;
};

export default ScrollToTopSetter;