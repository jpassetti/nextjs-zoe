import Icon from "@/components/html/Icon";

import styles from "./comparisontable.module.scss";

interface Feature {
  _ref: string;
  _type: string;
  _key: string;
  _id: string;
  label?: string;
}

interface Package {
  title: string;
  description?: string;
  includedFeatures: {
    _key: string;
    _ref: string;
    _type: string;
    label?: string;
  }[];
}

interface ComparisonTableProps {
  features: Feature[];
  packages: Package[];
}

const ComparisonTable = ({ features, packages }: ComparisonTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Features</th>
            {packages.map((pkg, pkgIndex) => (
              <th key={`package-${pkgIndex}`} className={styles.tableHeader}>
                <div className={styles.packageTitle}>{pkg.title}</div>
                {pkg.description && <small className={styles.packageDescription}>{pkg.description}</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, featureIndex) => (
            <tr key={`feature-${featureIndex}`} className={styles.tableRow}>
              <td className={styles.featureLabel}>{feature.label ?? "Missing label"}</td>
              {packages.map((pkg, pkgIndex) => {
                const isIncluded = pkg.includedFeatures.some(
                  (includedFeature) => includedFeature._ref === feature._id
                );
                return (
                  <td
                    key={`feature-${featureIndex}-package-${pkgIndex}`}
                    className={isIncluded ? styles.checkmark : styles.xmark}
                  >
                    {isIncluded ? <Icon name="checkmark" color="green" size="small"/> : <Icon name="xmark" color="red" size="small" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
