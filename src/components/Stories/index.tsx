import { IStoryCard } from '@interfaces';
import { GTMHelper } from '@utils';
import { Container } from 'react-bootstrap';
import styles from './stories.module.scss';
import StorySlider from './StorySlider';

const Stories = (props: IStoryCard) => {
  const { compData } = props;

  if (!compData) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.heading}>
          {compData?.heading && <h2>{compData?.heading}</h2>}
          {compData?.link && (
            <a
              href={compData?.link}
              onClick={() => {
                GTMHelper({ ...compData?.gtmData });
              }}
            >
              {compData?.linkText}
            </a>
          )}
        </div>
        <StorySlider compData={compData} />
      </Container>
    </div>
  );
};

export default Stories;
