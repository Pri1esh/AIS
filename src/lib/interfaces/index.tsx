import React, { ReactNode, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

export interface IPage {
  data: { header: any; footer: any; main: any };
  error: string;
  errorMessage?: string;
  category?: string;
  device?: string;
}

export interface ILayoutProps {
  children?: ReactNode;
  footerData?: IFooterData;
  headerData?: IHeaderData;
  notificationData?: IHeaderNotificationData;
  seoData?: ISeoData;
  className?: string;
  isHomePage?: boolean;
  mainBannerData?: string;
}

export interface ISeoData {
  metaDescription: string;
  metaKeywords: string;
  browserTitle: string;
  ogDescription: string;
  ogTitle: string;
  ogImage: string;
  robotsTags: string;
  ogKeyword: string;
  canonicalUrl: string;
  googleSiteVerification: string;
  msValidate: string;
  orgSchema: IOrgSchema;
}

export interface IOrgSchema {
  name: string;
  url: string;
  logo: string;
  streetAddress: string;
  addressRegion: string;
  postalCode: string;
  telephone: string;
  contactType: string;
  areaServed: string;
  sameAs: any[];
}
export interface IGrowthSlider {
  compData: IGrowthObject[];
}
export interface IGrowthObject {
  eventHeading: string;
  imageSource: string;
  imageSourceTablet: string;
  imageSourceMobile: string;
  imageAlt: string;
  subHeading: string;
  heading: string;
  description: string;
  link: string;
  linkText: string;
}

export interface ITwoColumnCard {
  compData: { data: ICardData[]; variant: string; sectionID?: string };
  overview?: IOverviewData;
}

export interface IGTMData {
  event: string;
  category: string;
  page_type: string;
  sub_category?: string;
  title?: string;
  label?: string;
  banner_category?: string;
  index?: number | string;
  section_title?: string;
  video_duration?: string;
}

export interface ICardData {
  theme: string;
  textFirst?: string | boolean;
  cardType: string;
  mediaType: string;
  subHeading?: string;
  heading?: string;
  description?: string;
  subDescription?: string;
  mainDescription?: string;
  link?: string;
  linkText?: string;
  subLink?: string;
  subLinkText?: string;
  imageSource?: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  videoSource?: string;
  videoSourceTablet?: string;
  videoSourceMobile?: string;
  videoSourceOgg?: string;
  videoSourceTabletOgg?: string;
  videoSourceMobileOgg?: string;
  defaultVideoSource?: string;
  defaultVideoSourceTablet?: string;
  defaultVideoSourceMobile?: string;
  defaultVideoSourceOgg?: string;
  defaultVideoSourceTabletOgg?: string;
  defaultVideoSourceMobileOgg?: string;
  mapSource?: string;
  imageAlt?: string;
  itemList?: ICardItemList[];
  label?: string;
  playText?: string;
  autoplayVideo?: boolean;
  posterImage?: string;
  cardHeading?: string;
  cardDescription?: string;
  locationData?: ICardLocationList[];
  isAccordion?: boolean;
  imageText?: string;
  backgroundImage?: string;
  accordionItem?: {
    title?: string;
    eventKey?: string;
    accordionItem?: {
      description?: string;
    }[];
  }[];
  listItem?: {
    heading?: string;
    subHeading?: string;
    item?: {
      description?: string;
      timing?: string;
    }[];
  }[];
  uploadDate?: string;
  seoDescription?: string;
  seoName?: string;
  gtmData?: IGTMData;
  gtmVideoStart?: IGTMData;
  gtmVideoProgress?: IGTMData;
  gtmVideoComplete?: IGTMData;
  target?: string;
}

export interface ICardItemList {
  itemHeading?: string;
  itemDescription?: string;
  itemSubDescription?: string;
}

export interface ICardLocationList {
  detail: string;
  label?: string;
  link?: string;
  timing: string;
  target?: string;
  gtmData?: IGTMData;
}
export interface ITwoColumnCardSmall {
  compData: ISmallCard[];
}

export interface IFounderCard {
  cardData: ICardData;
  overview?: IOverviewData;
}
export interface ICustomImage {
  type?: string;
  src: { mobileSource?: string; tabletSource?: string; defaultSource: string };
  alt?: string;
  title?: string;
  itemProp?: string;
  className?: string;
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
  objectFit?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: any;
  lazy?: string;
  ref?: React.MutableRefObject<HTMLImageElement>;
  loader?: string;
}

export interface IInPageNav {
  inPageNavData: IInPageNavData[];
  activeNavId?: string;
  firstActive?: boolean;
  componentRef: React.RefObject<HTMLDivElement>;
  classname?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IInPageNavData {
  title: string;
  url: string;
}

export interface ISearchWithDropdown {
  compData: ISearchWithDropdownData;
}

export interface ISearchWithDropdownData {
  handleSearch?: any;
  searchSuggestions?: ISearchSuggestion[];
  clearSearch?: any;
  handleSuggestionClick?: any;
  data?: {
    searchPlaceholder?: string;
    popularSearchKeyword?: string;
    suggestionKeyword?: string;
    popularSuggestions?: ISearchSuggestion[];
  };
}
export interface IHeroBanner {
  compData: IHeroBannerData;
  inPageNavData?: IInPageNavData[];
  activeNavId?: string;
  searchData?: ISearchWithDropdownData;
  clickHandler?: (e: any) => void;
  isHeading?: boolean;
}

export interface IHeroBannerData {
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  subHeading?: string;
  heading?: string;
  link?: string;
  target?: string;
  linkText: string;
  gtmData?: IGTMData;
}
export interface ISearchSuggestion {
  itemHeading: string;
  questionID?: string;
  categoryID?: string;
}

export interface IVisionMission {
  compData?: IVisionMissionCards;
  isHeading: boolean;
}

export interface IVisionMissionData {
  heading?: string;
  description?: string;
  imageSource?: string;
  imageAlt?: string;
}

export interface IFormGTM {
  submitEvent: string;
  gtmCategory: string;
  gtmSubCategory: string;
  pageType: string;
  failEvent: string;
}

export interface ICareerForm {
  compData: {
    sectionHeading?: string;
    antiforgeryToken?: string;
    formFields?: IFieldData[];
    checkboxField?: ICheckboxFieldData;
    reCaptchaField?: IFieldData;
    submitButton?: { buttonText?: string };
    sectionID?: string;
    theme?: string;
    formGTMData?: IFormGTM;
    thankYouData?: {
      heading?: string;
      description?: string;
    };
    progressData?: {
      heading?: string;
      description?: string;
    };
    formFailData?: {
      heading?: string;
      description?: string;
    };
  };
}

export interface IFieldData {
  fieldType: string;
  fieldName: string;
  isClear?: boolean;
  required?: boolean;
  placeholder?: string;
  fieldOptions?: { label: string; id: string }[];
  selected?: boolean;
  fieldID?: string;
  fieldDescription?: string;
  maxAllowedLength?: number | string;
  minRequiredLength?: number | string;
  maxAllowedFileSize?: number | string;
  minRequiredFileSize?: number | string;
  errorMessages: IFormErrorMessages;
}

export interface IFormErrorMessages {
  requiredFieldErrorMessage?: string;
  maxLengthErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxFileSizeErrorMessage?: string;
  minFileSizeErrorMessage?: string;
  regexErrorMessage?: string;
}
export interface IFaqItemData {
  categoryID: string;
  categoryHeading: string;
  title: string;
  body: string;
  questionID: string;
}

export interface IFaqSearchData {
  searchPlaceholder: string;
  popularSearchKeyword: string;
  suggestionKeyword: string;
  popularSuggestions: ISearchSuggestion[];
}

export interface IFaqsPageContent {
  compData: {
    searchData?: { fields?: IFaqSearchData };
    faqs?: { fields?: IFaqData };
    mainBanner?: {
      fields?: {
        imageSource: string;
        imageSourceMobile: string;
        imageSourceTablet: string;
        imageAlt: string;
        subHeading: string;
        heading: string;
        link: string;
        linkText: string;
      };
    };
  };
  activeCategory?: string;
}

export interface IFaqCategory {
  sectionHeading?: string;
  sectionLink?: string;
}

export interface IHorizontalTabs {
  classname?: string;
  compData?: IFaqCategory[];
  defaultActiveTab?: string;
  handleTabClick?: (selectedCategory: string | undefined) => void;
  activeTab: string;
}

export interface IFaqData {
  sectionHeading?: string;
  data?: IFaqItemData[];
  viewAllLink?: string;
  viewAllLabel?: string;
  target?: string;
  sectionID?: string;
  note?: string;
  gtmData?: IGTMData;
}
export interface IFaqs {
  compData: IFaqData;
  classname?: string;
  activeRef?: React.RefObject<HTMLDivElement>;
  defaultActiveCategory?: string;
  intialFaqstoShow?: number;
  noTransition?: boolean;
  sectionHeading?: string;
}

export interface IFooter {
  footerData: IFooterData;
}

export interface IFooterData {
  quicklinks: IFooterQuicklinks;
  footerlinks: IFooterlink[];
  copyRight: IFooterCopyRight;
  schoolInfo: IFooterSchoolInfo;
}

export interface IFooterQuicklinksList {
  url: string;
  target: string;
  gtmData?: IGTMData;
  label: string;
}

export interface IFooterQuicklinks {
  title: string;
  list: IFooterQuicklinksList[];
}

export interface IFooterlink {
  url: string;
  title: string;
  list: IFooterLinkList[];
}

export interface IFooterLinkList {
  url: string;
  target: string;
  gtmData?: IGTMData;
  label: string;
}

export interface IFooterCopyRightList {
  url: string;
  target?: string;
  gtmData?: IGTMData;
  label: string;
}

export interface IFooterCopyRight {
  copyRightText: string;
  list: IFooterCopyRightList[];
}

export interface IFooterContact {
  url: string;
  gtmData?: IGTMData;
  label: string;
  detail: string;
}

export interface IFooterSchoolInfo {
  schoolLogo: string;
  alt: string;
  social: ISocialLinksData[];
  contact: IFooterContact[];
}

export interface IFloatingInput {
  type?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: (a: any) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  controlProps?: any;
  name?: string;
  errorMessage?: string;
  classname?: string;
  isClear?: boolean;
  borderOnFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClear?: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBlur?: () => void;
  maxLen?: number | string;
}

export interface IButton {
  children?: any;
  className?: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  loading?: boolean;
}

export interface ICheckbox {
  control?: Control<any, any>;
  errors?: any;
  classname?: string;
  compData: ICheckboxFieldData;
  setValue: UseFormSetValue<any>;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface ICheckboxFieldData {
  url?: string;
  target: string;
  fieldName: string;
  fieldID: string;
  placeholder: string;
  errorMessages: IFormErrorMessages;
  selected?: boolean;
  gtmData: IGTMData;
}
export interface IError {
  errorMessage?: string;
}

export interface IRecaptcha {
  control?: Control<any, any>;
  controlName: string;
  errors?: any;
  errorMessage?: string;
  classname?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  reCaptchaRef: React.RefObject<any>;
}

export interface IFileInputSelected {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
}
export interface IFileInput {
  selected?: IFileInputSelected;
  setSelected: (i: IFileInputSelected | null) => void;
  label?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBlur?: () => void;
  errorMessage?: string;
  classname?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface IFormDatePicker {
  classname?: string;
  label?: string;
  startDate?: Date | any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: (e: Date | null) => {};
  placeholder?: string;
}

export interface ICountryFlag {
  countryName: string;
  dialCode: string;
  isO3: string;
  isO2: string;
  untermEnglish: string;
  id: string;
  contactNoLength: string;
}

export interface IMobileNumberData {
  phoneNumber?: string;
  countryCode?: string;
  alpha2Code?: string;
}
export interface IMobileNumberInput {
  selectedCountryCode?: string;
  label?: string;
  countryCode?: boolean;
  onChangeMobileNumber?: (e: IMobileNumberData) => void;
  onBlur?: () => void;
  errorMessage?: string;
  options?: ICountryFlag[];
  isDropdown?: boolean;
  controlProps?: any;
  contactNoLen?: number;
  isClear?: boolean;
  classname?: string;
  name?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface ICountryFlagDropdown {
  selectedCountry?: ICountryFlag;
  selectCountry: (i: ICountryFlag) => void;
  options: ICountryFlag[];
  countryLabel: React.RefObject<HTMLDivElement>;
  setCountryDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISelectDropdownOption {
  placeholder?: string;
  id: string;
  label: string;
  type?: string;
  priority?: string;
}
export interface ISelectDropdown {
  options?: ISelectDropdownOption[];
  setSelected?: (i: ISelectDropdownOption | null) => void;
  placeholder?: string;
  errorMessage?: string;
  selected?: ISelectDropdownOption | null;
  onBlur?: () => void;
  classname?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface ICountrySprite {
  code?: string;
}
export interface ICoreValueDetails {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
  };
}
export interface ICoreValueSlider {
  cardDetails: {
    variant?: string;
    gallery?: {
      heading?: string;
      description?: string;
      highlights?: string;
      imageSource?: string;
      imageAlt?: string;
    }[];
  };
}
export interface ICurriculumDetails {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
  };
}
export interface ICurriculumPrograms {
  cardDetails?: {
    program?: {
      heading?: string;
      label?: string;
    }[];
    programDetails?: {
      url?: string;
      src?: string;
      alt?: string;
      heading?: string;
      subHeading?: string;
      label?: string;
    }[];
  };
}
export interface ICustomVideo {
  compData: IVideoData;
  classname?: string;
  isOverlayRequired?: boolean;
}

export interface IVideoData {
  isOverlayRequired?: boolean;
  mediaType?: string;
  videoSource?: string;
  videoSourceMobile?: string;
  videoSourceTablet?: string;
  videoSourceOgg?: string;
  videoSourceMobileOgg?: string;
  videoSourceTabletOgg?: string;
  sectionID?: string;
  defaultVideoSource?: string;
  defaultVideoSourceTablet?: string;
  defaultVideoSourceMobile?: string;
  defaultVideoSourceOgg?: string;
  defaultVideoSourceTabletOgg?: string;
  defaultVideoSourceMobileOgg?: string;
  autoplay?: boolean;
  playText?: string;
  welcomeText?: string;
  posterImage?: string;
  uploadDate?: string;
  seoDescription?: string;
  seoName?: string;
  gtmVideoStart?: IGTMData;
  gtmVideoProgress?: IGTMData;
  gtmVideoComplete?: IGTMData;
}
export interface IExperienceSlider {
  compData?: {
    heading?: string;
    description?: string;
    gallery: {
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageAlt: string;
    }[];
  };
}
export interface IExperienceSliderData {
  galleryData?: {
    imageSource: string;
    imageSourceMobile: string;
    imageSourceTablet: string;
    imageAlt: string;
  }[];
}
export interface IGoBack {
  compData: {
    url?: string;
    label?: string;
  };
}

export interface IRouteDetails {
  compData: IRouteDetailsData;
}

export interface IRouteDetailsData {
  heading?: string;
  description?: string;
  details?: string;
  routes: IRouteData[];
}
export interface IRouteData {
  heading: string;
  basePoint?: string;
  basePointName?: string;
  timings?: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  googleMapsLink: string;
}

export interface IRoutes {
  compData: {
    sideNav: ISideNavData[];
    routeDetails: IRouteDetailsData;
  };
}

export interface ITestimonials {
  compData: {
    heading?: string;
    testimonialData?: ITestimonialsSliderData[];
  };
}
export interface ITestimonialsSlider {
  sliderData?: ITestimonialsSliderData[];
}

export interface ITestimonialsSliderData {
  imageSource?: string;
  imageAlt?: string;
  name: string;
  description?: string;
}
export interface ITextBanner {
  compData?: {
    heading?: string;
  };
}

export interface IMainBanner {
  compData: IMainBannerData;
}

export interface IMainBannerData {
  heading?: string;
  target?: string;
  subHeading?: string;
  link?: string;
  linkText?: string;
  gtmData?: IGTMData;
  data: IMainBannerMedia[];
}

export interface IMainBannerMedia {
  videoSourceMobile?: string;
  imageSource: string;
  mediaType: string;
  videoSource: string;
  videoSourceOGG: string;
  isOverlayRequired?: boolean;
  autoplay: boolean;
  videoSourceMobileOGG?: string;
  videoSourceTablet?: string;
  videoSourceTabletOGG?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
}
export interface IScaleSlider {
  compData: {
    sectionID?: string;
    heading?: string;
    subHeading?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
    gallery: ISliderGalleryData[];
    gtmData?: IGTMData;
  };
}
export interface IDetails {
  heading?: string;
  subHeading?: string;
  description?: string;
  btnText?: string;
  btnLink?: string;
  gtmData?: IGTMData;
  target?: string;
}
export interface ISocialLinks {
  socialData?: ISocialLinksData[];
}

export interface ISocialLinksData {
  url?: string;
  label: string;
  target?: string;
  imageSource?: string;
  gtmData?: IGTMData;
}
export interface IAdmissionDocuments {
  compData?: {
    sectionHeading?: string;
    item: {
      imageSource?: string;
      imageAlt?: string;
      heading?: string;
      description?: string;
    }[];
  };
}
export interface IAdmissionDocumentsItem {
  item: {
    imageSource?: string;
    imageAlt?: string;
    heading?: string;
    description?: string;
  }[];
}
export interface ICardWithIcon {
  cardData?: {
    imageSource?: string;
    imageAlt?: string;
    heading?: string;
    description?: string;
  }[];
}
export interface IOverview {
  compData: IOverviewData;
  className?: string;
  isHeading?: boolean;
}

export interface IOverviewData {
  subHeading?: string;
  heading?: string;
  description?: string;
  headOfSchool?: string;
  designation?: string;
  link?: string;
  linkText?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  button?: {
    url?: string;
    label?: string;
    variant?: string;
    gtmData?: IGTMData;
    target?: string;
  }[];
  backgroundImage?: string;
  sectionID?: string;
  gtmData?: IGTMData;
  target?: string;
}

export interface IImageSection {
  compData: IImageSectionData[];
  overviewData: IOverviewData;
  isHeading?: boolean;
}

export interface IImageSectionData {
  url: string;
  imageSource: string;
  imageSourceMobile: string;
  imageSourceTablet: string;
  imageAlt: string;
  target: string;
  imgTitle: string;
}

export interface IBaseSlider {
  settings: any;
  isMobSlider?: boolean;
  isTabSlider?: boolean;
  nextArrowClass?: string;
  prevArrowClass?: string;
  children?: React.ReactNode | any;
  cardRef?: React.MutableRefObject<HTMLDivElement>;
  classname?: string;
  asNavFor?: any;
  sliderRef?: any;
}
export interface IPrevNextArrow {
  className?: string;
  onClick?: () => void;
}
export interface ICustomLink {
  children?: any;
  href?: string;
  className?: string;
  variant?: string;
  target?: string;
  download?: boolean;
  onClick?: any;
}
export interface IErrorPage {
  error?: string;
  buttonTitle?: string;
  title?: string;
  description?: string;
  imageAlt?: string;
  showButton?: boolean;
  heading?: string;
  backToHome?: boolean;
  errorMessage?: string;
}
export interface IHeader {
  headerData?: IHeaderData;
  notificationData?: IHeaderNotificationData;
}

export interface IHeaderNotificationData {
  url?: string;
  target?: string;
  label?: string;
  btnLabel?: string;
}
export interface IHeaderData {
  logoAlt?: string;
  logoSrcSmall?: string;
  logoSrc?: string;
  url?: string;
  social?: ISocialLinksData[];
  navigation?: IHeaderNavbarData[];
  logoSrcHamburger?: string;
  hamburgerBG?: string;
  contact?: IHeaderContact[];
  gtmData?: IGTMData;
  img?:any;
}
export interface IHeaderContact {
  url: string;
  gtmData?: IGTMData;
  type: string;
  label: string;
}
export interface INotification {
  notificationData?: {
    url?: string;
    target?: string;
    label?: string;
    btnLabel?: string;
  };
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface INavBar {
  socialData?: ISocialLinksData[];
  showHeader?: boolean;
  navBarData?: IHeaderNavbarData[];
  logoSrcHamburger?: string;
  hamburgerBG?: string;
  logoAlt?: string;
  contactData?: IHeaderContactData[];
}

export interface IHeaderContactData {
  url: string;
  gtmData?: IGTMData;
  type: string;
  label: string;
}
export interface IHeaderNavbarData {
  url: string;
  highlightLabel: string;
  isHighLighted: boolean;
  isActive: boolean;
  gtmData?: IGTMData;
  label: string;
  subMenu: IHeaderNavbarDataList[];
}

export interface IHeaderNavbarDataList {
  url: string;
  gtmData?: IGTMData;
  label: string;
  subMenu: IHeaderNavbarDataSubMenu[];
}

export interface IHeaderNavbarDataSubMenu {
  url: string;
  gtmData?: IGTMData;
  label: string;
}
export interface IAcademicPrograms {
  inPageNav?: string;
  inPageNavData: IInPageNavData[];
  activeNavId?: '';
  compData?: {
    programs?: {
      programHeading?: string;
      programsubHeading?: string;
      programDescription?: string;
      programImage?: string;
      srcmobile?: string;
      programDetails?: IProgramDetail[];
    }[];
  };
}

export interface IProgramDetail {
  src?: string;
  heading?: string;
  label?: string;
  alt?: string;
}

export interface IPrograms {
  compData?: {
    programs?: IProgramData[];
  };
  activeProgram?: string;
}

export interface IProgramData {
  sectionID?: string;
  programHeading?: string;
  programsubHeading?: string;
  programDescription?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  programDetails?: IProgramDetail[];
}

export interface ICustomIcon {
  iconName?: string;
  classname?: string;
}

export interface ICoreValues {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    sectionID?: string;
    variant?: string;
    cardDetails?: {
      imageSource?: string;
      imageAlt?: string;
      heading?: string;
      description?: string;
      highlights?: string;
    }[];
  };
}

export interface ICard {
  cardData?: {
    heading?: string;
    description?: string;
    imageSource?: string;
    imageAlt?: string;
  }[];
}
export interface ICardSlider {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    sectionID?: string;
    variant?: string;
    theme: string;
    gtmData?: IGTMData;
  };
}
export interface ICardSliderDetails {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    theme: string;
    link?: string;
    linkText?: string;
    gtmData?: IGTMData;
  };
}
export interface ICardSliderData {
  cardDetails: {
    variant?: string;
    gallery?: ISliderCardData[];
  };
}
export interface ISliderCardData {
  heading?: string;
  description?: string;
  date?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  link: string;
  target?: string;
  gtmData?: IGTMData;
}

export interface ISmallCard {
  theme: string;
  heading: string;
  description: string;
  imageSource: string;
  imageAlt: string;
  reverseColumn: boolean;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
}

export interface IStoryCard {
  compData: {
    heading: string;
    linkText: string;
    link: string;
    storyList: IStoryList[];
    gtmData?: IGTMData;
  };
}

export interface IStoryList {
  eventTxt: string;
  upcomingEvent: boolean;
  storyHeading: string;
  eventDate: string;
  imageSource: string;
  imageAlt: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  link?: string;
  target?: string;
}

export interface ISingleCard {
  compData: IStoryList;
}

export interface ISubNav {
  compData: {
    label?: string;
    url: string;
    target?: string;
    active?: boolean;
    gtmData?: IGTMData;
  }[];
}

export interface IWhyUsCard {
  heading?: string;
  description?: string;
  variant: string;
  data: {
    description: string;
    theme: string;
    imageSource: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt: string;
  }[];
}

export interface IFullWidthImage {
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
}
export interface ILearning {
  compData: {
    heading: string;
    subHeading?: string;
    btnLink?: string;
    btnText?: string;
    target?: string;
    description?: string;
    academicDetails: ILearningData[];
    gallery: ILearningData[];
    features: IFeaturesData[];
    gtmData?: IGTMData;
  };
}

export interface IAffiliationsCards {
  heading?: string;
  description?: string;
  data: {
    url?: string;
    target?: string;
    imageSource: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt: string;
  }[];
}
export interface IImageComp {
  item: { imageSource: string; imageSourceTablet?: string; imageSourceMobile?: string; imageAlt?: string };
}

export interface IHolisticDevelopment {
  compData: {
    heading: string;
    data: IHolisticData[][];
  };
}

export interface IHolisticData {
  imageAlt: string;
  columns: number;
  type: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  theme: string;
  heading: string;
  detail: string;
}
export interface IProgramCard {
  compData?: {
    heading?: string;
    data: IProgramCardData[];
  };
}

export interface IProgramCardData {
  type: string;
  imageSource: string;
  heading: string;
  detail: string;
  theme: string;
  imageSourceMobile: string;
  imageSourceTablet: string;
  imageAlt: string;
}
export interface IVisionMissionCards {
  heading?: string;
  description?: string;
  isHeading?: boolean;
  data: {
    url?: string;
    target?: string;
    imageSource: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt: string;
    heading?: string;
    description?: string;
    theme?: string;
  }[];
}
export interface ICoreValuesCard {
  heading?: string;
  data: {
    url?: string;
    target?: string;
    imageSource: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt: string;
    heading?: string;
    description?: string;
    subHeading?: string;
  }[];
}
export interface IFindOutMore {
  heading?: string;
  description?: string;
  data?: {
    theme?: string;
    heading?: string;
    description?: string;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
    url?: string;
    label?: string;
    target?: string;
    gtmData?: IGTMData;
  }[];
}
export interface IUpdates {
  theme: string;
  heading: string;
  data: {
    description: string;
  }[];
}
export interface ISteamCard {
  compData?: {
    subHeading: string;
    heading: string;
    description: string;
    learningStoryListData: {
      label: string;
      theme: string;
      imageSource: string;
      imageSourceMobile?: string;
      imageSourceTablet?: string;
      imageAlt?: string;
    }[];
  };
}
export interface IUpcomingEvents {
  heading?: string;
  data?: IUpcomingEventsData[];
}

export interface IUpcomingEventsData {
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  date?: string;
  heading: string;
  description?: string;
  url?: string;
}

export interface IAppCookie {
  heading: string;
  description: string;
  decline: string;
  acceptCookies: string;
}

export interface IPedagogySection {
  compData: {
    heading?: string;
    description?: string;
  };
}

export interface IGuideSection {
  compData: {
    heading?: string;
    description?: string;
    features?: IGuideSectionFeature[];
  };
}

export interface IGuideSectionFeature {
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageSource: string;
  featureTitle?: string;
  imageAlt?: string;
}

export interface ITeachingSection {
  compData: {
    heading?: string;
    description?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageSource: string;
    imageAlt?: string;
  };
}

export interface ICurriculumSection {
  compData: {
    heading?: string;
    description?: string;
    images?: ICurriculumSectionImage[];
    features?: IGuideSectionFeature[];
    variant?: string;
  };
}

export interface ICurriculumSectionImage {
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageSource: string;
  imageAlt?: string;
}

export interface IAcademicDetails {
  compData: {
    sideNav: any;
    details: any;
  };
  isHeading?: boolean;
}

export interface IImageGallery {
  compData: IImageGalleryData;
  containerRequired?: boolean;
}

export interface IImageGalleryData {
  carouselData: IImageGalleryCarouselItem[];
  date?: string;
  title?: string;
  description?: string;
}

export interface IImageGalleryCarouselItem {
  thumbImageAlt?: string;
  thumbImageSourceMobile?: string;
  thumbImageSourceTablet?: string;
  thumbImageSource: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageAlt: string;
  imageSourceTablet?: string;
}

export interface IAdmissionSection {
  compData: {
    heading: string;
    data: IAdmissionSectionData[];
  };
}
export interface IAdmissionSectionData {
  heading: string;
  subHeading: string;
  description: IAdmissionSectionDataDescription[];
}
export interface IAdmissionSectionDataDescription {
  heading: string;
  label: string;
  subDescription: IAdmissionSectionDataSubDescription[];
}
export interface IAdmissionSectionDataSubDescription {
  heading: string;
  label: string;
}
export interface ICustomTable {
  compData: {
    heading: string;
    data: { th: ITableLabel[]; td: ITableLabel[][] };
  };
}
export interface ITableLabel {
  label: string;
}

export interface ICustomToast {
  setShow: React.Dispatch<SetStateAction<string>>;
  show?: string;
  icon?: string;
  classname?: string;
  onClose?: () => void;
  compData: {
    heading: string;
    description: string;
  };
}

export interface IStoriesCard {
  compData: IStoryCardData;
}

export interface IStoryCardData {
  imageSource: string;
  imageSourceMobile: string;
  imageSourceTablet: string;
  imageAlt: string;
  cardDate?: string;
  cardHeading?: string;
  cardDescription?: string;
  cardLink?: string;
  gtmData?: IGTMData;
  target?: string;
  readMore?: string;
  filter: ISelectDropdownOption[];
}

export interface IStoryCardFilterData {
  placeholder: string;
  fieldOptions: ISelectDropdownOption[];
}

export interface IStoriesFilter {
  compData: IStoryCardFilterData[];
  filterStories: (selectedFilter: ISelectDropdownOption, id: string) => void;
}

export interface ILatestStoriesContent {
  compData: {
    storiesData: any;
    showDataMobile: number;
    showDataDesktop: number;
    showDataIpad: number;
    heading: string;
    noData: string;
    loadMore: string;
  };
  isHeading: boolean;
}

export interface IStoriesPagination {
  compData: IStoryCardData[];
  dataToShow: number;
  loadMore: string;
}

export interface IFeatures {
  compData: IFeaturesData[];
}

export interface IFeaturesData {
  heading: string;
  theme: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  description: string;
}

export interface ILearningData {
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  heading?: string;
  description?: string;
  highlights?: string;
  link: string;
  gtmData?: IGTMData;
}

export interface ILinkSection {
  compData: {
    heading?: string;
    description?: string;
    subHeading?: string;
    links: ILinkSectionLink[];
  };
  isHeading: boolean;
}

export interface ILinkSectionLink {
  link: string;
  linktext: string;
  target: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  gtmData?: IGTMData;
  viewText?: string;
}

export interface IPageDescriptionBanners {
  compData: IPageDescriptionBannersData[];
}

export interface IPageDescriptionBannersData {
  link: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
}
export interface IPageDescription {
  compData: {
    heading?: string;
    description: string;
    banners: IPageDescriptionBannersData[];
  };
  isHeading?: boolean;
}

export interface ISlider {
  gallery: ISliderGalleryData[];
}
export interface ISliderGalleryData {
  link: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  label: string;
}

export interface ISideNav {
  compData: ISideNavData[];
}
export interface ISideNavData {
  title: string;
  active: boolean;
  link: string;
  gtmCategory: string;
  gtmData?: IGTMData;
}

export interface IStoryDetails {
  compData: {
    backLabel?: string;
    storyCarousel: IImageGalleryData;
    storyOverview: IOverviewData;
    link?: string;
    target?: string;
    gtmData?: IGTMData;
  };
}

export interface IAcademicDetailsHelper {
  compData: any;
  isHeading?: boolean;
}

export interface ICustomToggle {
  children: any;
  eventKey: string;
}

export interface IDescription {
  compData: {
    heading: string;
    description: string;
  };
}
