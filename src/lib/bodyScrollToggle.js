export const hideBodyScroll = () => {
  if (typeof document === 'undefined') {
    console.log('cannot change body scroll during server render');
    return;
  }
  const body = document.getElementsByTagName('body')[0];
  body.className += ' overflow-hidden';
};

export const showBodyScroll = () => {
  if (typeof document === 'undefined') {
    console.log('cannot change body scroll during server render');
    return;
  }
  const body = document.getElementsByTagName('body')[0];
  body.className = body.className.replace(/ overflow-hidden/g, '');
};
