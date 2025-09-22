import React from 'react';

const ReelLogo = () => (
    <>
        <style>
            {`
            .reel-logo-font {
                text-transform: uppercase;
            }
            .reel-logo h1 {
                font-size: 84px;
                line-height: 86px;
                letter-spacing: 4px;
                font-weight: normal;
            }
            .reel-logo p {
                margin-right: -8px;
                font-size: 32px;
                line-height: 32px;
                font-weight: lighter;
                letter-spacing: 14px;
            }
            .main-reel {
                height: 200px;
                width: 200px;
                display: flex;
                border-radius: 50%;
                background: #fff;
                position: relative;
            }
            .main-reel::after {
                content: "";
                position: absolute;
                background: #0f172a;
                width: 6px;
                height: 50%;
                bottom: 0;
                left: 77px;
                z-index: 3;
            }
            .main-reel::before {
                content: "";
                position: absolute;
                background: #0f172a;
                width: 116px;
                height: 116px;
                top: 50%;
                right: -20%;
                transform: rotate(45deg) translateY(-50%);
                transform-origin: top center;
                z-index: 1;
            }
            .inner-reel {
                height: 100px;
                width: 100px;
                margin: auto;
                border-radius: 50%;
                background: #fff;
                border: 6px solid #0f172a;
                position: relative;
                z-index: 2;
            }
            .inner-reel::after {
                content: "";
                position: absolute;
                background: #0f172a;
                width: 47px;
                height: 47px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
            }
            .reel-dots {
                position: absolute;
                height: 100%;
                width: 100%;
                left: 0;
                right: 0;
                animation: dots-rotate 4s linear infinite;
            }
            .reel-dots .dot {
                height: 26px;
                width: 26px;
                background: #0f172a;
                border-radius: 50%;
                position: absolute;
            }
            .reel-dots .dot:nth-child(1) { top: 12px; left: 50%; transform: translateX(-50%); }
            .reel-dots .dot:nth-child(2) { top: 24%; right: 24%; transform: translate(50%, -50%); }
            .reel-dots .dot:nth-child(3) { top: 50%; right: 12px; transform: translateY(-50%); }
            .reel-dots .dot:nth-child(4) { bottom: 24%; right: 24%; transform: translate(50%, 50%); }
            .reel-dots .dot:nth-child(5) { bottom: 13px; right: 50%; transform: translateX(50%); }
            .reel-dots .dot:nth-child(6) { bottom: 24%; left: 24%; transform: translate(-50%, 50%); }
            .reel-dots .dot:nth-child(7) { top: 50%; left: 12px; transform: translateY(-50%); }
            .reel-dots .dot:nth-child(8) { top: 24%; left: 24px; transform: translate(50%, -50%); }

            @keyframes dots-rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @media (max-width: 480px) {
                .reel-logo h1 { font-size: 60px; line-height: 70px; letter-spacing: 2px; }
                .reel-logo p { margin-right: -8px; font-size: 28px; line-height: 30px; letter-spacing: 8px; }
                .logo-block { margin-left: -22px; transform: scale(0.75); }
                .logo-outer .logo-text { margin: 22px 0 0 -44px; }
            }
            `}
        </style>
        <div className="flex justify-center items-center reel-logo-font my-8">
            <div className="logo-outer flex justify-center items-center">
                <div className="logo-block">
                    <div className="main-reel">
                        <div className="inner-reel"></div>
                        <div className="reel-dots">
                            {[...Array(8)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                    </div>
                </div>
                <div className="logo-text relative z-10 text-right ml-[-30px] mt-[22px]">
                    <h1 className="text-white">Prime</h1>
                    <p className="text-white">Movies</p>
                </div>
            </div>
        </div>
    </>
);

export default ReelLogo;