import { ComparisonTableProps } from "@/lib/interfaces";

import Icon from "@/components/html/Icon";

import styles from "./comparisontable.module.scss";

const ComparisonTable = ({ features, packages }: ComparisonTableProps) => {
  //console.log("ComparisonTable features:", features);
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
          {features.map((feature, featureIndex) => {
            //console.log(feature._ref);
            return <tr key={`feature-${featureIndex}`} className={styles.tableRow}>
              <td className={styles.featureLabel}>{feature.label ?? "Missing label"}</td>
              {packages.map((pkg, pkgIndex) => {
                //console.log("Package included features:", pkg);
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
})}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
