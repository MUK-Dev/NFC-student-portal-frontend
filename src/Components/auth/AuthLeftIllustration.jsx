import { Box } from '@mui/material'
import { motion } from 'framer-motion'

import Illustration from '../../Assets/Images/NFC Illustration.png'

const AuthLeftIllustration = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url('${Illustration}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative',
      }}
    >
      <svg
        id='Layer_1'
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1920 1080'
        style={{
          position: 'absolute',
          top: 0,
          left: '-18vw',
          minHeight: '100vh',
        }}
      >
        <defs>
          <style>
            {`#Metro_1 {
            animation: metro1Drive 15s linear infinite;
          }
          #Metro_2 {
            animation: metro2Drive 15s linear infinite;
          }
          @keyframes metro1Drive {
            0% {
              transform: translate(100vw, -90vh);
            }
            50% {
              transform: translate(-100vw, 85vh);
            }
            100% {
              transform: translate(-100vw, 85vh);
            }
          }
          @keyframes metro2Drive {
            0% {
              transform: translate(-100vw, 85vh);
            }
            50% {
              transform: translate(-100vw, 85vh);
            }
            100% {
              transform: translate(100vw, -80vh);
            }
          }
          .cls-1{fill:#cecece;}
          .cls-2{fill:#fff;}
          .cls-3{fill:#c4c4c4;}
          .cls-4{fill:#777;stroke:#000;stroke-miterlimit:10;stroke-width:5px;animation: wheelMetro1 0.5s infinite;transform-box: fill-box;transform-origin: center;}
          .cls-5{fill:#ccc;}
          .cls-6{fill:#79acb7;}
          @keyframes wheelMetro1 {
            from {
              transform: rotateZ(0deg);
            }
            to {
              transform: rotateZ(360deg);
            }
          }
          `}
          </style>
        </defs>
        <title>NFC Illustration</title>
        <g id='Metro_2'>
          <path
            className='cls-1'
            d='M1042.28,931.35,1022.37,885s-8.17-27.05-37.81-16.54L846.12,928.15s-4.2,7.16,2.16,6.32l137.78-60.86s17.47-9.44,32.39,13.84l19.76,44.06-24.84,10.92-5,3.58c-2.38.53-4.11,4.49-5.53,5.18-3.56,1.73-6.71-1-8.49,2.51h0l-80,32.29-10.64.11c-5.9.06-6.33,8.9-11.91,10.66l-1.71.65c-2,.09-4.2,2-5.62,3.37l-22.58,8.28s-5.5-3.86-6.2-5.58l-1.7.65,4.78,10.88,15.91-6.46s.58.25,10.65-5.11a74.89,74.89,0,0,1,19.47-7.17l83.29-37.7,7.37-3.21s-1.09,2.71,6.75-2.26,10.8-6,10.8-6l30-13.43Z'
          />
          <polygon
            className='cls-2'
            points='827.26 963.29 845.95 934.3 990.84 872.08 970.74 901.83 827.26 963.29'
          />
          <path
            className='cls-1'
            d='M839.33,1050l15.91-6.46s.17-6.41,8.41-14.31,21.71,2,21.71,2l83.29-37.71,7.37-3.21s-1.54-5.76,6.31-10.73,11.24,2.46,11.24,2.46l30-13.44-.73-2.3L1003,920s-8.16-27.05-37.81-16.54L826.71,963.15s-4.2,7.16,2.16,6.32L843.64,963l-.43.19,22.45,60h0a16,16,0,0,0-4,2.94l-19.23,18s-5.5-3.85-6.2-5.57l-1.7.65Zm26.8-27.07,3.19-.25-23-60.92,120.34-53.16s17.47-9.43,32.69,19.5l19.76,44L994,977.44l-5.63-1.53a9.44,9.44,0,0,0-11,4.81l-2.6,5.16L894.91,1021l-10.64.11c-5.9.06-9.67-.83-15.25.93l-1.71.65A4.25,4.25,0,0,0,866.13,1022.94Z'
          />
          <polygon
            className='cls-3'
            points='1042.38 933.61 1022.97 968.61 841.96 1048.95 860.63 1014.24 1042.38 933.61'
          />
          <path
            className='cls-4'
            d='M976.4,998.67c4.1,4.47,8.1,5,12.78.74s6.19-10.39,2.08-14.87a11.26,11.26,0,0,0-15.91-.33C970.67,988.5,972.29,994.19,976.4,998.67Z'
          />
          <path
            className='cls-4'
            d='M869.05,1044.65c4.11,4.48,8.11,5,12.79.75s6.19-10.4,2.08-14.87a11.25,11.25,0,0,0-15.91-.33C863.33,1034.49,865,1040.18,869.05,1044.65Z'
          />
          <path
            className='cls-5'
            d='M970.74,901.83s20.19-4.86,30.75,14.61L1023,968.61l20.15-34.33-20.28-49.21s-12-27-31.81-12.5Z'
          />
          <polygon
            className='cls-6'
            points='1021.01 881.67 1000.71 915.08 1011.92 941.77 1032.31 908.04 1021.01 881.67'
          />
        </g>
        <g id='Metro_1'>
          <path
            className='cls-1'
            d='M1696.38,845.92l-21.14-45.84s-14.64-24.16,13-39.16l137-62.92s8.13,1.67,3.26,5.83L1691.1,765.5s-18.71,6.67-11.39,33.33L1699.23,843,1724,831.85l6-1.35c2-1.42,6.08-.06,7.54-.65,3.67-1.48,3.74-5.67,7.56-4.62h0l77.51-37.84,7.21-7.84c4-4.34,10.85,1.26,15.89-1.72l1.63-.83c1.39-1.41,4.32-1.76,6.27-1.92l21.25-11.25s.82-6.66,0-8.33l1.63-.83,4.88,10.83-15.45,7.5s-.19.6-10.92,4.5a74.78,74.78,0,0,0-18.35,9.67l-83.76,36.66-7.31,3.34s2.74,1-6.2,3.5-11.69,4-11.69,4L1697.6,848Z'
          />
          <polygon
            className='cls-2'
            points='1864 707.5 1829.95 702 1686.76 768.03 1722.32 773 1864 707.5'
          />
          <path
            className='cls-1'
            d='M1915.49,763.67l-1.63.83c.82,1.67,0,8.33,0,8.33l-26.25,2.25a15.81,15.81,0,0,0-4.88,1l0,0-29.55-56.82-.43.19,14.73-6.61c4.87-4.16-3.26-5.83-3.26-5.83l-137,62.92c-27.65,15-13,39.16-13,39.16l21.14,45.84,1.22,2.08,30.09-13.33s-3.25-7.5,5.69-10,12.2,2.5,12.2,2.5l7.31-3.34,83.76-36.66s1.62-16.67,13-17.5,16.26,3.33,16.26,3.33l15.45-7.5ZM1881.34,777l-1.63.83c-5,3-6.9,6.38-10.89,10.72l-7.21,7.84-79.51,35.84-5.57-1.53a9.45,9.45,0,0,0-10.93,4.94l-2.63,5.21L1742.23,856l-19.52-44.17c-11.32-30.66,7.39-37.33,7.39-37.33l120-53.86L1880,778.5l2.32-2.2A4.22,4.22,0,0,0,1881.34,777Z'
          />
          <polygon
            className='cls-3'
            points='1698 847.5 1737 856.5 1917.82 775.74 1879.54 766.39 1698 847.5'
          />
          <path
            className='cls-4'
            d='M1790.5,842c.58,6-1.68,9.4-8,10s-11.87-2.36-12.45-8.41a11.26,11.26,0,0,1,10.4-12C1786.78,831,1789.92,836,1790.5,842Z'
          />
          <path
            className='cls-4'
            d='M1896.5,793c.58,6-1.68,9.4-8,10s-11.87-2.36-12.45-8.41a11.26,11.26,0,0,1,10.4-12C1892.78,782,1895.92,787,1896.5,793Z'
          />
          <path
            className='cls-5'
            d='M1722.31,773s-17.11,11.75-9.71,32.62L1737,856.5l-39-8-23-48s-12-27,12-32Z'
          />
          <polygon
            className='cls-6'
            points='1673.7 796.87 1712.11 804.14 1724.45 830.33 1685.74 822.91 1673.7 796.87'
          />
        </g>
      </svg>
    </Box>
  )
}

export default AuthLeftIllustration
