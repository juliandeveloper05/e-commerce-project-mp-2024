import stylesSass from './share.module.scss';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'react-share';
import {
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  PinterestIcon,
  TwitterIcon,
} from 'react-share';

export default function Share() {
  const shareUrl = window?.location.href;

  return (
    <div className={stylesSass.share}>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={38} />
      </FacebookShareButton>

      <FacebookMessengerShareButton url={shareUrl}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>

      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton>

      <TelegramShareButton url={shareUrl}>
        <TelegramIcon size={38} />
      </TelegramShareButton>

      <PinterestShareButton url={shareUrl}>
        <PinterestIcon size={38} />
      </PinterestShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
    </div>
  );
}
