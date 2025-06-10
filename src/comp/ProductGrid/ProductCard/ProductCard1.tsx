import { memo, useState } from "react";
import {
  FaTruck,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaCubes,
  FaInfoCircle,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import styles from "./ProductCard1.module.css";
import NoImage from "../../../assets/no-image-cropped.webp";

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
  const [isHovered, setIsHovered] = useState(false);

  const toggleBreakdown = () => setShowBreakdown(!showBreakdown);
  const finalPrice = price_before_vat + (price_before_vat * vat) / 100;

  const name = `${size} Yard Skip`;
  const hirePeriod = `${hire_period_days} days`;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle gradient overlay */}
      <div className={styles.gradientOverlay}></div>

      {/* Premium badge */}
      <div className={styles.premiumBadge}>
        <div className={styles.badgeContent}>
          <div className={styles.badgeInner}>
            <FaStar className={styles.sparkleIcon} />
            <span className={styles.badgeText}>{size} Yard</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        {/* <div className={styles.heroPattern1}></div>
        <div className={styles.heroPattern2}></div> */}

        {/* Floating elements */}
        {/* <div className={styles.floatingElement1}></div>
        <div className={styles.floatingElement2}></div> */}

        {/* <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconGlow}></div>
            <FaCubes className={styles.packageIcon} />
          </div>
        </div> */}
        <img src={NoImage} alt={name} className={styles.image} width="100%" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.hirePeriodContainer}>
            <FaCalendarAlt className={styles.calendarIcon} />
            <span className={styles.hirePeriodText}>
              {hirePeriod} hire period
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className={styles.statusSection}>
          <div className={styles.statusRow}>
            <div
              className={`${styles.statusTag} ${
                allowed_on_road ? styles.statusTagGreen : styles.statusTagRed
              }`}
            >
              {allowed_on_road ? (
                <FaCheck className={styles.statusIcon} />
              ) : (
                <FaTimes className={styles.statusIcon} />
              )}
              <span>{allowed_on_road ? "Road Approved" : "Private Use"}</span>
            </div>

            <div
              className={`${styles.statusTag} ${
                allows_heavy_waste ? styles.statusTagBlue : styles.statusTagGray
              }`}
            >
              <FaWeightHanging className={styles.statusIcon} />
              <span>{allows_heavy_waste ? "Heavy Duty" : "Standard"}</span>
            </div>
          </div>

          {/* Additional Services */}
          <div className={styles.additionalServices}>
            {transport_cost !== null && (
              <div className={`${styles.serviceTag} ${styles.serviceTagAmber}`}>
                <FaTruck className={styles.serviceIcon} />
                <span>Delivery £{transport_cost}</span>
              </div>
            )}

            {per_tonne_cost !== null && (
              <div
                className={`${styles.serviceTag} ${styles.serviceTagPurple}`}
              >
                <FaCubes className={styles.serviceIcon} />
                <span>£{per_tonne_cost}/tonne</span>
              </div>
            )}

            <div className={`${styles.serviceTag} ${styles.statusTagGray}`}>
              <FaMapMarkerAlt className={styles.serviceIcon} />
              <span>{postcode}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <div className={styles.priceDetails}>
                <div className={styles.priceRow}>
                  <span className={styles.price}>£{finalPrice.toFixed(2)}</span>
                  <button
                    onClick={toggleBreakdown}
                    className={styles.infoButton}
                    title="Price breakdown"
                  >
                    <FaInfoCircle className={styles.infoIcon} />
                  </button>
                </div>
                <span className={styles.vatText}>including VAT</span>
              </div>
            </div>

            {/* Elegant Price Breakdown */}
            {showBreakdown && (
              <div className={styles.breakdown}>
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
                  <div
                    className={`${styles.breakdownRow} ${styles.breakdownTotal}`}
                  >
                    <span className={styles.breakdownTotalLabel}>Total</span>
                    <span className={styles.breakdownTotalValue}>
                      £{finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className={styles.selectButton}>
            <span className={styles.buttonText}>Select Skip</span>
            <div className={styles.buttonShimmer}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
