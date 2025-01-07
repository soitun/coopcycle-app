/* https://react-svgr.com/playground/?native=true */

import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" {...props}>
    <G clipPath="url(#a)" transform="matrix(.8452 0 0 .8452 -108.611 5.39)">
      <G>
        <Path
          d="M200.351 99.656c3.649-.577 5.304-4.888 2.98-7.759a4.798 4.798 0 0 0-4.517-1.715c-3.644.605-5.266 4.93-2.919 7.783a4.798 4.798 0 0 0 4.456 1.691Zm121.555 2.86a4.8 4.8 0 0 0 3.97-5.506c-.593-3.647-4.912-5.285-7.775-2.948a4.799 4.799 0 0 0 3.805 8.454Zm-132.9 10.025c-.546-.972-1.397-1.762-2.186-2.491-.972-.85-2.066-1.397-3.281-1.64h-.121v-.486l.121-.121c1.64-.972 3.038-2.309 3.949-4.131.85-1.762 1.397-3.584 1.397-5.468 0-1.761-.425-3.584-1.093-5.042-.851-1.519-1.762-2.734-3.159-3.706-1.519-1.093-3.159-1.761-4.921-2.187-2.066-.546-4.253-.85-6.318-.85h-15.855v45.744h15.613c2.187 0 4.374-.304 6.56-.668 2.066-.425 3.828-1.215 5.589-2.309 1.641-1.093 2.856-2.49 3.828-4.131 1.397-2.855 1.761-6.317 1.093-9.476a8.612 8.612 0 0 0-1.215-3.038h-.001Zm-21.929-17.253h6.014c1.397-.121 2.612.426 3.584 1.215.668.851 1.094 1.944 1.094 3.038 0 1.093-.426 2.187-1.094 3.159-.85.972-2.065 1.518-3.402 1.397h-6.196v-8.809Zm11.117 26.062c-.972 1.093-2.491 1.64-3.949 1.518h-7.168v-10.327h7.229c1.519-.121 2.855.425 3.827 1.519.85.972 1.215 2.187 1.215 3.584.243 1.337-.304 2.734-1.154 3.706Zm27.094 2.308a1.088 1.088 0 0 1-1.094-1.093v-19.744h-9.598v18.772c-.121 1.944.304 3.827.972 5.589.547 1.215 1.397 2.308 2.308 3.28.972.668 2.066 1.215 3.281 1.519 2.065.121 4.131.121 6.136.121v-8.505h-2.005v.061Zm86.021-11.238a15.967 15.967 0 0 0-2.855-4.8c-1.215-1.397-2.613-2.308-4.253-3.037a12.788 12.788 0 0 0-5.224-1.094c-1.398 0-2.613.122-3.949.547-.972.304-1.762.851-2.491 1.397-.668.547-1.397 1.215-1.944 2.066h-.668c-.547-1.397-1.397-2.612-2.491-3.402-.972-.851-2.187-1.215-3.402-1.519l-4.495-.304v8.748c.668 0 1.397 0 2.065.304v33.108h9.72v-14.215c.547.668 1.215 1.397 1.944 1.762.851.547 1.64.972 2.491 1.215 1.093.425 2.308.547 3.584.547 1.762 0 3.584-.426 5.225-1.094 1.518-.668 3.037-1.762 4.131-3.159 1.215-1.397 2.065-3.037 2.612-4.799 1.458-3.888 1.458-8.14 0-12.271Zm-10.267 11.238c-.972 1.215-2.491 2.066-4.131 1.944-.668 0-1.519-.121-2.187-.425-.668-.304-1.397-.668-1.761-1.215-.547-.668-.972-1.397-1.215-2.187-.304-.972-.547-2.066-.547-3.037 0-.972.121-1.944.425-2.734.304-.851.547-1.64 1.094-2.309.425-.668 1.093-1.215 1.761-1.64.668-.425 1.519-.547 2.491-.547 1.519 0 3.037.669 4.131 1.762 1.215 1.519 1.762 3.281 1.64 5.225-.061 1.883-.607 3.644-1.701 5.163Zm-24.968-15.309c-.425-1.215-1.093-2.49-2.065-3.402-.851-.85-1.944-1.518-3.038-1.944-1.215-.425-2.49-.546-3.705-.546a11.315 11.315 0 0 0-3.159.425c-.972.304-1.762.668-2.613 1.093a6.19 6.19 0 0 0-2.065 1.641c-.547.425-.972.972-1.397 1.518h-.426a7.76 7.76 0 0 0-3.158-3.402c-1.519-.85-3.159-1.215-4.921-1.215-1.094 0-2.066.122-3.038.547-.85.304-1.64.668-2.49 1.215-.669.425-1.215.972-1.762 1.64-.425.426-.668.851-1.094 1.215h-.303v-4.374h-9.113v29.282h9.72v-12.211c0-.972.122-2.065.304-3.037a7.996 7.996 0 0 1 .85-2.734 6.184 6.184 0 0 1 1.641-2.066c.85-.546 1.761-.85 2.733-.85.972 0 2.309.972 2.309 3.706v17.252h9.72v-12.15c.005-1.06.107-2.117.303-3.158.122-.972.426-1.944.972-2.734.426-.851.972-1.397 1.641-1.944.85-.547 1.761-.851 2.612-.668 1.64 0 2.308 2.065 2.308 3.705v16.949h9.842v-18.71c.121-1.641-.183-3.402-.608-5.043Zm54.918 49.268c-9.599 0-17.253-7.776-17.375-17.253h9.477c0 4.253 3.584 7.776 7.776 7.776s7.776-3.402 7.776-7.776h9.477c.121 9.416-7.533 17.253-17.131 17.253Zm5.345-42.585v5.042c.122 1.944-.972 3.827-2.612 4.799-1.64.972-3.827.972-5.467 0-1.64-.972-2.734-2.855-2.612-4.799V96.686c.121-1.944-.304-3.828-.972-5.772-.547-1.215-1.398-2.308-2.309-3.28-.972-.668-2.065-1.215-3.28-1.519-1.094-.304-7.412-.121-9.052-.121v8.505h5.042c.547 0 1.094.425 1.094 1.093v24.36c-.122 5.346 2.733 10.389 7.411 13.122a14.862 14.862 0 0 0 15.066 0c4.678-2.733 7.411-7.776 7.411-13.122v-5.042l-9.72.122ZM550.693 112.208c4.873 0 6.839 3.4 6.839 5.737h-13.678c0-2.365 1.988-5.737 6.839-5.737Zm5.739 16.231c-.911 1.773-2.996 2.974-5.688 2.974-5.085 0-7.095-3.636-7.15-6.875h25.26c.07-.455.256-1.75.256-2.76 0-11.437-7.848-17.894-18.456-17.894-11.182 0-19.002 6.457-19.002 17.894 0 11.521 7.82 17.894 19.068 17.894 11.06 0 16.257-6.107 17.644-11.233h-11.932Zm-181.737.956c-4.536 0-7.758-3.26-7.758-7.588 0-4.127 3.026-7.589 7.758-7.589 4.733 0 7.756 3.482 7.756 7.589 0 4.171-3.064 7.588-7.756 7.588Zm3.394-25.167c-4.977 0-9.247 2.202-11.448 4.789l-.007-4.114H355.27v47.25h11.714v-16.917c2.748 2.966 6.574 4.092 10.443 4.092 11.605 0 16.988-8.794 16.988-17.551 0-10.806-6.914-17.549-16.326-17.549Zm31.947-12.825h-11.762v47.25h11.762v-47.25Zm28.38 13.5v17.549c0 2.661-.366 3.953-1.452 5.242-1.05 1.246-2.698 1.834-4.524 1.834s-3.477-.588-4.527-1.834c-1.087-1.289-1.45-2.581-1.45-5.242v-17.55h-11.718l.002 18.593c0 5.227.797 8.639 3.3 11.538 2.647 3.067 6.69 4.286 10.648 4.286 4.637 0 7.849-1.746 10.069-4.319l.007 3.652h11.362v-33.749h-11.717Zm49.918 0h-8.008l-8.824 9.006-8.824-9.006h-8.007v8.028l8.983 8.847-8.983 8.847v8.028h8.008l8.823-9.006 8.824 9.006h8.007v-8.028l-8.982-8.847 8.983-8.847v-8.028Zm21.64 7.305c4.873 0 6.84 3.4 6.84 5.737h-13.679c0-2.365 1.988-5.737 6.839-5.737Zm5.739 16.231c-.911 1.773-2.996 2.974-5.688 2.974-5.085 0-7.096-3.636-7.15-6.875h25.26c.071-.455.257-1.75.257-2.76 0-11.437-7.849-17.894-18.457-17.894-11.182 0-19.002 6.457-19.002 17.894 0 11.521 7.82 17.894 19.068 17.894 11.061 0 16.257-6.107 17.645-11.233h-11.933Z"
          transform="matrix(1.14558 0 0 1.14558 -50.703 -104.53)"
        />
      </G>
      <G>
        <Path
          fill="#F48F00"
          d="M258.3 163.403c0-4.932 1.793-9.863 4.595-13.898V96.603H128.736v134.271h134.272V177.3c-3.139-4.034-4.708-8.63-4.708-13.897Z"
        />
        <Path
          fill="#FEFEFE"
          d="m191.502 125.183-8.966 1.794c-.897.336-1.233.56-1.233 1.569v35.753c0 1.793 0 3.699-.56 5.492-.561 2.802-2.13 4.595-5.268 5.492-1.57.336-3.027.56-4.596.336-4.259-.56-6.724-2.466-7.733-6.164-.56-1.793-.56-3.363-.56-5.268v-38.331c0-.897-.337-1.233-1.233-.897l-8.63 1.794c-.897.336-1.233.56-1.233 1.569v36.986c0 1.569 0 3.362.336 4.931.896 6.725 4.259 11.657 10.76 14.459 4.034 1.793 8.293 2.13 12.664 1.569 10.424-1.233 17.597-8.63 17.597-19.054V126.08c-.112-.897-.448-1.12-1.345-.897Zm46.177 23.425c-6.165-7.733-18.157-11.096-28.693-4.259 0-1.57 0-3.362-.336-4.595 0-.897 0-1.233-.897-.897l-8.63 2.13c-.896.336-1.233.56-1.233 1.569v58.169l10.2-2.466c.896-.336.56-.896.56-1.233v-13c0-.561 0-.897.336-1.57 10.424 6.725 22.192 3.362 28.693-4.595 6.837-8.294 6.837-20.623 0-29.253Zm-12.33 27.46c-7.396 3.026-15.354-1.57-16.923-9.527-.336-1.233-.336-2.13-.336-2.802 0-6.165 4.035-11.432 9.526-12.665 7.061-1.57 13.898 3.026 15.131 10.199 1.233 6.5-1.793 12.329-7.397 14.795Z"
        />
        <Path
          fill="#F48F00"
          d="M297.753 126.753v18.493c-4.595-3.363-7.957-4.596-12.665-4.596-11.656 0-21.519 10.424-21.519 22.753 0 12.328 9.863 22.752 21.295 22.752 4.595 0 8.63-1.57 13.562-5.492v5.268l9.19-1.233V125.52l-9.863 1.233Zm-11.656 49.875c-7.061 0-12.329-5.828-12.329-13.225 0-7.061 5.492-12.89 11.993-12.89 6.725 0 12.665 6.165 12.665 13.226 0 7.06-5.604 12.889-12.329 12.889Zm68.929 4.035c-5.38 3.81-11.88 5.828-18.493 5.828-13.226 0-23.761-10.2-23.761-23.425 0-12.889 10.76-23.424 23.76-23.424 6.501 0 12.89 2.802 17.261 7.397 1.57 1.793 2.802 3.362 4.035 6.5l-30.486 18.494c2.13 3.026 4.932 4.595 9.19 4.595 4.26 0 7.958-1.57 13.899-5.268l4.595 9.303Zm-10.423-28.356c-2.466-2.13-4.596-2.802-7.398-2.802-7.397 0-13.561 6.164-13.561 13.561v1.794l20.959-12.553Zm-6.837-29.253h11.768l-11.096 12.329h-9.302l8.63-12.33Zm35.753 59.738c0 7.398-1.233 11.657-4.259 14.795-3.026 3.026-6.164 4.259-11.656 4.259h-3.026l-3.027-9.863h2.466c3.699 0 6.5-.897 7.958-2.802 1.233-1.57 1.569-2.802 1.569-6.5v-41.134l10.423-1.233-.448 42.478Zm-11.656-52.117 7.173-7.173 7.173 7.173-7.173 7.173-7.173-7.173Zm41.581 45.953c-4.259 0-7.06-1.57-9.19-4.595l30.485-18.493c-1.233-3.027-2.465-4.596-4.034-6.501-4.26-4.595-10.76-7.397-17.26-7.397-12.89 0-23.762 10.423-23.762 23.424 0 13.226 10.424 23.425 23.761 23.425 6.725 0 13.226-2.13 18.493-5.828l-4.595-9.19c-5.94 3.698-9.639 5.155-13.898 5.155Zm-13.225-13.45c0-7.397 6.164-13.561 13.562-13.561 2.801 0 4.931.56 7.397 2.802l-20.96 12.665v-1.906Zm66.798 22.08v-5.492c-4.259 4.595-7.396 6.165-12.327 6.165-4.932 0-9.191-2.13-11.657-5.492-1.793-2.466-2.465-5.492-2.465-10.424v-28.804l10.423-1.233v24.994l.336 6.5c.56 2.466 3.026 4.26 5.828 4.26 3.026 0 6.164-1.57 7.733-3.7 1.569-1.793 1.793-4.258 1.793-9.19v-21.631l10.423-1.233v43.71c.112.113-10.087 1.57-10.087 1.57Zm45.28 0v-26.787c0-3.362-.336-4.595-.896-5.828-.897-1.793-3.363-3.026-5.492-3.026-3.363 0-6.5 1.793-7.958 4.595-.897 1.793-1.233 4.26-1.233 9.19v20.96l-10.423 1.232v-44.047l10.2-1.233v6.165c2.801-4.932 6.5-6.725 11.992-6.725 4.595 0 8.293 1.793 10.76 4.595 2.465 3.026 3.362 5.828 3.362 11.432v28.356c-.113-.112-10.312 1.121-10.312 1.121Zm60.075-4.595c-5.38 3.81-11.88 5.828-18.493 5.828-13.226 0-23.761-10.2-23.761-23.425 0-12.889 10.76-23.424 23.76-23.424 6.501 0 12.89 2.802 17.261 7.397 1.57 1.793 2.802 3.362 4.035 6.5l-30.486 18.494c2.13 3.026 4.932 4.595 9.19 4.595 4.26 0 7.958-1.57 13.899-5.268l4.595 9.303Zm-10.536-28.356c-2.465-2.13-4.595-2.802-7.397-2.802-7.397 0-13.561 6.164-13.561 13.561v1.794l20.958-12.553Zm17.597 32.951v-43.711l10.423-1.233v7.061c4.035-6.164 7.398-7.957 14.795-7.957h2.13l-4.036 11.656h-1.569c-3.698 0-6.724 1.569-8.63 4.035-1.793 2.13-2.802 6.5-2.802 11.992v17.26c.112 0-10.311.897-10.311.897Z"
        />
      </G>
    </G>
  </Svg>
)

export default SvgComponent
