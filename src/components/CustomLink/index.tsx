import { ICustomLink } from '@interfaces';
import styles from './customLink.module.scss';

const CustomLink = (props: ICustomLink) => {
  const { children, href, className, target, onClick } = props;
  const variant = props?.variant ? props?.variant?.toLowerCase() : '';

  const getVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'underline':
        return styles.underline;
      case 'lightUnderline':
        return styles.lightUnderline;
      case 'secondary':
        return styles.secondary;
      case 'button':
        return styles.button;
      case 'darkUnderline':
        return styles.darkUnderline;
      case 'bordered':
        return styles.bordered;
      case 'anchor':
        return styles.anchor;
      default:
        return '';
    }
  };

  return (
    <a
      href={href}
      target={target}
      onClick={onClick}
      className={`${className} ${styles.link} ${getVariant(variant)}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default CustomLink;
