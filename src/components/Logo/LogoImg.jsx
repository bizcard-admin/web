// material-ui
import { useTheme } from '@mui/material/styles';

const LogoImg = () => {
  const theme = useTheme();

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="55" viewBox="0 0 630 35" fill="none">

      <radialGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#ff9966', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ff5e62', stopOpacity: 1 }} />
      </radialGradient>

        <g transform="translate(0,-60) scale(0.027)" >
          <path fill="url(#grad1)" xmlns="http://www.w3.org/2000/svg" d="M712 5109 c-84 -14 -200 -56 -282 -102 -103 -57 -260 -214 -317 -317 -251 -450 -60 -1013 412 -1209 104 -44 179 -59 345 -70 162 -12 232 -27 336 -76 106 -49 181 -103 270 -198 64 -67 92 -107 133 -188 72 -145 93 -233 93 -389 0 -156 -21 -244 -93 -389 -105 -208 -309 -375 -534 -435 -33 -9 -127 -21 -208 -27 -168 -11 -263 -33 -372 -83 -457 -211 -632 -775 -375 -1207 89 -151 261 -297 420 -358 220 -85 456 -79 667 19 193 89 332 228 419 415 58 126 74 206 84 435 10 214 26 343 60 489 115 489 338 891 689 1241 347 347 748 571 1221 685 163 39 288 55 510 65 230 10 316 27 439 85 186 89 322 227 411 418 60 129 75 201 74 357 0 145 -16 226 -69 345 -55 125 -170 265 -290 351 -172 124 -426 180 -640 139 -329 -62 -593 -307 -674 -627 -11 -43 -25 -144 -30 -225 -6 -81 -18 -175 -27 -208 -60 -225 -231 -433 -437 -535 -145 -71 -233 -92 -387 -92 -96 0 -144 5 -205 21 -158 42 -294 122 -406 238 -79 81 -120 140 -164 236 -49 106 -64 175 -76 340 -11 168 -33 263 -83 372 -88 190 -245 341 -444 429 -128 56 -324 79 -470 55z"/>
          <path fill="url(#grad1)" xmlns="http://www.w3.org/2000/svg" d="M3510 2756 c-300 -54 -546 -181 -755 -391 -195 -194 -324 -433 -382 -705 -23 -107 -25 -418 -4 -525 110 -565 543 -999 1108 -1112 124 -24 396 -24 513 0 568 120 976 523 1102 1088 30 135 32 395 5 532 -110 552 -517 971 -1067 1099 -111 26 -410 34 -520 14z"/>
        </g>

        <g transform="translate(80, 0)">
          <rect width="100%" height="50%" fill="none"/>
          <text x="50%" y="50%" fontFamily="Arial" fontSize="110" fontWeight="600" fill="#000000" textAnchor="middle" alignmentBaseline="middle">
            Bizcard
          </text>
        </g>
      </svg>
    </>
  );
};

export default LogoImg;
