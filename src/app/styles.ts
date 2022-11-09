import { css } from '@linaria/core';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      --color-purple: #da68f5;
      --color-red: #EA0000;
      --color-yellow: #f4ce4a;
      --color-green: #3FD05A ;
      --color-blue: #4DA2E6 ;
      --color-dark-blue: #042548;
      --color-gray: rgba(0,0,0, 0.5);
      --color-white: white;
      --color-violet: #c061e0;
      --color-orange: #FF791F ;
      --color-corn-flower-blue: #4DA2E6
      --color-black: #000000;
      --toastify-toast-min-height: 48px;
      --toastify-toast-max-height: 800px;
      --color-currentRole: rgba(0,0,0, 0.3);
      --color-rgba-blue: rgba(77,163,230, 0.2)


      --color-popup: white;
      --color-select: #184469;

      --color-disabled: #8da1ad;
      --color-popup-mainnet: #003f6f;
      --color-popup-testnet: #342e41;
      --color-popup-masternet: #323232;
      --color-popup-dappnet: #323232;
      --color-hover-mainnet: #114b77;
      --color-hover-testnet: #711a75;
      --color-hover-masternet: rgba(255, 255, 255, 0.05);
      --color-hover-dappnet: rgba(255, 255, 255, 0.05);
      --color-select: #184469;

      --color-disabled: #8da1ad;

      --color-bg-mainnet: var(--color-dark-blue);
      --color-bg-testnet: #1e172c;
      --color-bg-masternet: #171717;
      --color-bg-dappnet: #000a16;
      --color-gradient-start-mainnet: rgba(3, 91, 143, 0);
      --color-gradient-start-testnet: #1a132d;
      --color-gradient-start-masternet: #171717;
      --color-gradient-start-dappnet: #000a16;
      --color-gradient-finish-mainnet: #035b8f;
      --color-gradient-finish-testnet: #4c3677;
      --color-gradient-finish-masternet: #393939;
      --color-gradient-finish-dappnet: #001f45;
    }
    
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-Medium.ttf');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-DemiBold.ttf');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-ExtraBold.ttf');
      font-weight: 800;
      font-style: normal;
    }
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyHeavy.otf');
      font-weight: 900;
      font-style: normal;
    }

    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-Regular.woff');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-Medium.woff');
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-SemiBold.woff');
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-Bold.woff');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-ExtraBold.woff');
      font-weight: 800;
      font-style: normal;
    }

    @font-face {
      font-family: 'PublicSans';
      src: url('/assets/fonts/PublicSans-Black.woff');
      font-weight: 900;
      font-style: normal;
    }
  
    * {
      box-sizing: border-box;
      outline: none;
    }

    html,
    body {
      margin: 0 auto;
      padding: 0;
    }

    html {
      width: 375px;
      height: 600px;
    }

    html * {
      font-family: 'PublicSans', sans-serif;
    }

    body {
      background-color: rgba(0,0,0, 0.03);
      font-size: 14px;
      color: black;
    }

    p {
      font-weight: 400;
      margin: 0;
      margin-bottom: 24px;
      font-size: 14px;
    line-height: 20px;
    }
    b {
      font-weight: 900;
      font-size: 14px;
      line-height: 20px;
    }
    span {
      font-weight: 400;
    }

    ul,
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
