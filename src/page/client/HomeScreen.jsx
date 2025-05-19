import React, { useEffect, useState } from "react";

import { USER_LOGIN } from "../../Utils/Setting/Config";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FeaturedCategories from "./FeaturedCategories";
import ProductSections from "./ProductSections";
import Features from "./Features";
import HeroSection from "./HeroSection";
import TestimonialsNewsletter from "./TestimonialsNewsletter";
import NavigationHeader from "./Navigation";

const HomeScreen = () => {
    const { isAuthenticated } = useSelector((state) => state.UserReducer);
    const [userRole, setUserRole] = useState("");
    const [showChatBox, setShowChatBox] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            if (userDetails && userDetails.role) {
                setUserRole(userDetails.role.name);
            }
        }
    }, [isAuthenticated]);

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="home-screen-container">
            <HeroSection></HeroSection>
            <FeaturedCategories></FeaturedCategories>
            <ProductSections></ProductSections>
            <TestimonialsNewsletter></TestimonialsNewsletter>
            <Features></Features>

        </div>
    );
};

export default HomeScreen;
