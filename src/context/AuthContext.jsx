"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: "Sardor Alimov",
  firstName: "Sardor",
  lastName: "Alimov",
  phone: "+998 90 123 45 67",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  avatarInitials: "SA",
  walletBalance: 350000,
  isVerified: true,
  rating: 4.9,
  reviewsCount: 38,
  joinedDate: "Oktyabr 2024",
  adsCount: 4,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SMS Notification State for floating top push banner
  const [smsBanner, setSmsBanner] = useState({
    isOpen: false,
    code: "",
    phone: "",
    timestamp: "",
  });

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedLoggedIn = localStorage.getItem("olx_neo_logged_in") === "true";
      const storedUser = localStorage.getItem("olx_neo_user");

      if (storedLoggedIn && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else if (storedLoggedIn) {
        setUser(DEFAULT_USER);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Failed to load user from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Send realistic SMS with random 4-digit code
  const sendSmsCode = (phone) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setSmsBanner({
      isOpen: true,
      code: randomCode,
      phone: phone || "+998 90 123 45 67",
      timestamp: timeStr,
    });

    return randomCode;
  };

  const closeSmsBanner = () => {
    setSmsBanner((prev) => ({ ...prev, isOpen: false }));
  };

  // Complete login
  const completeLogin = (phone, customData = {}) => {
    const existing = user || DEFAULT_USER;
    const initials = (customData.name || existing.name || "Foydalanuvchi")
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const updatedUser = {
      ...existing,
      ...customData,
      phone: phone || existing.phone,
      avatarInitials: initials || "OL",
    };

    try {
      localStorage.setItem("olx_neo_logged_in", "true");
      localStorage.setItem("olx_neo_user", JSON.stringify(updatedUser));
      // Dispatch custom event so all open tabs/components sync
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setUser(updatedUser);
    setIsLoggedIn(true);
    closeSmsBanner();
    return updatedUser;
  };

  // Complete registration (with photo avatar and name/surname)
  const completeSignup = ({ firstName, lastName, phone, avatar }) => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "Foydalanuvchi";
    const initials = (
      (firstName[0] || "") + (lastName[0] || firstName[1] || "U")
    ).toUpperCase();

    const newUser = {
      name: fullName,
      firstName: firstName.trim() || "Foydalanuvchi",
      lastName: lastName.trim() || "",
      phone: phone || "+998 90 123 45 67",
      avatar:
        avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      avatarInitials: initials,
      walletBalance: 100000, // Welcome gift bonus 100 000 so'm!
      isVerified: true,
      rating: 5.0,
      reviewsCount: 1,
      joinedDate: "Hozirgina",
      adsCount: 0,
    };

    try {
      localStorage.setItem("olx_neo_logged_in", "true");
      localStorage.setItem("olx_neo_user", JSON.stringify(newUser));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setUser(newUser);
    setIsLoggedIn(true);
    closeSmsBanner();
    return newUser;
  };

  // Update profile data (e.g. avatar, name, balance)
  const updateProfile = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("olx_neo_user", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Logout
  const logout = () => {
    try {
      localStorage.removeItem("olx_neo_logged_in");
      localStorage.removeItem("olx_neo_user");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoaded,
        smsBanner,
        sendSmsCode,
        closeSmsBanner,
        completeLogin,
        completeSignup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
