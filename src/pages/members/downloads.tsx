import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Lock, ChevronRight, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Downloads() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/?login=true");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isPremium = profile?.is_premium || false;

  // All 103 eBooks with Google Drive links
  const allEbooks = [
    { id: 1, title: "3 Simple Options Strategies - Andy Crowder", category: "Trading Strategy", link: "https://drive.google.com/file/d/13ER99RSUAlNBCztIpqVyMWHV3UI4S-pQ/view?usp=drive_link" },
      { id: 2, title: "7 Strategies for Wealth & Happiness - Jim E Rohn", category: "Trading Strategy", link: "https://drive.google.com/file/d/1rcNVTQnr6qQrmpHYb3RjcaftW_tYrkkZ/view?usp=drive_link" },
      { id: 3, title: "212°: The Complete Trader - God & Rohan Mehta", category: "Technical Analysis", link: "https://drive.google.com/file/d/1NQQ80TeeCm_Dg56UMvdAbBMR8DwbBG17/view?usp=drive_link" },
      { id: 4, title: "SUPER TRADER,MAKE CONSISTENT PROFITS IN GOOD AND BAD MARKETS Van K. Tharp, Ph.D", category: "Technical Analysis", link: "https://drive.google.com/file/d/1kZS5Ew8Jn4-0GrMF9CKLv_gDFLd-k2Gi/view?usp=drive_link" },
      {
          id: 5, title: "A Complete Guide to the Futures Market, Second Edition - Jack D.Schwager and Mark Etzkorn.", category: "Risk Management", link: "https://drive.google.com/file/d/1LSVUv-YFlN2x42XOE6nwWEi1LQ6k-tGG/view?usp=drive_link" },
      { id: 6, title: " Practical Guide to Swing Trading by Larry Swing", category: "Risk Management", link: "https://drive.google.com/file/d/1rv3uGV8oeLgEAcUpZrs-hKdvQkI30Ou2/view?usp=drive_link" },
      { id: 7, title: "A Man for All Markets: From Las Vegas to Wall Street, How I Beat the Dealer and the Market - Edward O. Thorp", category: "Order Flow", link: "https://drive.google.com/file/d/1xRgaHcHm2-NRyny_NzSa0_Bs1zTtG39_/view?usp=drive_link" },
      { id: 8, title: "Advanced Stochastic Models, Risk Assessment, and Portfolio Optimization: The Ideal Risk, Uncertainty, and Performance Measures - Svetlozar T. Rachev, Stoyan V. Stoyanov, and Frank J. Fabozzi", category: "Order Flow", link: "https://drive.google.com/file/d/10Uwj6ektGUz_zVpkhdl1HNjRM-fnJKK9/view?usp=drive_link" },
      { id: 9, title: "Advanced Swing Trading Strategies to Predict, Identify, and Trade Future Market Swings - John Crane", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1HpkvnNXs73mdk4UiRFo0eJ-KPN28SCM7/view?usp=drive_link" },
      { id: 10, title: "Aerodynamic Trading - Constance M. Brown", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1oGLyZJHGk6YUnMqgidYMiIKvxOW8Bxyk/view?usp=drive_link" },
    { id: 11, title: "eBook #11", category: "Trading Strategy", link: "https://drive.google.com/file/d/1OgQqlrBmfI9BYf8qu6OUYeLbp7ZsrK2J/view?usp=drive_link" },
    { id: 12, title: "eBook #12", category: "Trading Strategy", link: "https://drive.google.com/file/d/1gtay08XPGW8dWT13jsbr2l3MoWAdKn5B/view?usp=drive_link" },
    { id: 13, title: "eBook #13", category: "Technical Analysis", link: "https://drive.google.com/file/d/1ZdTwnNF-0Fu8zKu_HeA1RePDXJswZ3UC/view?usp=drive_link" },
    { id: 14, title: "eBook #14", category: "Technical Analysis", link: "https://drive.google.com/file/d/1BFz_B5DfjixVpy8do8Mux-Ut3LU2z4iJ/view?usp=drive_link" },
    { id: 15, title: "eBook #15", category: "Psychology", link: "https://drive.google.com/file/d/1oiNGPoGIRMm1ek7M-wiToL1DqUYSI2zG/view?usp=drive_link" },
    { id: 16, title: "eBook #16", category: "Psychology", link: "https://drive.google.com/file/d/11DLg5n3CpLRWFoyrrnnxYGtXHO04lrZh/view?usp=drive_link" },
    { id: 17, title: "eBook #17", category: "Order Flow", link: "https://drive.google.com/file/d/1xa7n2XrXeTt2G9NbObNzCHfgx2DyDCFC/view?usp=drive_link" },
    { id: 18, title: "eBook #18", category: "Order Flow", link: "https://drive.google.com/file/d/1EqOoMsY88Uozq2ll6kGV_Vi7-0ifPNZL/view?usp=drive_link" },
    { id: 19, title: "eBook #19", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1haPS-KwVxFYB9C86IuJkED-zqwRqvTWZ/view?usp=drive_link" },
    { id: 20, title: "eBook #20", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1QBMG2ZU_5kwrE-inTDRoi-CPVQ6OYlcI/view?usp=drive_link" },
    { id: 21, title: "eBook #21", category: "Trading Strategy", link: "https://drive.google.com/file/d/1-OKigfeIhIrHMYiYjNzHbQU9p9nMQxBJ/view?usp=drive_link" },
    { id: 22, title: "eBook #22", category: "Trading Strategy", link: "https://drive.google.com/file/d/1OSmb-MatfojrTv5G0YZmAOv6b_f8HvPV/view?usp=drive_link" },
    { id: 23, title: "eBook #23", category: "Technical Analysis", link: "https://drive.google.com/file/d/1qsrQHEBZqopcEn29ElH-RQWUDNuXlXgY/view?usp=drive_link" },
    { id: 24, title: "eBook #24", category: "Technical Analysis", link: "https://drive.google.com/file/d/1JGNIS7BIZ15TfcbhoaSw0WOvEZ1mTkH5/view?usp=drive_link" },
    { id: 25, title: "eBook #25", category: "Risk Management", link: "https://drive.google.com/file/d/19WSHLYs9QgwlRKBiS8XubwtiU_nvYOJv/view?usp=drive_link" },
    { id: 26, title: "eBook #26", category: "Risk Management", link: "https://drive.google.com/file/d/1xInqwwITyiIYM-VOqsr020gQeiZir6wX/view?usp=drive_link" },
    { id: 27, title: "eBook #27", category: "Psychology", link: "https://drive.google.com/file/d/1_x0YKUt6Gr4QoxBLpYbHrgQ_ZMJDr6CJ/view?usp=drive_link" },
    { id: 28, title: "eBook #28", category: "Psychology", link: "https://drive.google.com/file/d/1OF9PNYG-QtGoKNiDOaDn01zITCtLtPqI/view?usp=drive_link" },
    { id: 29, title: "eBook #29", category: "Order Flow", link: "https://drive.google.com/file/d/11AhPkdU0yEoLgka5IMqf7BHw0g2pCXT7/view?usp=drive_link" },
    { id: 30, title: "eBook #30", category: "Order Flow", link: "https://drive.google.com/file/d/1R_cmiUEqe0XBRXMLhbdrba59UgPFeaIw/view?usp=drive_link" },
    { id: 31, title: "eBook #31", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1Sb4ykekyMgaDWB1MOm867YWQ-sqew4VL/view?usp=drive_link" },
    { id: 32, title: "eBook #32", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1FgcmJgBi7yu9RYXjpNoTu2FZPAInXfck/view?usp=drive_link" },
    { id: 33, title: "eBook #33", category: "Trading Strategy", link: "https://drive.google.com/file/d/188KkFiYcmzxuRmIj4A7qobdWiI4oFu8R/view?usp=drive_link" },
    { id: 34, title: "eBook #34", category: "Trading Strategy", link: "https://drive.google.com/file/d/1KLnb3RV52_DbC40witI66EctciKw9Btf/view?usp=drive_link" },
    { id: 35, title: "eBook #35", category: "Technical Analysis", link: "https://drive.google.com/file/d/1t4Cy5eeQ2oBhFsW4iqiqMWjj-R2BnvX_/view?usp=drive_link" },
    { id: 36, title: "eBook #36", category: "Technical Analysis", link: "https://drive.google.com/file/d/1NajGhWr6Lk-EdI9tU-1Sz7h7FoZnESWu/view?usp=drive_link" },
    { id: 37, title: "eBook #37", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1fnqrTW4N_aWoz3dLDCGwvTUugA0Ic7qn/view?usp=drive_link" },
    { id: 38, title: "eBook #38", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1gghJLzC22FCit79L04ydl26UVLJijHUB/view?usp=drive_link" },
    { id: 39, title: "eBook #39", category: "Risk Management", link: "https://drive.google.com/file/d/1WMti48ztlBnJravgYloKcBah28Ww9nqa/view?usp=drive_link" },
    { id: 40, title: "eBook #40", category: "Risk Management", link: "https://drive.google.com/file/d/1jX4TLTD9ol7SfNcMRIbRwqnUx40V5WfE/view?usp=drive_link" },
    { id: 41, title: "eBook #41", category: "Order Flow", link: "https://drive.google.com/file/d/1N1Kie6vzNdQY5MDEDQdKpxwyA_scbvU4/view?usp=drive_link" },
    { id: 42, title: "eBook #42", category: "Order Flow", link: "https://drive.google.com/file/d/1BAhlWxKkTuZ-czc0GWix2cAPxhapvyMn/view?usp=drive_link" },
    { id: 43, title: "eBook #43", category: "Psychology", link: "https://drive.google.com/file/d/1mRhKTfLvwxNvb2z--Wv7kvTsjijK0Ra6/view?usp=drive_link" },
    { id: 44, title: "eBook #44", category: "Psychology", link: "https://drive.google.com/file/d/10sQDJbd5B4lOoL1Ly-nyBl_gNAe_tGtL/view?usp=drive_link" },
    { id: 45, title: "eBook #45", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1qwSj_mxNb90Y3_jTE4eXLHIXHUfBSt64/view?usp=drive_link" },
    { id: 46, title: "eBook #46", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1GIKCf1u7Kd0cLXx7uJtCjs3sRa2wEMWu/view?usp=drive_link" },
    { id: 47, title: "eBook #47", category: "Trading Strategy", link: "https://drive.google.com/file/d/1_GkCdJLYNxXcm3KylyttSU1Ed8GG9P73/view?usp=drive_link" },
    { id: 48, title: "eBook #48", category: "Trading Strategy", link: "https://drive.google.com/file/d/1WBbV5gQIheQUv-1k9AoUCJJc1gX_-tgs/view?usp=drive_link" },
    { id: 49, title: "eBook #49", category: "Technical Analysis", link: "https://drive.google.com/file/d/1np3xBFIoA_IRhj3Lz9c-RhD0yXnAjKyj/view?usp=drive_link" },
    { id: 50, title: "eBook #50", category: "Technical Analysis", link: "https://drive.google.com/file/d/1yS_nlbMOEUt2w_hUcJiWPAmrd2rJ3hWA/view?usp=drive_link" },
    { id: 51, title: "eBook #51", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1u1bfVNowdzf98CX08ttZcXbRzG24ocoJ/view?usp=drive_link" },
    { id: 52, title: "eBook #52", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1GG7zAOiy0WLSOHXJPmsQ7xEJhZsdRBK6/view?usp=drive_link" },
    { id: 53, title: "eBook #53", category: "Risk Management", link: "https://drive.google.com/file/d/15WdJfRQHNE8JXiPPDWOOh7xBgaxN6JlM/view?usp=drive_link" },
    { id: 54, title: "eBook #54", category: "Risk Management", link: "https://drive.google.com/file/d/1n4Y_Mh1tP0aRYrQa3RPjSpKdXdaP16dK/view?usp=drive_link" },
    { id: 55, title: "eBook #55", category: "Order Flow", link: "https://drive.google.com/file/d/1xVJppQe1YDFgjYDwiC29DqRxgeU5brtY/view?usp=drive_link" },
    { id: 56, title: "eBook #56", category: "Order Flow", link: "https://drive.google.com/file/d/1dk2Q4nH8UDjRgREITo8j0INDgO1EG4ot/view?usp=drive_link" },
    { id: 57, title: "eBook #57", category: "Psychology", link: "https://drive.google.com/file/d/1PK-W4PnEP_bue21Xg6npA4SuByRmad3K/view?usp=drive_link" },
    { id: 58, title: "eBook #58", category: "Psychology", link: "https://drive.google.com/file/d/1AI9tR_X-IU_zyQ372dS0DdIft61BAfh6/view?usp=drive_link" },
    { id: 59, title: "eBook #59", category: "FCPO & Commodities", link: "https://docs.google.com/document/d/1dw1KahOz0uJ-IgX1tO4ZlTzJW0OWAYgVZJck5HSk-3I/edit?usp=drive_link" },
    { id: 60, title: "eBook #60", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1fOrl4-RKMH7XwQO18Xb8ynDuiCBAXVEW/view?usp=drive_link" },
    { id: 61, title: "eBook #61", category: "Trading Strategy", link: "https://drive.google.com/file/d/1cT9vsG9HmBZM2lITwL63l35NLV_H5seK/view?usp=drive_link" },
    { id: 62, title: "eBook #62", category: "Trading Strategy", link: "https://drive.google.com/file/d/1TURtcuNgVo9D5d95J0YHc7jzlSve2ejA/view?usp=drive_link" },
    { id: 63, title: "eBook #63", category: "Technical Analysis", link: "https://drive.google.com/file/d/1f91wACtce5poZYEutdSnny_i2HC3sjOP/view?usp=drive_link" },
    { id: 64, title: "eBook #64", category: "Technical Analysis", link: "https://drive.google.com/file/d/1KzxO4rVN9yk63n_r4yHZXm8np07vcAG7/view?usp=drive_link" },
    { id: 65, title: "eBook #65", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1an0dRLVjQ0ebHCewZl4PriL1-QyzvgW3/view?usp=drive_link" },
    { id: 66, title: "eBook #66", category: "Advanced Concepts", link: "https://drive.google.com/file/d/11C2LtLjPHAFgYsWpimT5usVR7T3BVq6B/view?usp=drive_link" },
    { id: 67, title: "eBook #67", category: "Risk Management", link: "https://drive.google.com/file/d/1s9RFvIA1UYp4VkG3klg5uoohYI64Lx1P/view?usp=drive_link" },
    { id: 68, title: "eBook #68", category: "Risk Management", link: "https://drive.google.com/file/d/1nQk7VCxFaXH4-LBOMcrx5fBxuy3EINP8/view?usp=drive_link" },
    { id: 69, title: "eBook #69", category: "Order Flow", link: "https://drive.google.com/file/d/10jNUy7ZC73682tSRTj8Kxyx0c22fI195/view?usp=drive_link" },
    { id: 70, title: "eBook #70", category: "Order Flow", link: "https://drive.google.com/file/d/1EjQZTxKBQ9u9XCY1pAO-fxxUz9Gk9hVk/view?usp=drive_link" },
    { id: 71, title: "eBook #71", category: "Psychology", link: "https://drive.google.com/file/d/1YL8wDqYWzmi-XkiarVn4HxG-l5u3JUOc/view?usp=drive_link" },
    { id: 72, title: "eBook #72", category: "Psychology", link: "https://drive.google.com/file/d/10Zq79LpCMwUQyb1Rsvpmidw_g_wmaWKH/view?usp=drive_link" },
    { id: 73, title: "eBook #73", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/15242kGhRSs3KNixUPwHk3ioj86ORsfF1/view?usp=drive_link" },
    { id: 74, title: "eBook #74", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1g9kXaldVqm5z2W-29pKCNmMvkfVjior7/view?usp=drive_link" },
    { id: 75, title: "eBook #75", category: "Trading Strategy", link: "https://drive.google.com/file/d/1DUrW7OmxmCYhhJ1NQQr5SasZq-0jgbSQ/view?usp=drive_link" },
    { id: 76, title: "eBook #76", category: "Trading Strategy", link: "https://drive.google.com/file/d/1wlBdmEuUhkQEvQkz-KA_prnwaSUs50Gz/view?usp=drive_link" },
    { id: 77, title: "eBook #77", category: "Technical Analysis", link: "https://drive.google.com/file/d/1mU18kiJHwri93PLSWoFPURtI0HKXJv_P/view?usp=drive_link" },
    { id: 78, title: "eBook #78", category: "Technical Analysis", link: "https://drive.google.com/file/d/1P63zLvVpKALyYyvWsee-nF9wX21bT74x/view?usp=drive_link" },
    { id: 79, title: "eBook #79", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1kN3MdS4w-r02OkWYM_vA0R1sqvZcLkYI/view?usp=drive_link" },
    { id: 80, title: "eBook #80", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1jk3a4HVM4f3Ho6aimZji_xd85Q1uVl59/view?usp=drive_link" },
    { id: 81, title: "eBook #81", category: "Risk Management", link: "https://drive.google.com/file/d/1B3lz_YEZnGc4ANgH0XnatjCTJDgZDl0z/view?usp=drive_link" },
    { id: 82, title: "eBook #82", category: "Risk Management", link: "https://drive.google.com/file/d/1l_0Bws0fJF7b0pVaFjXnGZWnVtopWrSK/view?usp=drive_link" },
    { id: 83, title: "eBook #83", category: "Order Flow", link: "https://drive.google.com/file/d/1IdGGdm0Ea5R0Dw-hLr_X5vgZc9IjYA2E/view?usp=drive_link" },
    { id: 84, title: "eBook #84", category: "Order Flow", link: "https://drive.google.com/file/d/1RJ71HdazuMBG5gGXdu1WutX1Nvnuhbqp/view?usp=drive_link" },
    { id: 85, title: "eBook #85", category: "Psychology", link: "https://drive.google.com/file/d/1HmVN4IRJxV3p-Wii-sbGOAJG5Z5vJPjk/view?usp=drive_link" },
    { id: 86, title: "eBook #86", category: "Psychology", link: "https://drive.google.com/file/d/1K1BeO5IMQWFVZx0TKMo78nVO8l625sbI/view?usp=drive_link" },
    { id: 87, title: "eBook #87", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1_6KusfWjBqcSqFczLVrubYWB7DX0DVoh/view?usp=drive_link" },
    { id: 88, title: "eBook #88", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/185SYUXFBhZ7qoWIQZGLSAU8iqH4l0Lbl/view?usp=drive_link" },
    { id: 89, title: "eBook #89", category: "Trading Strategy", link: "https://drive.google.com/file/d/1lN42aI69SZNGkezch4-dekATddY7vt7-/view?usp=drive_link" },
    { id: 90, title: "eBook #90", category: "Trading Strategy", link: "https://drive.google.com/file/d/1gmW1rpAZwm3gwx_EpJBymCVnhSFDEOWv/view?usp=drive_link" },
    { id: 91, title: "eBook #91", category: "Technical Analysis", link: "https://drive.google.com/file/d/1UB-vsRxGyspICOc6d5Go9deePKW6QiG9/view?usp=drive_link" },
    { id: 92, title: "eBook #92", category: "Technical Analysis", link: "https://drive.google.com/file/d/1yafZbLKhJ0zpSqats4DDT16XeRPFbYH7/view?usp=drive_link" },
    { id: 93, title: "eBook #93", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1owY6p1nwkPGmuotHfdayJWgsz93Uznnj/view?usp=drive_link" },
    { id: 94, title: "eBook #94", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1vHcZUGHT2GuGYjLTLCDidr2gH67Xr_5F/view?usp=drive_link" },
    { id: 95, title: "eBook #95", category: "Risk Management", link: "https://drive.google.com/file/d/1wNqGyyFjs-w96rnGgHiNZm2VDK6K-Hz3/view?usp=drive_link" },
    { id: 96, title: "eBook #96", category: "Risk Management", link: "https://drive.google.com/file/d/1U_0Jp44uvJqpyYtvOt1Qo5vcQzXsMFuF/view?usp=drive_link" },
    { id: 97, title: "eBook #97", category: "Order Flow", link: "https://drive.google.com/file/d/1unAsz_xJzuiDXuDb5h6ld974zROm7p4D/view?usp=drive_link" },
    { id: 98, title: "eBook #98", category: "Order Flow", link: "https://drive.google.com/file/d/1lkuW8vbVruM_Q_XRawAMxR8_iNpkXmyK/view?usp=drive_link" },
    { id: 99, title: "eBook #99", category: "Psychology", link: "https://drive.google.com/file/d/16khccosY9AjUk5_aA52rhB8KFdEb-0eB/view?usp=drive_link" },
    { id: 100, title: "eBook #100", category: "FCPO & Commodities", link: "https://drive.google.com/file/d/1UDFsr_sbYWQ-mXmmLNJLCdLkiExbaJRe/view?usp=drive_link" },
    { id: 101, title: "eBook #101", category: "Trading Strategy", link: "https://drive.google.com/file/d/1UDFsr_sbYWQ-mXmmLNJLCdLkiExbaJRe/view?usp=drive_link" },
    { id: 102, title: "eBook #102", category: "Technical Analysis", link: "https://drive.google.com/file/d/1UDFsr_sbYWQ-mXmmLNJLCdLkiExbaJRe/view?usp=drive_link" },
    { id: 103, title: "eBook #103", category: "Advanced Concepts", link: "https://drive.google.com/file/d/1UDFsr_sbYWQ-mXmmLNJLCdLkiExbaJRe/view?usp=drive_link" }
  ];

  const categories = ["All", "Trading Strategy", "Technical Analysis", "Risk Management", "Order Flow", "FCPO & Commodities", "Psychology", "Advanced Concepts"];

  // Filter eBooks
  const filteredEbooks = allEbooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ebook.id.toString().includes(searchQuery);
    const matchesCategory = selectedCategory === "All" || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Generate gradient colors for book covers
  const getBookCoverColor = (id: number) => {
    const colors = [
      "from-blue-500 to-blue-700",
      "from-purple-500 to-purple-700",
      "from-pink-500 to-pink-700",
      "from-red-500 to-red-700",
      "from-orange-500 to-orange-700",
      "from-yellow-500 to-yellow-700",
      "from-green-500 to-green-700",
      "from-teal-500 to-teal-700",
      "from-cyan-500 to-cyan-700",
      "from-indigo-500 to-indigo-700"
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/members" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold">Premium eBook Library</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              103 comprehensive trading eBooks for FCPO mastery
            </p>
          </div>

          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Premium Content Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to premium membership to download all 103 eBooks
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                  <Link href="/#membership">Upgrade to Premium</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {isPremium && (
            <>
              {/* Search and Filter */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search eBooks by number or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? "bg-gold text-black"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground">
                  Showing {filteredEbooks.length} of {allEbooks.length} eBooks
                </p>
              </div>

              {/* eBooks Grid */}
              <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredEbooks.map((ebook) => (
                  <Card 
                    key={ebook.id} 
                    className="border-border/50 hover:border-gold/50 transition-all group"
                  >
                    <CardContent className="p-4">
                      {/* Book Cover */}
                      {ebook.id === 1 || (ebook.id >= 2 && ebook.id <= 10) ? (
                        <div className="w-full aspect-[3/4] rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform shadow-lg">
                          <img 
                            src={ebook.id === 1 ? "/3-simple-options-strategies.PNG" : `/${ebook.id}.PNG`}
                            alt={ebook.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-full aspect-[3/4] bg-gradient-to-br ${getBookCoverColor(ebook.id)} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg`}>
                          <BookOpen className="w-16 h-16 text-white/90" />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-bold text-lg mb-1">{ebook.title}</h3>
                      
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="text-xs bg-muted/50 rounded-full px-2 py-1">
                          {ebook.category}
                        </span>
                      </div>

                      {/* Download Button */}
                      <Button 
                        className="w-full bg-gold hover:bg-gold/90 text-black font-semibold"
                        asChild
                      >
                        <a href={ebook.link} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEbooks.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No eBooks found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter</p>
                </div>
              )}

              {/* Info Card */}
              <Card className="mt-12 border-border/50 bg-muted/30">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Complete Trading Library</h3>
                  <p className="text-muted-foreground mb-4">
                    Download and keep all 103 eBooks permanently. New resources added monthly for premium members.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last updated: December 2025
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}