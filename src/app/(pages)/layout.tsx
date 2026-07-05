"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Suspense, useEffect } from "react";
import Loading from "./loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthStatus, setUser } from "@/redux/slice/userSlice";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setAuthStatus(true));
        dispatch(
          setUser({
            _id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email,
          })
        );
      }
    });

    return () => unSub();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Suspense fallback={<Loading />}>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default RootLayout;
