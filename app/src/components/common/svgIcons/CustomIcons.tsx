/* eslint-disable @typescript-eslint/no-unused-vars */
// ignored linting here until we actually use the  components.

import { IconButtonProps } from "@mui/material";
import { IconBtnM } from "../buttons/iconBtn/IconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { StyledIconBtnM } from "../buttons/button/StyledBtn";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { ReactComponent as Wrong } from "@/assets/svg/wrongIcon.svg";
import { ReactComponent as Dislike } from "@/assets/svg/dislike.svg";
import { ReactComponent as Like } from "@/assets/svg/like.svg";
import { ReactComponent as Neutral } from "@/assets/svg/neutral.svg";
import { ReactComponent as Star } from "@/assets/svg/starIcon.svg";

export interface ICustomIconProps {
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  active: number;
}

export const ratingIconStyling = {
  width: 20,
  height: 20,
};

export const ClockIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.7077 9.00033C16.7077 13.2578 13.2568 16.7087 8.99935 16.7087C4.74185 16.7087 1.29102 13.2578 1.29102 9.00033C1.29102 4.74283 4.74185 1.29199 8.99935 1.29199C13.2568 1.29199 16.7077 4.74283 16.7077 9.00033Z"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8585 11.4524L8.7168 9.57823V5.53906"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const SoundLevelIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5182 4.90326L12.5182 10.9199"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.0293 6.56992L9.0293 10.9199"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.54948 8.62409L5.54948 10.9199"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.29102 4.74285C1.29102 4.74285 1.29435 11.1403 1.29435 11.1503C1.30852 13.4503 2.82185 14.8745 5.13018 14.8745L12.7935 14.8745C15.1135 14.8745 16.6327 13.4395 16.6327 11.1195C16.6327 11.1195 16.6302 4.72284 16.6302 4.71201C16.616 2.41201 15.1018 0.987011 12.7935 0.987011L5.13018 0.987011C2.81018 0.987011 1.29102 2.42285 1.29102 4.74285Z"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const SoundIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3664_4220)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="white"
          shape-rendering="crispEdges"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.3538 19.8564C16.3001 20.2958 16.2843 20.7281 16.1644 21.1754C15.9735 21.8129 15.4742 22.2028 14.9353 22.187C14.6797 22.1933 14.32 22.0377 14.0778 21.8341L11.2528 19.5396H9.67902C8.92012 19.5396 8.40892 19.0224 8.30558 18.1703C8.15806 17.1217 8.17226 15.2273 8.30558 14.1575C8.40892 13.4186 8.92012 12.8362 9.67902 12.8362H11.2528L14.0195 10.581C14.2616 10.3758 14.6797 10.1825 14.9353 10.188C15.4742 10.1722 15.9735 10.5629 16.1644 11.1996C16.2709 11.6068 16.3001 12.08 16.3538 12.5194C16.4823 13.5468 16.4823 18.829 16.3538 19.8564Z"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.333 12.2954C20.014 13.2749 20.4228 14.5889 20.4228 16.0514C20.4228 17.5139 20.014 18.8272 19.333 19.8067"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.9062 10C23.0035 11.578 23.662 13.6945 23.662 16.051C23.662 18.4075 23.0035 20.5247 21.9062 22.1027"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3664_4220"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3664_4220"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3664_4220"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const MuteIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3245_47632)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="white"
          shape-rendering="crispEdges"
        />
        <path
          d="M12.9178 19.2872H11.3336C10.5704 19.2872 10.0558 18.7654 9.95179 17.9046C9.80329 16.8453 9.81758 14.9314 9.95179 13.8499C10.0558 13.1034 10.5704 12.5157 11.3336 12.5157H12.9178L15.7028 10.2374C15.9466 10.0301 16.3683 9.83479 16.6248 9.84035C17.1671 9.82368 17.6698 10.2184 17.8628 10.8624C17.9692 11.2729 17.9986 11.7518 18.0526 12.1949C18.1066 12.6261 18.1383 12.5872 18.1471 13.8872"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.1445 17.6436C18.1302 18.6457 18.096 19.2556 18.0523 19.6074C17.9983 20.0505 17.9825 20.4881 17.8625 20.9391C17.6696 21.584 17.1669 21.9778 16.6245 21.9612C16.368 21.9675 16.0051 21.8111 15.7613 21.6046L14.7139 20.7501"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.7465 9.4707L9.88574 22.3314"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3245_47632"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3245_47632"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3245_47632"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const PlayIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_972_27414)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="#6462F1"
          shape-rendering="crispEdges"
        />
        <path
          d="M12 11L12 21"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M20 11L20 21"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_972_27414)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="#6462F1"
          shape-rendering="crispEdges"
        />
        <path
          d="M20.5 16.866C21.1667 16.4811 21.1667 15.5189 20.5 15.134L13 10.8038C12.3333 10.4189 11.5 10.9001 11.5 11.6699L11.5 20.3301C11.5 21.0999 12.3333 21.5811 13 21.1962L20.5 16.866Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_972_27414"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_972_27414"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_972_27414"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_972_27414"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_972_27414"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_972_27414"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export const PauseIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3664_4355)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="#6462F1"
          shape-rendering="crispEdges"
        />
        <path
          d="M12 11L12 21"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M20 11L20 21"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3664_4355"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3664_4355"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3664_4355"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const FullScreenIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3664_4348)">
        <rect
          width="32"
          height="32"
          rx="10"
          fill="white"
          shape-rendering="crispEdges"
        />
        <path
          d="M18.7987 10.0001V11.4646C18.7987 12.8365 19.9207 13.9585 21.2926 13.9585H22.5254"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.2266 21.9169L13.2266 20.4524C13.2266 19.0805 12.1046 17.9585 10.7328 17.9585L9.5 17.9585"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.248 10.0001V11.4678C13.248 12.842 12.1347 13.9561 10.7605 13.9577L9.50019 13.9585"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.7773 21.9169L18.7773 20.4492C18.7773 19.075 19.8907 17.9609 21.2649 17.9593L22.5252 17.9585"
          stroke="#121212"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="9.5"
          stroke="#121212"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3664_4348"
          x="0"
          y="0"
          width="32"
          height="34"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3664_4348"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3664_4348"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const LikeButton = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3911_5566)">
        <path
          d="M2.18164 8.30164H5.45437C6.03302 8.30164 6.58808 8.5314 6.99725 8.94057C7.40642 9.34974 7.63619 9.9048 7.63619 10.4835V18.1198C7.63619 18.6985 7.40642 19.2533 6.99725 19.6624C6.58808 20.0716 6.03302 20.3016 5.45437 20.3016H2.18164V8.30164Z"
          fill="#DBFDDC"
        />
        <path
          d="M2.18164 8.30164H5.45437C6.03302 8.30164 6.58808 8.5314 6.99725 8.94057C7.40642 9.34974 7.63619 9.9048 7.63619 10.4835V18.1198C7.63619 18.6985 7.40642 19.2533 6.99725 19.6624C6.58808 20.0716 6.03302 20.3016 5.45437 20.3016H2.18164V8.30164Z"
          fill="#79E47C"
        />
        <path
          d="M7.63672 19.2105L10.2766 19.9741C11.0582 20.1912 11.8655 20.3014 12.6766 20.3014H18.2731C18.6347 20.3014 18.9815 20.1576 19.2372 19.9019C19.4929 19.6462 19.6367 19.2994 19.6367 18.9378C19.6367 18.5761 19.4929 18.2291 19.2372 17.9734C18.9815 17.7176 18.6347 17.5741 18.2731 17.5741H19.364C19.7257 17.5741 20.0724 17.4304 20.3281 17.1746C20.5839 16.9189 20.7276 16.5722 20.7276 16.2105C20.7276 15.8488 20.5839 15.5018 20.3281 15.2461C20.0724 14.9904 19.7257 14.8469 19.364 14.8469H20.4549C20.8166 14.8469 21.1633 14.7031 21.419 14.4474C21.6748 14.1916 21.8185 13.8449 21.8185 13.4832C21.8185 13.1216 21.6748 12.7746 21.419 12.5188C21.1633 12.2631 20.8166 12.1196 20.4549 12.1196C20.8166 12.1196 21.1633 11.9758 21.419 11.7201C21.6748 11.4644 21.8185 11.1176 21.8185 10.756C21.8185 10.3943 21.6748 10.0473 21.419 9.79155C21.1633 9.53582 20.8166 9.39232 20.4549 9.39232H14.7276L15.993 6.54493C16.2617 5.9404 16.3409 5.26872 16.2202 4.61826C16.0994 3.96779 15.7846 3.36926 15.3168 2.90146L14.9348 2.50862C14.8015 2.37378 14.6352 2.27596 14.4525 2.22497C14.2698 2.17397 14.0771 2.17152 13.8932 2.21778C13.7093 2.26403 13.5405 2.35756 13.4037 2.48891C13.2669 2.62025 13.1668 2.78483 13.1131 2.96671L12.5895 4.70135C12.2078 5.96912 11.3779 7.05485 10.2548 7.75595L7.63672 9.39232"
          fill="white"
        />
      </g>
      <path
        d="M2.18164 8.72729H5.45437C6.65935 8.72729 7.63619 9.70413 7.63619 10.9091V18.5455C7.63619 19.7505 6.65935 20.7273 5.45437 20.7273H2.18164V8.72729Z"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.23729 18.1189C5.23729 18.5005 4.92799 18.8098 4.54638 18.8098C4.16477 18.8098 3.85547 18.5005 3.85547 18.1189C3.85547 17.7373 4.16477 17.428 4.54638 17.428C4.92799 17.428 5.23729 17.7373 5.23729 18.1189Z"
        fill="#121212"
      />
      <path
        d="M7.63672 9.81805L10.2574 8.18014C11.3808 7.478 12.2103 6.39098 12.591 5.12205L13.1119 3.38562C13.3491 2.59497 14.3445 2.34401 14.9282 2.9277L15.3201 3.31959C16.2776 4.27713 16.5465 5.72549 15.9966 6.96294L14.7276 9.81805"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.0918 9.81824H20.4554C21.2085 9.81824 21.8191 10.4288 21.8191 11.1819V11.1819C21.8191 11.935 21.2085 12.5455 20.4554 12.5455H18.0009"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 12.5454H20.4545C21.2077 12.5454 21.8182 13.1559 21.8182 13.909V13.909C21.8182 14.6622 21.2077 15.2727 20.4545 15.2727H18.5455"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 15.2727H19.3636C20.1168 15.2727 20.7273 15.8832 20.7273 16.6363V16.6363C20.7273 17.3895 20.1168 18 19.3636 18H18.5455"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.4549 18H18.2731C19.0262 18 19.6367 18.6105 19.6367 19.3636V19.3636C19.6367 20.1168 19.0262 20.7273 18.2731 20.7273H12.6772C11.8663 20.7273 11.0593 20.6143 10.2796 20.3915L7.63672 19.6364"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <clipPath id="clip0_3911_5566">
          <rect
            width="19.6364"
            height="18.12"
            fill="white"
            transform="translate(2.18164 3.27271)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const UnlikeIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9993 3.33325L10.666 3.99992L8.79935 4.93325L5.99935 3.99992H2.66602V15.3333H6.66602L8.30238 14.2423L11.3327 16.6666L13.3327 19.3333L13.9993 21.3333H15.3327L16.666 19.3333L15.3327 14.6666H20.666L21.9993 13.3333L21.3327 11.3333V9.33325L20.666 8.66659L19.3327 5.33325V3.99992L17.9993 3.33325Z"
        fill="white"
      />
      <path
        d="M2.66602 15.4668H5.86601C7.04422 15.4668 7.99935 14.5117 7.99935 13.3335V5.8668C7.99935 4.68859 7.04422 3.73346 5.86602 3.73346H2.66602V15.4668Z"
        fill="#D74975"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.76854 5.88099C5.76854 5.49938 5.45924 5.19008 5.07763 5.19008C4.69602 5.19008 4.38672 5.49938 4.38672 5.88099C4.38672 6.2626 4.69602 6.5719 5.07763 6.5719C5.45924 6.5719 5.76854 6.2626 5.76854 5.88099Z"
        fill="#121212"
      />
      <path
        d="M8 14.4L10.5624 16.0015C11.6609 16.6881 12.4719 17.7509 12.8442 18.9917L13.3535 20.6895C13.5854 21.4626 14.5587 21.708 15.1294 21.1373L15.5126 20.7541C16.4489 19.8178 16.7118 18.4016 16.1741 17.1917L14.9333 14.4"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.332 14.4H20.532C21.2684 14.4 21.8654 13.8031 21.8654 13.0667V13.0667C21.8654 12.3303 21.2684 11.7334 20.532 11.7334H18.132"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.1328 11.7334H20.5328C21.2692 11.7334 21.8661 11.1364 21.8661 10.4001V10.4001C21.8661 9.66369 21.2692 9.06673 20.5328 9.06673H18.6661"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.1328 9.06665H19.4661C20.2025 9.06665 20.7995 8.4697 20.7995 7.73332V7.73332C20.7995 6.99694 20.2025 6.39998 19.4661 6.39998H18.6661"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.6 6.40002H18.4C19.1364 6.40002 19.7333 5.80307 19.7333 5.06669V5.06669C19.7333 4.33031 19.1364 3.73336 18.4 3.73336H12.9285C12.1356 3.73336 11.3466 3.84386 10.5842 4.06169L8 4.80002"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const FlagIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.44531 2.22241L3.44531 23"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.5563 16.3513V4.68025C20.5563 3.68727 19.3624 3.00978 18.4101 3.2912C16.7893 3.77021 14.4346 3.94031 12.0008 2.3112C8.54424 -0.00253832 5.24715 1.31289 3.98544 1.98814C3.63665 2.17481 3.44531 2.54615 3.44531 2.94174V14.9607C3.44531 15.8981 4.49807 16.5566 5.40613 16.3239C7.02968 15.9078 9.47258 15.7085 12.0008 17.0621C15.3688 18.8655 18.5854 17.9127 19.9152 17.363C20.3213 17.1951 20.5563 16.7907 20.5563 16.3513Z"
        fill="#F1AF63"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.889 10.7505C15.4632 10.8593 13.7522 10.6671 12.0002 9.72899C10.2482 8.79091 8.53712 8.59864 7.11133 8.70747"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const SaveIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6653 18.6316L5.73395 21.8811C5.26037 22.1272 4.67694 21.953 4.41587 21.4875C4.34034 21.3433 4.29959 21.1834 4.29688 21.0206V6.62247C4.29688 3.87647 6.17331 2.77808 8.87353 2.77808H15.2168C17.8346 2.77808 19.7934 3.80325 19.7934 6.4394V21.0206C19.7934 21.2804 19.6903 21.5295 19.5066 21.7132C19.3229 21.8969 19.0738 22 18.814 22C18.6484 21.9974 18.4855 21.9567 18.3381 21.8811L12.3701 18.6316C12.1502 18.5128 11.8852 18.5128 11.6653 18.6316Z"
        fill="#6462F1"
        stroke="#121212"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.36914 9.32266H15.6643"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const MicIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;

  if (active === 0) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="40"
          height="40"
          rx="12"
          fill="#FF1A61"
          fill-opacity="0.31"
        />
        <path
          d="M26.86 13.25L14 26.11"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3594 25.0201C21.9958 25.0201 23.5651 24.37 24.7222 23.2129C25.8793 22.0558 26.5294 20.4865 26.5294 18.8501"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.1895 18.8501C14.1901 19.7604 14.3922 20.6592 14.7812 21.4821C15.1702 22.3051 15.7365 23.0318 16.4395 23.6101"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3594 27.36V25.02"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.6694 21.44C18.222 21.1724 17.852 20.7928 17.596 20.3386C17.34 19.8844 17.2067 19.3714 17.2094 18.85V15.05C17.2028 14.6518 17.2755 14.2564 17.4232 13.8866C17.571 13.5168 17.791 13.1802 18.0702 12.8963C18.3494 12.6124 18.6824 12.3869 19.0497 12.233C19.417 12.0792 19.8112 11.9999 20.2094 12H20.4194C20.8176 11.9999 21.2118 12.0792 21.5791 12.233C21.9464 12.3869 22.2794 12.6124 22.5586 12.8963C22.8378 13.1802 23.0578 13.5168 23.2055 13.8866C23.3533 14.2564 23.426 14.6518 23.4194 15.05V16.34"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="40"
          height="40"
          rx="12"
          fill="#908C98"
          fill-opacity="0.5"
        />
        <path
          d="M13.9297 19.11C13.9297 22.5179 16.6916 25.2798 20.0995 25.2798C23.5075 25.2798 26.2694 22.5179 26.2694 19.11"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.1 27.6223V25.2803"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.2056 22.1537H19.9953C18.3112 22.1537 16.9453 20.7886 16.9453 19.1037V15.3116C16.9453 13.6275 18.3112 12.2616 19.9953 12.2616H20.2056C21.8898 12.2616 23.2556 13.6275 23.2556 15.3116V19.1037C23.2556 20.7886 21.8898 22.1537 20.2056 22.1537Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};

export const CamIcon = (props: ICustomIconProps): JSX.Element => {
  const { width, height, active } = props;
  const viewBox = "0 0 " + width + " " + height;
  if (active === 1) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="40"
          height="40"
          rx="12"
          fill="#908C98"
          fill-opacity="0.5"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.18 23.017C23.18 24.6779 22.0483 25.8512 20.2383 25.8512H15.0575C13.2492 25.8512 12.125 24.6779 12.125 23.017V17.217C12.125 15.557 13.2492 14.3754 15.0667 14.3754H20.2383C22.0483 14.3754 23.18 15.557 23.18 17.217V23.017Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.1797 19.3972L26.5939 16.6022C27.1355 16.1564 27.958 16.5439 27.958 17.2497V22.9764C27.958 23.683 27.1355 24.0689 26.5939 23.6239L23.1797 20.8289"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="40"
          height="40"
          rx="12"
          fill="#FF1A61"
          fill-opacity="0.31"
        />
        <path
          d="M23.959 19.7101L27.339 16.9201C27.4632 16.8084 27.6179 16.7362 27.7834 16.7128C27.9489 16.6895 28.1175 16.716 28.2678 16.789C28.4181 16.862 28.5432 16.9782 28.6272 17.1227C28.7111 17.2672 28.75 17.4334 28.739 17.6001V23.3201C28.7387 23.4788 28.6934 23.6341 28.6085 23.7681C28.5236 23.9021 28.4024 24.0094 28.2591 24.0774C28.1157 24.1454 27.956 24.1714 27.7985 24.1524C27.641 24.1334 27.4921 24.0702 27.369 23.9701L23.959 21.1801"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.86 14L12 26.86"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.9595 19.71V23.33C23.9762 23.716 23.9108 24.1012 23.7676 24.46C23.6244 24.8189 23.4066 25.1433 23.1287 25.4118C22.8508 25.6802 22.5191 25.8866 22.1555 26.0173C21.7919 26.148 21.4047 26.2 21.0195 26.17H16.9395"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5891 25.2698C13.1254 24.7317 12.8793 24.0398 12.8991 23.3298V17.5298C12.8822 17.1428 12.9478 16.7567 13.0916 16.3971C13.2354 16.0375 13.4541 15.7126 13.7331 15.4439C14.0121 15.1753 14.3451 14.9692 14.7099 14.8391C15.0747 14.7091 15.4631 14.6582 15.8491 14.6898H21.0191C21.4361 14.675 21.8516 14.7475 22.239 14.9025C22.6264 15.0574 22.9773 15.2915 23.2691 15.5898"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};
