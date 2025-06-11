import { memo, useCallback } from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaCubes,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { Badge, Button, Popover, Tag, Tooltip } from "antd";
import styles from "./ProductCard1.module.css";
import NoImage from "../../../assets/no-image-cropped.webp";
import { useSkipPageCtx } from "../../../hooks/useSkipCtx";

import { RefObject } from "react";
import { GridApi } from "ag-grid-community";
import { GridRef } from "../../Layout/Layout";

interface Props {
  skip: Skip;
  gridRef?: GridRef;
}

const ProductCard: React.FC<Props> = ({ skip, gridRef }) => {
  const {
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,
    allows_heavy_waste,
    transport_cost,
    per_tonne_cost,
    postcode,
  } = skip;

  const { setSelectedSkip } = useSkipPageCtx();

  const onSelect = useCallback(() => {
    setSelectedSkip(skip);

    if (gridRef?.current) {
      const rowNode = gridRef.current.api.getRowNode(String(skip.id));
      if (rowNode) {
        rowNode.setSelected(true);
      }
    }
  }, [skip, setSelectedSkip, gridRef]);

  const finalPrice = price_before_vat + (price_before_vat * vat) / 100;

  const name = `${size} Yard Skip`;
  const hirePeriod = `${hire_period_days} days`;

  const breakdownContent = (
    <div className={styles.breakdownContent}>
      <div className={styles.breakdownRow}>
        <span className={styles.breakdownLabel}>Base price</span>
        <span className={styles.breakdownValue}>
          £{price_before_vat.toFixed(2)}
        </span>
      </div>
      <div className={styles.breakdownRow}>
        <span className={styles.breakdownLabel}>VAT ({vat}%)</span>
        <span className={styles.breakdownValue}>
          £{((price_before_vat * vat) / 100).toFixed(2)}
        </span>
      </div>
      <hr className={styles.breakdownDivider} />
      <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
        <span className={styles.breakdownTotalLabel}>Total</span>
        <span className={styles.breakdownTotalValue}>
          £{finalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.card}>
      <Badge.Ribbon
        text={allowed_on_road ? "Road allowed" : "Road not allowed"}
        color={allowed_on_road ? "green" : "red"}
      >
        <img
          src={NoImage}
          alt={name}
          className={styles.image}
          style={{ width: "100%" }}
        />
      </Badge.Ribbon>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.hirePeriodContainer}>
            <FaCalendarAlt className={styles.calendarIcon} />
            <span className={styles.hirePeriodText}>
              {hirePeriod} hire period
            </span>
          </div>
        </div>

        <div className={styles.statusSection}>
          <Tag color="default">
            <FaMapMarkerAlt className={styles.serviceIcon} /> {postcode}
          </Tag>

          <Tag color={allows_heavy_waste ? "blue" : "gray"}>
            {allows_heavy_waste ? "Heavy Duty" : "Standard"}
          </Tag>

          {transport_cost ? (
            <Tag color="orange">
              <FaTruck className={styles.serviceIcon} /> Delivery £
              {transport_cost}
            </Tag>
          ) : (
            <Tag color="gray">No Delivery Info</Tag>
          )}

          {per_tonne_cost ? (
            <Tag color="purple">
              <FaCubes className={styles.serviceIcon} /> £{per_tonne_cost}/tonne
            </Tag>
          ) : (
            <Tag color="gray">No Tonne Info</Tag>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <Tooltip title="including VAT">
              <span className={styles.price}>£{finalPrice.toFixed(2)}</span>
            </Tooltip>
            <Popover
              content={breakdownContent}
              title="Price Breakdown"
              trigger="hover"
              placement="topRight"
            >
              <Button
                icon={<FaInfoCircle />}
                className={styles.infoButton}
                title="Price breakdown"
              />
            </Popover>
          </div>

          <Button
            type="primary"
            className={styles.selectButton}
            onClick={onSelect}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
