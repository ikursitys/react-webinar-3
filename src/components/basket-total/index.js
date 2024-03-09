import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import useTranslation from "../../hooks/useTranslation";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");

  const [getTranslation] = useTranslation();
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{getTranslation("total")}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
