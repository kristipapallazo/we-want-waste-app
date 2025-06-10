import { memo } from "react";
import {
  FaRoad,
  FaWeightHanging,
  FaBan,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaCubes,
} from "react-icons/fa";
import NoImage from "../../../assets/no-image-cropped.webp";
import styles from "./ProductCard.module.css";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

interface Props {
  skip: Skip;
}

const ProductCard: React.FC<Props> = ({ skip }) => {
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

  const [showBreakdown, setShowBreakdown] = useState(false);
  const toggleBreakdown = () => setShowBreakdown(!showBreakdown);
  const finalPrice = price_before_vat + (price_before_vat * vat) / 100;

  const name = `${size} Yard Skip`;
  const hirePeriod = `${hire_period_days}-day hire`;
  const fullPrice = (price_before_vat + (price_before_vat * vat) / 100).toFixed(
    2
  );

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={NoImage} alt={name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.hirePeriod}>{hirePeriod}</p>

        <div className={styles.tags}>
          <span
            className={`${styles.tag} ${
              allowed_on_road ? styles.tagGreen : styles.tagRed
            }`}
          >
            {allowed_on_road ? (
              <>
                <FaRoad className={styles.tagIcon} /> On-road allowed
              </>
            ) : (
              <>
                <FaBan className={styles.tagIcon} /> Not allowed on-road
              </>
            )}
          </span>

          <span
            className={`${styles.tag} ${
              allows_heavy_waste ? styles.tagBlue : styles.tagRed
            }`}
          >
            {allows_heavy_waste ? (
              <>
                <FaWeightHanging className={styles.tagIcon} /> Heavy waste
              </>
            ) : (
              <>
                <FaBan className={styles.tagIcon} /> No heavy waste
              </>
            )}
          </span>

          {transport_cost !== null && (
            <span className={`${styles.tag} ${styles.tagGray}`}>
              <FaTruckMoving className={styles.tagIcon} /> +£{transport_cost}{" "}
              transport
            </span>
          )}

          {per_tonne_cost !== null && (
            <span className={`${styles.tag} ${styles.tagGray}`}>
              <FaCubes className={styles.tagIcon} /> £{per_tonne_cost}/tonne
            </span>
          )}

          <span className={`${styles.tag} ${styles.tagGray}`}>
            <FaMapMarkerAlt className={styles.tagIcon} /> Serving {postcode}
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>
              £{fullPrice} inc. VAT
              {/* £{fullPrice.toFixed(2)} inc. VAT */}
            </span>
            <FaInfoCircle
              className={styles.infoIcon}
              onClick={toggleBreakdown}
              title="Click to see breakdown"
            />

            {showBreakdown && (
              <div className={styles.breakdownBox}>
                <div>Base price: £{price_before_vat.toFixed(2)}</div>
                <div>
                  VAT ({vat}%): £{((price_before_vat * vat) / 100).toFixed(2)}
                </div>
                <hr />
                <div>
                  <strong>Total: £{finalPrice.toFixed(2)}</strong>
                </div>
              </div>
            )}
          </div>
          <button className={styles.cartBtn}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
