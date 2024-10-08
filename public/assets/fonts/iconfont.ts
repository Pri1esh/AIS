export type IconfontId =
  | "attachment"
  | "bottom"
  | "clock"
  | "close"
  | "cross"
  | "down"
  | "download"
  | "error"
  | "facebook"
  | "hamburger"
  | "instagram"
  | "left"
  | "linkedin"
  | "location"
  | "mail"
  | "mobile"
  | "right"
  | "search"
  | "tick"
  | "triangle"
  | "twitter-new"
  | "twitter"
  | "up"
  | "youtube";

export type IconfontKey =
  | "Attachment"
  | "Bottom"
  | "Clock"
  | "Close"
  | "Cross"
  | "Down"
  | "Download"
  | "Error"
  | "Facebook"
  | "Hamburger"
  | "Instagram"
  | "Left"
  | "Linkedin"
  | "Location"
  | "Mail"
  | "Mobile"
  | "Right"
  | "Search"
  | "Tick"
  | "Triangle"
  | "TwitterNew"
  | "Twitter"
  | "Up"
  | "Youtube";

export enum Iconfont {
  Attachment = "attachment",
  Bottom = "bottom",
  Clock = "clock",
  Close = "close",
  Cross = "cross",
  Down = "down",
  Download = "download",
  Error = "error",
  Facebook = "facebook",
  Hamburger = "hamburger",
  Instagram = "instagram",
  Left = "left",
  Linkedin = "linkedin",
  Location = "location",
  Mail = "mail",
  Mobile = "mobile",
  Right = "right",
  Search = "search",
  Tick = "tick",
  Triangle = "triangle",
  TwitterNew = "twitter-new",
  Twitter = "twitter",
  Up = "up",
  Youtube = "youtube",
}

export const ICONFONT_CODEPOINTS: { [key in Iconfont]: string } = {
  [Iconfont.Attachment]: "61697",
  [Iconfont.Bottom]: "61698",
  [Iconfont.Clock]: "61699",
  [Iconfont.Close]: "61700",
  [Iconfont.Cross]: "61701",
  [Iconfont.Down]: "61702",
  [Iconfont.Download]: "61703",
  [Iconfont.Error]: "61704",
  [Iconfont.Facebook]: "61705",
  [Iconfont.Hamburger]: "61706",
  [Iconfont.Instagram]: "61707",
  [Iconfont.Left]: "61708",
  [Iconfont.Linkedin]: "61709",
  [Iconfont.Location]: "61710",
  [Iconfont.Mail]: "61711",
  [Iconfont.Mobile]: "61712",
  [Iconfont.Right]: "61713",
  [Iconfont.Search]: "61714",
  [Iconfont.Tick]: "61715",
  [Iconfont.Triangle]: "61716",
  [Iconfont.TwitterNew]: "61717",
  [Iconfont.Twitter]: "61718",
  [Iconfont.Up]: "61719",
  [Iconfont.Youtube]: "61720",
};
