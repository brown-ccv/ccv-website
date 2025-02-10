import React from "react";

interface Props {
  className: any;
  overlapGroupClassName: any;
  ellipseClassName: any;
  ellipseClassNameOverride: any;
  divClassName: any;
}

export const BrowserWindow = ({
  className,
  overlapGroupClassName,
  ellipseClassName,
  ellipseClassNameOverride,
  divClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`w-px h-px bg-white rounded-[10px] shadow-[0px_4px_8px_4px_#bbbbbb40] ${className}`}
    >
      <div
        className={`relative h-px bg-[#cacaca] rounded-[10px_10px_0px_0px] ${overlapGroupClassName}`}
      >
        <div
          className={`absolute w-px h-px top-0 left-0 bg-[#797979] ${ellipseClassName}`}
        />

        <div
          className={`absolute w-px h-px top-0 left-0 bg-[#ffc72c] ${ellipseClassNameOverride}`}
        />

        <div
          className={`absolute w-px h-px top-0 left-0 bg-[#00947d] ${divClassName}`}
        />
      </div>
    </div>
  );
};