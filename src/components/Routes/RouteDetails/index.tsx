import { IRouteData, IRouteDetails } from "@interfaces";
import CustomImage from "../../CustomImage";
import styles from "./routedetails.module.scss";

const RouteDetails = (props: IRouteDetails) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      {compData?.heading && (
        <h2 className={styles.heading}>{compData?.heading}</h2>
      )}
      {compData?.details && (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: compData?.details }}
        />
      )}
      <div className={styles.itemWrapper}>
        {compData?.routes?.map((item: IRouteData, key: number) => (
          <div className={styles.item} key={`${item?.heading + key}`}>
            {item?.heading && <h2>{item?.heading}</h2>}
            {item?.basePoint && (
              <p className={styles.basePoint}>{item?.basePoint}</p>
            )}
            {item?.basePointName && (
              <p className={styles.basepointName}>{item?.basePointName}</p>
            )}
            {item?.timings && <p className={styles.timing}>{item?.timings}</p>}
            {item?.imageSource && (
              <div className={styles.imgSection}>
                <a href={item?.googleMapsLink} target="_blank" rel="noreferrer noopener">
                  <CustomImage
                    src={{
                      mobileSource: item?.imageSourceMobile,
                      tabletSource: item?.imageSourceTablet,
                      defaultSource: item?.imageSource,
                    }}
                    alt={item?.imageAlt}
                  />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetails;
