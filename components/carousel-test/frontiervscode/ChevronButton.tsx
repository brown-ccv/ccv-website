import PropTypes from "prop-types";
import React from "react";
import faChevronLeft from "@/components/assets/frontier/fa-chevron-left.svg";
import faChevronRight from "@/components/assets/frontier/fa-chevron-right.svg";

interface Props {
  property1: "right" | "left";
  className: any;
}

export const ChevronButton = ({ property1, className }: Props): JSX.Element => {
  return (
    <div
      className={`border border-solid border-[#3a3a3a] w-[35px] h-[35px] rounded-[99px] bg-white relative ${className}`}
    >
      <img
        className="w-6 left-1 top-1 h-6 absolute"
        alt="React icons fa"
        src={property1 === "right" ? faChevronRight : faChevronLeft}
      />
    </div>
  );
};

ChevronButton.propTypes = {
  property1: PropTypes.oneOf(["right", "left"]),
};