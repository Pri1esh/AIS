import { CurriculumSection, GuideSection, Overview, PedagogySection, TeachingSection } from '@components';
import {
  IAcademicDetailsHelper,
  ICurriculumSection,
  IGuideSection,
  IOverview,
  IPedagogySection,
  ITeachingSection,
} from '@interfaces';
import styles from './academicDetails.module.scss';

const Details = (props: IAcademicDetailsHelper) => {
  const { compData, isHeading } = props;

  const getSectionFromType = (data: any, index: number) => {
    switch (data?.type) {
      case 'overview':
        return <Overview key={index} className={styles.overview} compData={data} isHeading={isHeading} />;
      case 'pedagogy':
        return <PedagogySection key={index} compData={data} />;
      case 'guide':
        return <GuideSection key={index} compData={data} />;
      case 'teaching':
        return <TeachingSection key={index} compData={data} />;
      case 'curriculum':
        return <CurriculumSection key={index} compData={data} />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.detailsWrapper}>
      {compData?.map(
        (data: IOverview | IPedagogySection | IGuideSection | ITeachingSection | ICurriculumSection, index: number) =>
          getSectionFromType(data, index),
      )}
    </div>
  );
};

export default Details;
