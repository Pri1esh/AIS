import { CustomImage } from '@components';
import { IHolisticData, IHolisticDevelopment } from '@interfaces';
import styles from './holisticDevelopment.module.scss';

const HolisticDevelopment = (props: IHolisticDevelopment) => {
  const { compData } = props;

  const getType = (type: string) => {
    switch (type) {
      case 'imageText':
        return styles.imageTextWrapper;
      case 'image':
        return styles.imageWrapper;
      case 'text':
        return styles.textWrapper;
      default:
        return '';
    }
  };

  const getTheme = (type: string, theme?: string) => {
    switch (true) {
      case type === 'imageText':
        return styles.textContainer;
      case theme === 'blue':
        return styles.blueWrapper;
      case theme === 'purple':
        return styles.purpleWrapper;
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{compData?.heading}</h2>
      {compData?.data?.map((row: IHolisticData[], idx: number) => (
        <div key={`${'hd-list-' + idx}`} className={styles.gridrow}>
          {row?.map((item: IHolisticData, key: number) => (
            <div
              className={styles.colfirst}
              key={`${item?.imageAlt + key}`}
              data-columns={item?.columns}
              itemProp="item"
            >
              <div className={styles.card}>
                <div className={styles.cardbody}>
                  <div className={getType(item?.type)}>
                    {!item?.type?.includes('text') && item?.imageSource && (
                      <CustomImage
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource,
                        }}
                        alt={item?.imageAlt}
                      />
                    )}
                    <div className={getTheme(item?.type, item?.theme)}>
                      {item.heading && <h3 itemProp="name">{item.heading}</h3>}
                      {item.detail && (
                        <p className={styles.description} dangerouslySetInnerHTML={{ __html: item.detail }}></p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HolisticDevelopment;
